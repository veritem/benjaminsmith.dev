import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  setOfProjects?: Maybe<SetOfProjects>;
  setOfProjectsCollection?: Maybe<SetOfProjectsCollection>;
  keyValuePair?: Maybe<KeyValuePair>;
  keyValuePairCollection?: Maybe<KeyValuePairCollection>;
  project?: Maybe<Project>;
  projectCollection?: Maybe<ProjectCollection>;
  skill?: Maybe<Skill>;
  skillCollection?: Maybe<SkillCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
};


export type QuerySetOfProjectsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySetOfProjectsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<SetOfProjectsFilter>;
  order?: Maybe<Array<Maybe<SetOfProjectsOrder>>>;
};


export type QueryKeyValuePairArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryKeyValuePairCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<KeyValuePairFilter>;
  order?: Maybe<Array<Maybe<KeyValuePairOrder>>>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryProjectCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ProjectFilter>;
  order?: Maybe<Array<Maybe<ProjectOrder>>>;
};


export type QuerySkillArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySkillCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<SkillFilter>;
  order?: Maybe<Array<Maybe<SkillOrder>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String'];
  spaceId: Scalars['String'];
  environmentId: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
};


export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
};



export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES'
}


export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectCollection?: Maybe<ProjectCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsProjectCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type Entry = {
  sys: Sys;
};

export type ProjectCollection = {
  __typename?: 'ProjectCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Project>;
};

/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type Project = Entry & {
  __typename?: 'Project';
  sys: Sys;
  linkedFrom?: Maybe<ProjectLinkingCollections>;
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  codeUrl?: Maybe<Scalars['String']>;
  mediaCollection?: Maybe<AssetCollection>;
  tagline?: Maybe<Scalars['String']>;
  skillsCollection?: Maybe<ProjectSkillsCollection>;
  description?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectCodeUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectTaglineArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectSkillsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/project) */
export type ProjectDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ProjectLinkingCollections = {
  __typename?: 'ProjectLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  setOfProjectsCollection?: Maybe<SetOfProjectsCollection>;
};


export type ProjectLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ProjectLinkingCollectionsSetOfProjectsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type SetOfProjectsCollection = {
  __typename?: 'SetOfProjectsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<SetOfProjects>;
};

/** Defines which projects to show on the website, which ones are featured, and what order to display them in [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/setOfProjects) */
export type SetOfProjects = Entry & {
  __typename?: 'SetOfProjects';
  sys: Sys;
  linkedFrom?: Maybe<SetOfProjectsLinkingCollections>;
  id?: Maybe<Scalars['String']>;
  featuredProjectsCollection: SetOfProjectsFeaturedProjectsCollection;
  notFeaturedProjectsCollection?: Maybe<SetOfProjectsNotFeaturedProjectsCollection>;
};


/** Defines which projects to show on the website, which ones are featured, and what order to display them in [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/setOfProjects) */
export type SetOfProjectsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Defines which projects to show on the website, which ones are featured, and what order to display them in [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/setOfProjects) */
export type SetOfProjectsIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Defines which projects to show on the website, which ones are featured, and what order to display them in [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/setOfProjects) */
export type SetOfProjectsFeaturedProjectsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** Defines which projects to show on the website, which ones are featured, and what order to display them in [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/setOfProjects) */
export type SetOfProjectsNotFeaturedProjectsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type SetOfProjectsLinkingCollections = {
  __typename?: 'SetOfProjectsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type SetOfProjectsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type SetOfProjectsFeaturedProjectsCollection = {
  __typename?: 'SetOfProjectsFeaturedProjectsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Project>;
};

export type SetOfProjectsNotFeaturedProjectsCollection = {
  __typename?: 'SetOfProjectsNotFeaturedProjectsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Project>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

export type ProjectSkillsCollection = {
  __typename?: 'ProjectSkillsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Skill>;
};

/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/skill) */
export type Skill = Entry & {
  __typename?: 'Skill';
  sys: Sys;
  linkedFrom?: Maybe<SkillLinkingCollections>;
  title: Scalars['String'];
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/skill) */
export type SkillLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/skill) */
export type SkillTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type SkillLinkingCollections = {
  __typename?: 'SkillLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  projectCollection?: Maybe<ProjectCollection>;
};


export type SkillLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type SkillLinkingCollectionsProjectCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type AssetFilter = {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Scalars['String']>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName?: Maybe<Scalars['String']>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
};

export type SysFilter = {
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['String']>;
  publishedAt_not?: Maybe<Scalars['String']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_contains?: Maybe<Scalars['String']>;
  publishedAt_not_contains?: Maybe<Scalars['String']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  firstPublishedAt_not?: Maybe<Scalars['String']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_contains?: Maybe<Scalars['String']>;
  firstPublishedAt_not_contains?: Maybe<Scalars['String']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion?: Maybe<Scalars['String']>;
  publishedVersion_not?: Maybe<Scalars['String']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_contains?: Maybe<Scalars['String']>;
  publishedVersion_not_contains?: Maybe<Scalars['String']>;
};

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type SetOfProjectsFilter = {
  sys?: Maybe<SysFilter>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  featuredProjectsCollection_exists?: Maybe<Scalars['Boolean']>;
  notFeaturedProjectsCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<SetOfProjectsFilter>>>;
  AND?: Maybe<Array<Maybe<SetOfProjectsFilter>>>;
};

export enum SetOfProjectsOrder {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Used to store miscellaneous data [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/keyValuePair) */
export type KeyValuePair = Entry & {
  __typename?: 'KeyValuePair';
  sys: Sys;
  linkedFrom?: Maybe<KeyValuePairLinkingCollections>;
  key: Scalars['String'];
  value: Scalars['String'];
};


/** Used to store miscellaneous data [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/keyValuePair) */
export type KeyValuePairLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Used to store miscellaneous data [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/keyValuePair) */
export type KeyValuePairKeyArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Used to store miscellaneous data [See type definition](https://app.contentful.com/spaces/d4vc57z4o8dm/content_types/keyValuePair) */
export type KeyValuePairValueArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type KeyValuePairLinkingCollections = {
  __typename?: 'KeyValuePairLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type KeyValuePairLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type KeyValuePairFilter = {
  sys?: Maybe<SysFilter>;
  key_exists?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  key_not?: Maybe<Scalars['String']>;
  key_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_contains?: Maybe<Scalars['String']>;
  key_not_contains?: Maybe<Scalars['String']>;
  value_exists?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  value_not?: Maybe<Scalars['String']>;
  value_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_contains?: Maybe<Scalars['String']>;
  value_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<KeyValuePairFilter>>>;
  AND?: Maybe<Array<Maybe<KeyValuePairFilter>>>;
};

export enum KeyValuePairOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type KeyValuePairCollection = {
  __typename?: 'KeyValuePairCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<KeyValuePair>;
};

export type ProjectFilter = {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  codeUrl_exists?: Maybe<Scalars['Boolean']>;
  codeUrl?: Maybe<Scalars['String']>;
  codeUrl_not?: Maybe<Scalars['String']>;
  codeUrl_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  codeUrl_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  codeUrl_contains?: Maybe<Scalars['String']>;
  codeUrl_not_contains?: Maybe<Scalars['String']>;
  mediaCollection_exists?: Maybe<Scalars['Boolean']>;
  tagline_exists?: Maybe<Scalars['Boolean']>;
  tagline?: Maybe<Scalars['String']>;
  tagline_not?: Maybe<Scalars['String']>;
  tagline_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  tagline_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  tagline_contains?: Maybe<Scalars['String']>;
  tagline_not_contains?: Maybe<Scalars['String']>;
  skillsCollection_exists?: Maybe<Scalars['Boolean']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<ProjectFilter>>>;
  AND?: Maybe<Array<Maybe<ProjectFilter>>>;
};

export enum ProjectOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CodeUrlAsc = 'codeUrl_ASC',
  CodeUrlDesc = 'codeUrl_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type SkillFilter = {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<SkillFilter>>>;
  AND?: Maybe<Array<Maybe<SkillFilter>>>;
};

export enum SkillOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type SkillCollection = {
  __typename?: 'SkillCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Skill>;
};

export type NameQueryVariables = Exact<{ [key: string]: never; }>;


export type NameQuery = (
  { __typename?: 'Query' }
  & { keyValuePairCollection?: Maybe<(
    { __typename?: 'KeyValuePairCollection' }
    & { items: Array<(
      { __typename?: 'KeyValuePair' }
      & Pick<KeyValuePair, 'value'>
    )> }
  )> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { keyValuePairCollection?: Maybe<(
    { __typename?: 'KeyValuePairCollection' }
    & { items: Array<(
      { __typename?: 'KeyValuePair' }
      & Pick<KeyValuePair, 'key' | 'value'>
    )> }
  )> }
);

export type ProjectNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectNamesQuery = (
  { __typename?: 'Query' }
  & { projectCollection?: Maybe<(
    { __typename?: 'ProjectCollection' }
    & { items: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'title'>
    )> }
  )> }
);

export type ProjectPageQueryVariables = Exact<{
  project?: Maybe<Scalars['String']>;
}>;


export type ProjectPageQuery = (
  { __typename?: 'Query' }
  & { projectCollection?: Maybe<(
    { __typename?: 'ProjectCollection' }
    & { items: Array<(
      { __typename?: 'Project' }
      & ProjectPageFragment
    )> }
  )> }
);

export type ProjectPageFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'title' | 'url' | 'codeUrl' | 'tagline' | 'description'>
  & { mediaCollection?: Maybe<(
    { __typename?: 'AssetCollection' }
    & { items: Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'title' | 'url'>
    )>> }
  )>, skillsCollection?: Maybe<(
    { __typename?: 'ProjectSkillsCollection' }
    & { items: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'title'>
    )> }
  )> }
);

export type ProjectsIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsIndexQuery = (
  { __typename?: 'Query' }
  & { setOfProjectsCollection?: Maybe<(
    { __typename?: 'SetOfProjectsCollection' }
    & { items: Array<(
      { __typename?: 'SetOfProjects' }
      & { featuredProjectsCollection: (
        { __typename?: 'SetOfProjectsFeaturedProjectsCollection' }
        & { items: Array<(
          { __typename?: 'Project' }
          & FeaturedProjectIndexFragment
        )> }
      ), notFeaturedProjectsCollection?: Maybe<(
        { __typename?: 'SetOfProjectsNotFeaturedProjectsCollection' }
        & { items: Array<(
          { __typename?: 'Project' }
          & NotFeaturedProjectIndexFragment
        )> }
      )> }
    )> }
  )> }
);

export type FeaturedProjectIndexFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'title' | 'url' | 'codeUrl' | 'tagline'>
  & { mediaCollection?: Maybe<(
    { __typename?: 'AssetCollection' }
    & { items: Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'title' | 'width' | 'height' | 'url'>
    )>> }
  )> }
);

export type NotFeaturedProjectIndexFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'title' | 'url' | 'codeUrl' | 'tagline'>
);

export const ProjectPageFragmentDoc = gql`
    fragment ProjectPage on Project {
  title
  url
  codeUrl
  mediaCollection {
    items {
      title
      url(transform: {format: WEBP})
    }
  }
  tagline
  skillsCollection {
    items {
      title
    }
  }
  description
}
    `;
export const FeaturedProjectIndexFragmentDoc = gql`
    fragment FeaturedProjectIndex on Project {
  title
  url
  codeUrl
  tagline
  mediaCollection(limit: 1) {
    items {
      title
      width
      height
      url(transform: {format: WEBP, width: 800, quality: 50})
    }
  }
}
    `;
export const NotFeaturedProjectIndexFragmentDoc = gql`
    fragment NotFeaturedProjectIndex on Project {
  title
  url
  codeUrl
  tagline
}
    `;
export const NameDocument = gql`
    query Name {
  keyValuePairCollection(where: {key: "Name"}) {
    items {
      value
    }
  }
}
    `;

/**
 * __useNameQuery__
 *
 * To run a query within a React component, call `useNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useNameQuery(baseOptions?: Apollo.QueryHookOptions<NameQuery, NameQueryVariables>) {
        return Apollo.useQuery<NameQuery, NameQueryVariables>(NameDocument, baseOptions);
      }
export function useNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NameQuery, NameQueryVariables>) {
          return Apollo.useLazyQuery<NameQuery, NameQueryVariables>(NameDocument, baseOptions);
        }
export type NameQueryHookResult = ReturnType<typeof useNameQuery>;
export type NameLazyQueryHookResult = ReturnType<typeof useNameLazyQuery>;
export type NameQueryResult = Apollo.QueryResult<NameQuery, NameQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  keyValuePairCollection(
    where: {key_in: ["Name", "Tagline", "GitHub URL", "LinkedIn URL", "Website URL"]}
  ) {
    items {
      key
      value
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ProjectNamesDocument = gql`
    query ProjectNames {
  projectCollection {
    items {
      title
    }
  }
}
    `;

/**
 * __useProjectNamesQuery__
 *
 * To run a query within a React component, call `useProjectNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectNamesQuery(baseOptions?: Apollo.QueryHookOptions<ProjectNamesQuery, ProjectNamesQueryVariables>) {
        return Apollo.useQuery<ProjectNamesQuery, ProjectNamesQueryVariables>(ProjectNamesDocument, baseOptions);
      }
export function useProjectNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectNamesQuery, ProjectNamesQueryVariables>) {
          return Apollo.useLazyQuery<ProjectNamesQuery, ProjectNamesQueryVariables>(ProjectNamesDocument, baseOptions);
        }
export type ProjectNamesQueryHookResult = ReturnType<typeof useProjectNamesQuery>;
export type ProjectNamesLazyQueryHookResult = ReturnType<typeof useProjectNamesLazyQuery>;
export type ProjectNamesQueryResult = Apollo.QueryResult<ProjectNamesQuery, ProjectNamesQueryVariables>;
export const ProjectPageDocument = gql`
    query ProjectPage($project: String) {
  projectCollection(where: {title: $project}, limit: 1) {
    items {
      ...ProjectPage
    }
  }
}
    ${ProjectPageFragmentDoc}`;

/**
 * __useProjectPageQuery__
 *
 * To run a query within a React component, call `useProjectPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectPageQuery({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useProjectPageQuery(baseOptions?: Apollo.QueryHookOptions<ProjectPageQuery, ProjectPageQueryVariables>) {
        return Apollo.useQuery<ProjectPageQuery, ProjectPageQueryVariables>(ProjectPageDocument, baseOptions);
      }
export function useProjectPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectPageQuery, ProjectPageQueryVariables>) {
          return Apollo.useLazyQuery<ProjectPageQuery, ProjectPageQueryVariables>(ProjectPageDocument, baseOptions);
        }
export type ProjectPageQueryHookResult = ReturnType<typeof useProjectPageQuery>;
export type ProjectPageLazyQueryHookResult = ReturnType<typeof useProjectPageLazyQuery>;
export type ProjectPageQueryResult = Apollo.QueryResult<ProjectPageQuery, ProjectPageQueryVariables>;
export const ProjectsIndexDocument = gql`
    query ProjectsIndex {
  setOfProjectsCollection(where: {id: "benjaminsmith.dev"}, limit: 1) {
    items {
      featuredProjectsCollection {
        items {
          ...FeaturedProjectIndex
        }
      }
      notFeaturedProjectsCollection {
        items {
          ...NotFeaturedProjectIndex
        }
      }
    }
  }
}
    ${FeaturedProjectIndexFragmentDoc}
${NotFeaturedProjectIndexFragmentDoc}`;

/**
 * __useProjectsIndexQuery__
 *
 * To run a query within a React component, call `useProjectsIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsIndexQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsIndexQuery, ProjectsIndexQueryVariables>) {
        return Apollo.useQuery<ProjectsIndexQuery, ProjectsIndexQueryVariables>(ProjectsIndexDocument, baseOptions);
      }
export function useProjectsIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsIndexQuery, ProjectsIndexQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsIndexQuery, ProjectsIndexQueryVariables>(ProjectsIndexDocument, baseOptions);
        }
export type ProjectsIndexQueryHookResult = ReturnType<typeof useProjectsIndexQuery>;
export type ProjectsIndexLazyQueryHookResult = ReturnType<typeof useProjectsIndexLazyQuery>;
export type ProjectsIndexQueryResult = Apollo.QueryResult<ProjectsIndexQuery, ProjectsIndexQueryVariables>;