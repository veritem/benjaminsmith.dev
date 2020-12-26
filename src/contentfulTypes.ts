import { ContentfulCollection, Entry } from "contentful";

export interface Skill {
    title: string
}

export interface Project {
    title: string,
    url?: string,
    codeUrl?: string,
    media?: Entry<unknown>,
    tagline?: string,
    skills?: ContentfulCollection<Entry<Skill>>,
    description?: string,
    featured: boolean
}