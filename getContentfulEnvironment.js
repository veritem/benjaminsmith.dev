// https://github.com/intercom/contentful-typescript-codegen

require('dotenv').config({ path: '.env.contentful-codegen' });
const contentfulManagement = require('contentful-management');

module.exports = () => {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
    });

    return contentfulClient
        .getSpace(process.env.CONTENTFUL_SPACE_ID)
        .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
}