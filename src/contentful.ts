import { createClient } from 'contentful';
import { IProjectFields } from '../@types/generated/contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "";
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "";

if(space === "") throw new Error("Space ID is undefined");
if(accessToken === "") throw new Error("Access token is undefined");

const client = createClient({
    space: space,
    accessToken: accessToken
});

export const fetchProjects = async () => (await client.getEntries<IProjectFields>({
    content_type: "project"
})).items.map(item => item.fields);