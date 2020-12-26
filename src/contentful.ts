import { createClient } from 'contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "";
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "";

if(space === "") throw new Error("Space ID is undefined");
if(accessToken === "") throw new Error("Access token is undefined");

const client = createClient({
    space: space,
    accessToken: accessToken
});

export async function fetchProjects() {
    const entries = await client.getEntries({
        content_type: "project"
    });
    console.log("------ Entries ------");
    console.log(entries);
    console.log("------ Includes ------");
    console.log(entries.includes.Entry);
    console.log("------ Fields ------");
    console.log(entries.items[0].fields);
}