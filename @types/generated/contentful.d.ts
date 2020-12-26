// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IProjectFields {
  /** Title */
  title: string;

  /** URL */
  url?: string | undefined;

  /** Code URL */
  codeUrl?: string | undefined;

  /** Media */
  media?: Asset[] | undefined;

  /** Tagline */
  tagline?: string | undefined;

  /** Skills */
  skills?: ISkill[] | undefined;

  /** Description */
  description?: string | undefined;

  /** Featured */
  featured: boolean;
}

export interface IProject extends Entry<IProjectFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "project";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISkillFields {
  /** Title */
  title: string;
}

export interface ISkill extends Entry<ISkillFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "skill";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "project" | "skill";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
