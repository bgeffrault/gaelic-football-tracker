/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: any; output: any; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

export type Category = Node & {
  __typename?: 'Category';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  membersCollection?: Maybe<MembersConnection>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamCollection?: Maybe<TeamConnection>;
};


export type CategoryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};


export type CategoryTeamCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges: Array<CategoryEdge>;
  pageInfo: PageInfo;
};

export type CategoryDeleteResponse = {
  __typename?: 'CategoryDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Category>;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  cursor: Scalars['String']['output'];
  node: Category;
};

export type CategoryFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type CategoryInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryInsertResponse = {
  __typename?: 'CategoryInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Category>;
};

export type CategoryOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type CategoryUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateResponse = {
  __typename?: 'CategoryUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Category>;
};

export type Club = Node & {
  __typename?: 'Club';
  created_at: Scalars['Datetime']['output'];
  gameCollection?: Maybe<GameConnection>;
  id: Scalars['BigInt']['output'];
  membersCollection?: Maybe<MembersConnection>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamCollection?: Maybe<TeamConnection>;
};


export type ClubGameCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameOrderBy>>;
};


export type ClubMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};


export type ClubTeamCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};

export type ClubConnection = {
  __typename?: 'ClubConnection';
  edges: Array<ClubEdge>;
  pageInfo: PageInfo;
};

export type ClubDeleteResponse = {
  __typename?: 'ClubDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club>;
};

export type ClubEdge = {
  __typename?: 'ClubEdge';
  cursor: Scalars['String']['output'];
  node: Club;
};

export type ClubFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type ClubInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ClubInsertResponse = {
  __typename?: 'ClubInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club>;
};

export type ClubOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type ClubUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ClubUpdateResponse = {
  __typename?: 'ClubUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type Game = Node & {
  __typename?: 'Game';
  club: Club;
  clubId: Scalars['BigInt']['output'];
  created_at: Scalars['Datetime']['output'];
  date: Scalars['Datetime']['output'];
  duration: Scalars['Int']['output'];
  gameEnded: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamGameCollection?: Maybe<TeamGameConnection>;
};


export type GameTeamGameCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamGameFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamGameOrderBy>>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges: Array<GameEdge>;
  pageInfo: PageInfo;
};

export type GameDeleteResponse = {
  __typename?: 'GameDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Game>;
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor: Scalars['String']['output'];
  node: Game;
};

export type GameFilter = {
  clubId?: InputMaybe<BigIntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DatetimeFilter>;
  duration?: InputMaybe<IntFilter>;
  gameEnded?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type GameInsertInput = {
  clubId?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Datetime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  gameEnded?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GameInsertResponse = {
  __typename?: 'GameInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Game>;
};

export type GameOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  duration?: InputMaybe<OrderByDirection>;
  gameEnded?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type GameUpdateInput = {
  clubId?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Datetime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  gameEnded?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GameUpdateResponse = {
  __typename?: 'GameUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Game>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type Members = Node & {
  __typename?: 'Members';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  club?: Maybe<Club>;
  clubId?: Maybe<Scalars['BigInt']['output']>;
  created_at: Scalars['Datetime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastName: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  pseudo?: Maybe<Scalars['String']['output']>;
  shootsCollection?: Maybe<ShootsConnection>;
  teamMembersCollection?: Maybe<TeamMembersConnection>;
};


export type MembersShootsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShootsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShootsOrderBy>>;
};


export type MembersTeamMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamMembersOrderBy>>;
};

export type MembersConnection = {
  __typename?: 'MembersConnection';
  edges: Array<MembersEdge>;
  pageInfo: PageInfo;
};

export type MembersDeleteResponse = {
  __typename?: 'MembersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersEdge = {
  __typename?: 'MembersEdge';
  cursor: Scalars['String']['output'];
  node: Members;
};

export type MembersFilter = {
  categoryId?: InputMaybe<BigIntFilter>;
  clubId?: InputMaybe<BigIntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  lastName?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  pseudo?: InputMaybe<StringFilter>;
};

export type MembersInsertInput = {
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  clubId?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  pseudo?: InputMaybe<Scalars['String']['input']>;
};

export type MembersInsertResponse = {
  __typename?: 'MembersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersOrderBy = {
  categoryId?: InputMaybe<OrderByDirection>;
  clubId?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  firstName?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lastName?: InputMaybe<OrderByDirection>;
  pseudo?: InputMaybe<OrderByDirection>;
};

export type MembersUpdateInput = {
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  clubId?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  pseudo?: InputMaybe<Scalars['String']['input']>;
};

export type MembersUpdateResponse = {
  __typename?: 'MembersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `Category` collection */
  deleteFromCategoryCollection: CategoryDeleteResponse;
  /** Deletes zero or more records from the `Club` collection */
  deleteFromClubCollection: ClubDeleteResponse;
  /** Deletes zero or more records from the `Game` collection */
  deleteFromGameCollection: GameDeleteResponse;
  /** Deletes zero or more records from the `Members` collection */
  deleteFromMembersCollection: MembersDeleteResponse;
  /** Deletes zero or more records from the `Shoots` collection */
  deleteFromShootsCollection: ShootsDeleteResponse;
  /** Deletes zero or more records from the `Team` collection */
  deleteFromTeamCollection: TeamDeleteResponse;
  /** Deletes zero or more records from the `TeamGame` collection */
  deleteFromTeamGameCollection: TeamGameDeleteResponse;
  /** Deletes zero or more records from the `TeamMembers` collection */
  deleteFromTeamMembersCollection: TeamMembersDeleteResponse;
  /** Adds one or more `Category` records to the collection */
  insertIntoCategoryCollection?: Maybe<CategoryInsertResponse>;
  /** Adds one or more `Club` records to the collection */
  insertIntoClubCollection?: Maybe<ClubInsertResponse>;
  /** Adds one or more `Game` records to the collection */
  insertIntoGameCollection?: Maybe<GameInsertResponse>;
  /** Adds one or more `Members` records to the collection */
  insertIntoMembersCollection?: Maybe<MembersInsertResponse>;
  /** Adds one or more `Shoots` records to the collection */
  insertIntoShootsCollection?: Maybe<ShootsInsertResponse>;
  /** Adds one or more `Team` records to the collection */
  insertIntoTeamCollection?: Maybe<TeamInsertResponse>;
  /** Adds one or more `TeamGame` records to the collection */
  insertIntoTeamGameCollection?: Maybe<TeamGameInsertResponse>;
  /** Adds one or more `TeamMembers` records to the collection */
  insertIntoTeamMembersCollection?: Maybe<TeamMembersInsertResponse>;
  /** Updates zero or more records in the `Category` collection */
  updateCategoryCollection: CategoryUpdateResponse;
  /** Updates zero or more records in the `Club` collection */
  updateClubCollection: ClubUpdateResponse;
  /** Updates zero or more records in the `Game` collection */
  updateGameCollection: GameUpdateResponse;
  /** Updates zero or more records in the `Members` collection */
  updateMembersCollection: MembersUpdateResponse;
  /** Updates zero or more records in the `Shoots` collection */
  updateShootsCollection: ShootsUpdateResponse;
  /** Updates zero or more records in the `Team` collection */
  updateTeamCollection: TeamUpdateResponse;
  /** Updates zero or more records in the `TeamGame` collection */
  updateTeamGameCollection: TeamGameUpdateResponse;
  /** Updates zero or more records in the `TeamMembers` collection */
  updateTeamMembersCollection: TeamMembersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCategoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoryFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromClubCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromGameCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GameFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromShootsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShootsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromTeamCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromTeamGameCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamGameFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromTeamMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamMembersFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCategoryCollectionArgs = {
  objects: Array<CategoryInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoClubCollectionArgs = {
  objects: Array<ClubInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoGameCollectionArgs = {
  objects: Array<GameInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoMembersCollectionArgs = {
  objects: Array<MembersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoShootsCollectionArgs = {
  objects: Array<ShootsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoTeamCollectionArgs = {
  objects: Array<TeamInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoTeamGameCollectionArgs = {
  objects: Array<TeamGameInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoTeamMembersCollectionArgs = {
  objects: Array<TeamMembersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateCategoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoryFilter>;
  set: CategoryUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateClubCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubFilter>;
  set: ClubUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateGameCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GameFilter>;
  set: GameUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
  set: MembersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateShootsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShootsFilter>;
  set: ShootsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateTeamCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamFilter>;
  set: TeamUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateTeamGameCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamGameFilter>;
  set: TeamGameUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateTeamMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TeamMembersFilter>;
  set: TeamMembersUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `Category` */
  categoryCollection?: Maybe<CategoryConnection>;
  /** A pagable collection of type `Club` */
  clubCollection?: Maybe<ClubConnection>;
  /** A pagable collection of type `Game` */
  gameCollection?: Maybe<GameConnection>;
  /** A pagable collection of type `Members` */
  membersCollection?: Maybe<MembersConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `Shoots` */
  shootsCollection?: Maybe<ShootsConnection>;
  /** A pagable collection of type `Team` */
  teamCollection?: Maybe<TeamConnection>;
  /** A pagable collection of type `TeamGame` */
  teamGameCollection?: Maybe<TeamGameConnection>;
  /** A pagable collection of type `TeamMembers` */
  teamMembersCollection?: Maybe<TeamMembersConnection>;
};


/** The root type for querying data */
export type QueryCategoryCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


/** The root type for querying data */
export type QueryClubCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubOrderBy>>;
};


/** The root type for querying data */
export type QueryGameCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameOrderBy>>;
};


/** The root type for querying data */
export type QueryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryShootsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShootsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShootsOrderBy>>;
};


/** The root type for querying data */
export type QueryTeamCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamOrderBy>>;
};


/** The root type for querying data */
export type QueryTeamGameCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamGameFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamGameOrderBy>>;
};


/** The root type for querying data */
export type QueryTeamMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamMembersOrderBy>>;
};

export type Shoots = Node & {
  __typename?: 'Shoots';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  member?: Maybe<Members>;
  memberId?: Maybe<Scalars['BigInt']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamGame: TeamGame;
  teamGameId: Scalars['BigInt']['output'];
  type: Scalars['String']['output'];
  x: Scalars['BigInt']['output'];
  y: Scalars['BigInt']['output'];
};

export type ShootsConnection = {
  __typename?: 'ShootsConnection';
  edges: Array<ShootsEdge>;
  pageInfo: PageInfo;
};

export type ShootsDeleteResponse = {
  __typename?: 'ShootsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Shoots>;
};

export type ShootsEdge = {
  __typename?: 'ShootsEdge';
  cursor: Scalars['String']['output'];
  node: Shoots;
};

export type ShootsFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  memberId?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  teamGameId?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<StringFilter>;
  x?: InputMaybe<BigIntFilter>;
  y?: InputMaybe<BigIntFilter>;
};

export type ShootsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  teamGameId?: InputMaybe<Scalars['BigInt']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['BigInt']['input']>;
  y?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ShootsInsertResponse = {
  __typename?: 'ShootsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Shoots>;
};

export type ShootsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  memberId?: InputMaybe<OrderByDirection>;
  teamGameId?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  x?: InputMaybe<OrderByDirection>;
  y?: InputMaybe<OrderByDirection>;
};

export type ShootsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  teamGameId?: InputMaybe<Scalars['BigInt']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['BigInt']['input']>;
  y?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ShootsUpdateResponse = {
  __typename?: 'ShootsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Shoots>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Team = Node & {
  __typename?: 'Team';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  club?: Maybe<Club>;
  clubId?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Datetime']['output'];
  external: Scalars['Boolean']['output'];
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamGameCollection?: Maybe<TeamGameConnection>;
  teamName: Scalars['String']['output'];
};


export type TeamTeamGameCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamGameFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamGameOrderBy>>;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  edges: Array<TeamEdge>;
  pageInfo: PageInfo;
};

export type TeamDeleteResponse = {
  __typename?: 'TeamDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type TeamFilter = {
  categoryId?: InputMaybe<BigIntFilter>;
  clubId?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  external?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  teamName?: InputMaybe<StringFilter>;
};

export type TeamGame = Node & {
  __typename?: 'TeamGame';
  created_at: Scalars['Datetime']['output'];
  game: Game;
  gameId: Scalars['Int']['output'];
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  shootsCollection?: Maybe<ShootsConnection>;
  team: Team;
  teamId: Scalars['Int']['output'];
  teamMembersCollection?: Maybe<TeamMembersConnection>;
};


export type TeamGameShootsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShootsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShootsOrderBy>>;
};


export type TeamGameTeamMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TeamMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TeamMembersOrderBy>>;
};

export type TeamGameConnection = {
  __typename?: 'TeamGameConnection';
  edges: Array<TeamGameEdge>;
  pageInfo: PageInfo;
};

export type TeamGameDeleteResponse = {
  __typename?: 'TeamGameDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamGame>;
};

export type TeamGameEdge = {
  __typename?: 'TeamGameEdge';
  cursor: Scalars['String']['output'];
  node: TeamGame;
};

export type TeamGameFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  gameId?: InputMaybe<IntFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  teamId?: InputMaybe<IntFilter>;
};

export type TeamGameInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type TeamGameInsertResponse = {
  __typename?: 'TeamGameInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamGame>;
};

export type TeamGameOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  gameId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  teamId?: InputMaybe<OrderByDirection>;
};

export type TeamGameUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type TeamGameUpdateResponse = {
  __typename?: 'TeamGameUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamGame>;
};

export type TeamInsertInput = {
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  clubId?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  external?: InputMaybe<Scalars['Boolean']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type TeamInsertResponse = {
  __typename?: 'TeamInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

export type TeamMembers = Node & {
  __typename?: 'TeamMembers';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  member: Members;
  memberId: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamGame: TeamGame;
  teamGameId: Scalars['BigInt']['output'];
};

export type TeamMembersConnection = {
  __typename?: 'TeamMembersConnection';
  edges: Array<TeamMembersEdge>;
  pageInfo: PageInfo;
};

export type TeamMembersDeleteResponse = {
  __typename?: 'TeamMembersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamMembers>;
};

export type TeamMembersEdge = {
  __typename?: 'TeamMembersEdge';
  cursor: Scalars['String']['output'];
  node: TeamMembers;
};

export type TeamMembersFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  memberId?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  teamGameId?: InputMaybe<BigIntFilter>;
};

export type TeamMembersInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  teamGameId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type TeamMembersInsertResponse = {
  __typename?: 'TeamMembersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamMembers>;
};

export type TeamMembersOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  memberId?: InputMaybe<OrderByDirection>;
  teamGameId?: InputMaybe<OrderByDirection>;
};

export type TeamMembersUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  teamGameId?: InputMaybe<Scalars['BigInt']['input']>;
};

export type TeamMembersUpdateResponse = {
  __typename?: 'TeamMembersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<TeamMembers>;
};

export type TeamOrderBy = {
  categoryId?: InputMaybe<OrderByDirection>;
  clubId?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  external?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  teamName?: InputMaybe<OrderByDirection>;
};

export type TeamUpdateInput = {
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  clubId?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  external?: InputMaybe<Scalars['Boolean']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type TeamUpdateResponse = {
  __typename?: 'TeamUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type CategoriesFilterQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesFilterQueryQuery = { __typename?: 'Query', categoryCollection?: { __typename?: 'CategoryConnection', edges: Array<{ __typename?: 'CategoryEdge', node: { __typename?: 'Category', id: any, name: string } }> } | null };

export type AddTeamMembersMutationMutationVariables = Exact<{
  teamMembers: Array<TeamMembersInsertInput> | TeamMembersInsertInput;
}>;


export type AddTeamMembersMutationMutation = { __typename?: 'Mutation', insertIntoTeamMembersCollection?: { __typename?: 'TeamMembersInsertResponse', records: Array<{ __typename?: 'TeamMembers', id: any }> } | null };

export type AddTeamGameMutationMutationVariables = Exact<{
  teamId: Scalars['Int']['input'];
  gameId: Scalars['Int']['input'];
  teamId2: Scalars['Int']['input'];
}>;


export type AddTeamGameMutationMutation = { __typename?: 'Mutation', insertIntoTeamGameCollection?: { __typename?: 'TeamGameInsertResponse', records: Array<{ __typename?: 'TeamGame', id: any, teamId: number }> } | null };

export type AddGameMutationMutationVariables = Exact<{
  date: Scalars['Datetime']['input'];
  duration: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  clubId: Scalars['BigInt']['input'];
}>;


export type AddGameMutationMutation = { __typename?: 'Mutation', insertIntoGameCollection?: { __typename?: 'GameInsertResponse', records: Array<{ __typename?: 'Game', id: any }> } | null };

export type AddMemberMutationMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  pseudo?: InputMaybe<Scalars['String']['input']>;
  clubId?: InputMaybe<Scalars['BigInt']['input']>;
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type AddMemberMutationMutation = { __typename?: 'Mutation', insertIntoMembersCollection?: { __typename?: 'MembersInsertResponse', records: Array<{ __typename?: 'Members', id: any }> } | null };

export type CategoryItemFragmentFragment = { __typename?: 'Category', id: any, name: string } & { ' $fragmentName'?: 'CategoryItemFragmentFragment' };

export type CategoriesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQueryQuery = { __typename?: 'Query', categoryCollection?: { __typename?: 'CategoryConnection', edges: Array<{ __typename?: 'CategoryEdge', node: (
        { __typename?: 'Category' }
        & { ' $fragmentRefs'?: { 'CategoryItemFragmentFragment': CategoryItemFragmentFragment } }
      ) }> } | null };

export type TeamsQueryQueryVariables = Exact<{
  clubId?: InputMaybe<Scalars['Int']['input']>;
  external: Scalars['Boolean']['input'];
}>;


export type TeamsQueryQuery = { __typename?: 'Query', teamCollection?: { __typename?: 'TeamConnection', edges: Array<(
      { __typename?: 'TeamEdge' }
      & { ' $fragmentRefs'?: { 'TeamSectionFragmentFragment': TeamSectionFragmentFragment } }
    )> } | null };

export type TeamSectionFragmentFragment = { __typename?: 'TeamEdge', node: { __typename?: 'Team', id: any, teamName: string } } & { ' $fragmentName'?: 'TeamSectionFragmentFragment' };

export type AddTeamMutationMutationVariables = Exact<{
  teamName: Scalars['String']['input'];
  external: Scalars['Boolean']['input'];
  clubId: Scalars['Int']['input'];
}>;


export type AddTeamMutationMutation = { __typename?: 'Mutation', insertIntoTeamCollection?: { __typename?: 'TeamInsertResponse', records: Array<{ __typename?: 'Team', id: any }> } | null };

export type GameScreenTeamItemFragmentFragment = { __typename?: 'TeamGame', id: any, team: { __typename?: 'Team', id: any, teamName: string, external: boolean, category?: { __typename?: 'Category', name: string } | null }, teamMembersCollection?: { __typename?: 'TeamMembersConnection', edges: Array<{ __typename?: 'TeamMembersEdge', node: { __typename?: 'TeamMembers', id: any, member: { __typename?: 'Members', id: any, firstName: string, lastName: string } } }> } | null, shootsCollection?: { __typename?: 'ShootsConnection', edges: Array<{ __typename?: 'ShootsEdge', node: { __typename?: 'Shoots', id: any, x: any, y: any, type: string, memberId?: any | null } }> } | null } & { ' $fragmentName'?: 'GameScreenTeamItemFragmentFragment' };

export type GameQueryQueryVariables = Exact<{
  gameId: Scalars['BigInt']['input'];
}>;


export type GameQueryQuery = { __typename?: 'Query', gameCollection?: { __typename?: 'GameConnection', edges: Array<{ __typename?: 'GameEdge', node: { __typename?: 'Game', id: any, date: any, duration: number, gameEnded: boolean, name: string, teamGameCollection?: { __typename?: 'TeamGameConnection', edges: Array<{ __typename?: 'TeamGameEdge', node: (
              { __typename?: 'TeamGame' }
              & { ' $fragmentRefs'?: { 'GameScreenTeamItemFragmentFragment': GameScreenTeamItemFragmentFragment } }
            ) }> } | null } }> } | null };

export type AddShootMutationMutationVariables = Exact<{
  x: Scalars['BigInt']['input'];
  y: Scalars['BigInt']['input'];
  type: Scalars['String']['input'];
  teamGameId: Scalars['BigInt']['input'];
  memberId: Scalars['BigInt']['input'];
}>;


export type AddShootMutationMutation = { __typename?: 'Mutation', insertIntoShootsCollection?: { __typename?: 'ShootsInsertResponse', records: Array<{ __typename?: 'Shoots', id: any }> } | null };

export type TestMutationMutationVariables = Exact<{
  x: Scalars['BigInt']['input'];
  y: Scalars['BigInt']['input'];
  type: Scalars['String']['input'];
  teamGameId: Scalars['BigInt']['input'];
  memberId: Scalars['BigInt']['input'];
}>;


export type TestMutationMutation = { __typename?: 'Mutation', insertIntoShootsCollection?: { __typename?: 'ShootsInsertResponse', records: Array<{ __typename?: 'Shoots', id: any }> } | null };

export type TeamScoreFragmentFragment = { __typename?: 'TeamGame', id: any, team: { __typename?: 'Team', teamName: string }, shootsCollection?: { __typename?: 'ShootsConnection', edges: Array<{ __typename?: 'ShootsEdge', node: { __typename?: 'Shoots', id: any, type: string } }> } | null } & { ' $fragmentName'?: 'TeamScoreFragmentFragment' };

export type GameFragmentFragment = { __typename?: 'Game', id: any, duration: number, gameEnded: boolean, teamGameCollection?: { __typename?: 'TeamGameConnection', edges: Array<{ __typename?: 'TeamGameEdge', node: (
        { __typename?: 'TeamGame', shootsCollection?: { __typename?: 'ShootsConnection', edges: Array<{ __typename?: 'ShootsEdge', node: { __typename?: 'Shoots', id: any, type: string } }> } | null }
        & { ' $fragmentRefs'?: { 'TeamScoreFragmentFragment': TeamScoreFragmentFragment } }
      ) }> } | null } & { ' $fragmentName'?: 'GameFragmentFragment' };

export type GameListFragmentFragment = { __typename?: 'GameEdge', node: (
    { __typename?: 'Game', id: any }
    & { ' $fragmentRefs'?: { 'GameFragmentFragment': GameFragmentFragment } }
  ) } & { ' $fragmentName'?: 'GameListFragmentFragment' };

export type HomeFragmentFragment = { __typename?: 'Club', id: any, name: string } & { ' $fragmentName'?: 'HomeFragmentFragment' };

export type ClubQueryQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type ClubQueryQuery = { __typename?: 'Query', clubCollection?: { __typename?: 'ClubConnection', edges: Array<{ __typename?: 'ClubEdge', node: (
        { __typename?: 'Club', id: any }
        & { ' $fragmentRefs'?: { 'HomeFragmentFragment': HomeFragmentFragment } }
      ) }> } | null, gameEndedCollection?: { __typename?: 'GameConnection', edges: Array<(
      { __typename?: 'GameEdge' }
      & { ' $fragmentRefs'?: { 'GameListFragmentFragment': GameListFragmentFragment } }
    )> } | null, gameInProgressCollection?: { __typename?: 'GameConnection', edges: Array<(
      { __typename?: 'GameEdge' }
      & { ' $fragmentRefs'?: { 'GameListFragmentFragment': GameListFragmentFragment } }
    )> } | null };

export type MemberItemFragmentFragment = { __typename?: 'Members', id: any, firstName: string, lastName: string, pseudo?: string | null, shootsCollection?: { __typename?: 'ShootsConnection', edges: Array<{ __typename?: 'ShootsEdge', node: { __typename?: 'Shoots', id: any, type: string } }> } | null } & { ' $fragmentName'?: 'MemberItemFragmentFragment' };

export type MembersQueryQueryVariables = Exact<{
  clubId: Scalars['BigInt']['input'];
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type MembersQueryQuery = { __typename?: 'Query', membersCollection?: { __typename?: 'MembersConnection', edges: Array<{ __typename?: 'MembersEdge', node: (
        { __typename?: 'Members', id: any }
        & { ' $fragmentRefs'?: { 'MemberItemFragmentFragment': MemberItemFragmentFragment } }
      ) }> } | null };

export type SelectPlayerItemQueryFragment = { __typename?: 'Members', id: any, firstName: string, lastName: string, pseudo?: string | null } & { ' $fragmentName'?: 'SelectPlayerItemQueryFragment' };

export type SelectPlayerQueryQueryVariables = Exact<{
  teamGameId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type SelectPlayerQueryQuery = { __typename?: 'Query', teamMembersCollection?: { __typename?: 'TeamMembersConnection', edges: Array<{ __typename?: 'TeamMembersEdge', node: { __typename?: 'TeamMembers', id: any, member: (
          { __typename?: 'Members' }
          & { ' $fragmentRefs'?: { 'SelectPlayerItemQueryFragment': SelectPlayerItemQueryFragment } }
        ) } }> } | null };

export type TeamItemFragmentFragment = { __typename?: 'Team', id: any, teamName: string } & { ' $fragmentName'?: 'TeamItemFragmentFragment' };

export type TeamsModalQueryQueryVariables = Exact<{
  clubId?: InputMaybe<Scalars['Int']['input']>;
  external: Scalars['Boolean']['input'];
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type TeamsModalQueryQuery = { __typename?: 'Query', teamCollection?: { __typename?: 'TeamConnection', edges: Array<{ __typename?: 'TeamEdge', node: (
        { __typename?: 'Team' }
        & { ' $fragmentRefs'?: { 'TeamItemFragmentFragment': TeamItemFragmentFragment } }
      ) }> } | null };

export const CategoryItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CategoryItemFragmentFragment, unknown>;
export const TeamSectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamSectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]} as unknown as DocumentNode<TeamSectionFragmentFragment, unknown>;
export const GameScreenTeamItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameScreenTeamItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"external"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamMembersCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GameScreenTeamItemFragmentFragment, unknown>;
export const TeamScoreFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamScoreFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamScoreFragmentFragment, unknown>;
export const GameFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Game"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gameEnded"}},{"kind":"Field","name":{"kind":"Name","value":"teamGameCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamScoreFragment"}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamScoreFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GameFragmentFragment, unknown>;
export const GameListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GameEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GameFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamScoreFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Game"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gameEnded"}},{"kind":"Field","name":{"kind":"Name","value":"teamGameCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamScoreFragment"}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GameListFragmentFragment, unknown>;
export const HomeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Club"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<HomeFragmentFragment, unknown>;
export const MemberItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Members"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MemberItemFragmentFragment, unknown>;
export const SelectPlayerItemQueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SelectPlayerItemQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Members"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]} as unknown as DocumentNode<SelectPlayerItemQueryFragment, unknown>;
export const TeamItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]} as unknown as DocumentNode<TeamItemFragmentFragment, unknown>;
export const CategoriesFilterQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categoriesFilterQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesFilterQueryQuery, CategoriesFilterQueryQueryVariables>;
export const AddTeamMembersMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamMembersMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamMembers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamMembersInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoTeamMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamMembers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddTeamMembersMutationMutation, AddTeamMembersMutationMutationVariables>;
export const AddTeamGameMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamGameMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoTeamGameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId2"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}}]}}]}}]}}]} as unknown as DocumentNode<AddTeamGameMutationMutation, AddTeamGameMutationMutationVariables>;
export const AddGameMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddGameMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoGameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"gameEnded"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddGameMutationMutation, AddGameMutationMutationVariables>;
export const AddMemberMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMemberMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pseudo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pseudo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddMemberMutationMutation, AddMemberMutationMutationVariables>;
export const CategoriesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categoriesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryItemFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CategoriesQueryQuery, CategoriesQueryQueryVariables>;
export const TeamsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teamsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"external"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"external"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"external"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamSectionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamSectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]}}]} as unknown as DocumentNode<TeamsQueryQuery, TeamsQueryQueryVariables>;
export const AddTeamMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"external"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoTeamCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"external"},"value":{"kind":"Variable","name":{"kind":"Name","value":"external"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddTeamMutationMutation, AddTeamMutationMutationVariables>;
export const GameQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gameQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gameEnded"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teamGameCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GameScreenTeamItemFragment"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameScreenTeamItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}},{"kind":"Field","name":{"kind":"Name","value":"external"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamMembersCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GameQueryQuery, GameQueryQueryVariables>;
export const AddShootMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddShootMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"x"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"y"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoShootsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"x"},"value":{"kind":"Variable","name":{"kind":"Name","value":"x"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"y"},"value":{"kind":"Variable","name":{"kind":"Name","value":"y"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"teamGameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"memberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddShootMutationMutation, AddShootMutationMutationVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"testMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"x"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"y"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoShootsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"x"},"value":{"kind":"Variable","name":{"kind":"Name","value":"x"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"y"},"value":{"kind":"Variable","name":{"kind":"Name","value":"y"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"teamGameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"memberId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutationMutation, TestMutationMutationVariables>;
export const ClubQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clubQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clubCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomeFragment"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"gameEndedCollection"},"name":{"kind":"Name","value":"gameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gameEnded"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GameListFragment"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"gameInProgressCollection"},"name":{"kind":"Name","value":"gameCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gameEnded"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GameListFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamScoreFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TeamGame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Game"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"gameEnded"}},{"kind":"Field","name":{"kind":"Name","value":"teamGameCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamScoreFragment"}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Club"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GameListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GameEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GameFragment"}}]}}]}}]} as unknown as DocumentNode<ClubQueryQuery, ClubQueryQueryVariables>;
export const MembersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"membersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberItemFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Members"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}},{"kind":"Field","name":{"kind":"Name","value":"shootsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MembersQueryQuery, MembersQueryQueryVariables>;
export const SelectPlayerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"selectPlayerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamGameId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamGameId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SelectPlayerItemQuery"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SelectPlayerItemQuery"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Members"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"pseudo"}}]}}]} as unknown as DocumentNode<SelectPlayerQueryQuery, SelectPlayerQueryQueryVariables>;
export const TeamsModalQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teamsModalQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"external"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"external"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"external"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamItemFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamName"}}]}}]} as unknown as DocumentNode<TeamsModalQueryQuery, TeamsModalQueryQueryVariables>;