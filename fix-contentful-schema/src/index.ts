#!/usr/bin/env node

import { promises as fs } from "fs";
import meow from "meow";
import camelCase from "camelcase";
import { createClient as createContentfulClient } from "contentful-management";
import { codegen } from '@graphql-codegen/core';
import * as introspectionPlugin from '@graphql-codegen/introspection';
import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { printSchema, parse } from 'graphql';
import { Types as CodegenTypes } from '@graphql-codegen/plugin-helpers/types';
import { GraphQLSchema } from "./schemaTypes";

const cli = meow(`
Usage
$ fix-contentful-schema -t <content token> -m <management token> -s <space id> [-e <environment>] -o <output schema file>

Options
--token, -t        Contentful content token
--management, -m   Contentful management API token
--space, -s        Contentful space ID
--environment, -e  Contentful environment (defaults to master)
--output, -o       Output schema file
`, {
    flags: {
        token: {
            type: 'string',
            alias: 't',
            isRequired: true
        },
        management: {
            type: 'string',
            alias: 'm',
            isRequired: true
        },
        space: {
            type: 'string',
            alias: 's',
            isRequired: true
        },
        environment: {
            type: 'string',
            alias: 'e',
            isRequired: false,
            default: 'master'
        },
        output: {
            type: 'string',
            alias: 'o',
            isRequired: true
        }
    }
});

async function run() {
    console.log("fix-contentful-schema");
    const codegenConfig: CodegenTypes.GenerateOptions = {
        filename: cli.flags.output,
        schema: parse(printSchema(await loadSchema(`https://graphql.contentful.com/content/v1/spaces/${cli.flags.space}`, {
            loaders: [
                new UrlLoader()
            ],
            headers: {
                "Authorization": `Bearer ${cli.flags.token}`
            }
        }))),
        plugins: [
            {
                introspection: {}
            }
        ],
        pluginMap: {
            introspection: introspectionPlugin
        },
        documents: [],
        config: {}
    };

    const schemaText = await codegen(codegenConfig);
    const schema: GraphQLSchema = JSON.parse(schemaText);

    console.log("Generated schema");

    const contentfulClient = createContentfulClient({
        accessToken: cli.flags.management
    });
    const environment = await (await contentfulClient.getSpace(cli.flags.space)).getEnvironment(cli.flags.environment);
    const contentTypes = (await environment.getContentTypes({ limit: 1000 })).items;

    console.log("Connected to Contentful");

    // For every Contentful type there are three GQL types: [name], [name]Collection, and [name]LinkingCollections
    // The LinkingCollection type doesn't need to be modified
    // The [name] one and the Collection one do
    contentTypes.forEach(contentType => {
        // The GraphQL type is usually the content type ID in PascalCase
        const graphqlId = camelCase(contentType.sys.id, {pascalCase: true});
        let schemaType = schema.__schema.types.filter(type => type.name === graphqlId)[0];
        contentType.fields.forEach(field => {
            const fieldId = (field.type === "Array" && field.items?.type === "Link") ? field.id + "Collection" : field.id;
            let schemaField = schemaType.fields.filter(item => item.name === fieldId)[0];

            if(field.required) {
                schemaField.type = {
                    kind: "NON_NULL",
                    name: null,
                    ofType: schemaField.type
                };
            }

            // Array type fields also have a corresponding [TypeName][FieldName]Collection type
            if(field.type === "Array") {
                if(schemaField?.type.ofType?.kind === "SCALAR") {
                    // It is just a regular array
                    schemaField.type.ofType = {
                        kind: "NON_NULL",
                        name: null,
                        ofType: schemaField.type.ofType
                    };
                    return;
                }
                let schemaFieldType = schema.__schema.types.filter(type => type.name === graphqlId + camelCase(fieldId, {pascalCase: true}))[0];
                if(schemaFieldType === undefined) return;
                let schemaFieldTypeItemsField = schemaFieldType.fields.filter(item => item.name === "items")[0];
                /* schemaFieldTypeItemsField looks like this:
                 * {
                 *     ...
                 *     "type": {
                 *         "kind": "NON_NULL",
                 *         "name": null,
                 *         "ofType": {
                 *             "kind": "LIST",
                 *             "name": null,
                 *             "ofType": {
                 *                 "kind": "OBJECT",
                 *                 "name": "Project",
                 *                 "ofType": null
                 *             }
                 *         }
                 *     }
                 * }
                 */
                schemaFieldTypeItemsField.type.ofType.ofType = {
                    kind: "NON_NULL",
                    name: null,
                    ofType: schemaFieldTypeItemsField.type.ofType.ofType
                };
            }
        });

        // By default the items in a Collection can be the item type or null which makes no sense
        let schemaCollectionType = schema.__schema.types.filter(type => type.name === graphqlId + "Collection")[0];
        let schemaItemsField = schemaCollectionType.fields.filter(field => field.name === "items")[0];
        /* schemaItemsField looks like this:
         * {
         *     ...
         *     type: {
         *         kind: 'NON_NULL',
         *         name: null,
         *         ofType: {
         *             kind: 'LIST',
         *             name: null,
         *             ofType: {
         *                 kind: 'OBJECT',
         *                 name: '[type name]',
         *                 ofType: null
         *             }
         *         }
         *     }
         * }
         */
        schemaItemsField.type.ofType.ofType = {
            kind: "NON_NULL",
            name: null,
            ofType: schemaItemsField.type.ofType.ofType
        };
    });

    console.log("Fixed schema");

    const newSchema = JSON.stringify(schema, null, 2);
    await fs.writeFile(cli.flags.output, newSchema, 'utf-8');

    console.log(`Wrote new schema to ${cli.flags.output}`);
    console.log("Done!");
}

run().catch(error => {
    console.error(error);
    process.exit(1);
});