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
};


export type CategoryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
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
  id: Scalars['BigInt']['output'];
  membersCollection?: Maybe<MembersConnection>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamCollection?: Maybe<TeamConnection>;
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
  created_at: Scalars['Datetime']['output'];
  date: Scalars['Datetime']['output'];
  duration: Scalars['Int']['output'];
  gameEnded: Scalars['Boolean']['output'];
  gameScoreCollection?: Maybe<GameScoreConnection>;
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
};


export type GameGameScoreCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameScoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameScoreOrderBy>>;
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
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DatetimeFilter>;
  duration?: InputMaybe<IntFilter>;
  gameEnded?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type GameInsertInput = {
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
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  duration?: InputMaybe<OrderByDirection>;
  gameEnded?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type GameScore = Node & {
  __typename?: 'GameScore';
  created_at: Scalars['Datetime']['output'];
  game: Game;
  gameId: Scalars['Int']['output'];
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  score: Score;
  scoreId: Scalars['Int']['output'];
  team: Team;
  teamId: Scalars['Int']['output'];
};

export type GameScoreConnection = {
  __typename?: 'GameScoreConnection';
  edges: Array<GameScoreEdge>;
  pageInfo: PageInfo;
};

export type GameScoreDeleteResponse = {
  __typename?: 'GameScoreDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GameScore>;
};

export type GameScoreEdge = {
  __typename?: 'GameScoreEdge';
  cursor: Scalars['String']['output'];
  node: GameScore;
};

export type GameScoreFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  gameId?: InputMaybe<IntFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  scoreId?: InputMaybe<IntFilter>;
  teamId?: InputMaybe<IntFilter>;
};

export type GameScoreInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
  scoreId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type GameScoreInsertResponse = {
  __typename?: 'GameScoreInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GameScore>;
};

export type GameScoreOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  gameId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  scoreId?: InputMaybe<OrderByDirection>;
  teamId?: InputMaybe<OrderByDirection>;
};

export type GameScoreUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  gameId?: InputMaybe<Scalars['Int']['input']>;
  scoreId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type GameScoreUpdateResponse = {
  __typename?: 'GameScoreUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GameScore>;
};

export type GameUpdateInput = {
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
  category: Category;
  categoryId: Scalars['BigInt']['output'];
  club: Club;
  clubId: Scalars['BigInt']['output'];
  created_at: Scalars['Datetime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  lastName: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  pseudo?: Maybe<Scalars['String']['output']>;
  shootsCollection?: Maybe<ShootsConnection>;
};


export type MembersShootsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShootsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShootsOrderBy>>;
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
  /** Deletes zero or more records from the `GameScore` collection */
  deleteFromGameScoreCollection: GameScoreDeleteResponse;
  /** Deletes zero or more records from the `Members` collection */
  deleteFromMembersCollection: MembersDeleteResponse;
  /** Deletes zero or more records from the `Score` collection */
  deleteFromScoreCollection: ScoreDeleteResponse;
  /** Deletes zero or more records from the `Shoots` collection */
  deleteFromShootsCollection: ShootsDeleteResponse;
  /** Deletes zero or more records from the `Team` collection */
  deleteFromTeamCollection: TeamDeleteResponse;
  /** Adds one or more `Category` records to the collection */
  insertIntoCategoryCollection?: Maybe<CategoryInsertResponse>;
  /** Adds one or more `Club` records to the collection */
  insertIntoClubCollection?: Maybe<ClubInsertResponse>;
  /** Adds one or more `Game` records to the collection */
  insertIntoGameCollection?: Maybe<GameInsertResponse>;
  /** Adds one or more `GameScore` records to the collection */
  insertIntoGameScoreCollection?: Maybe<GameScoreInsertResponse>;
  /** Adds one or more `Members` records to the collection */
  insertIntoMembersCollection?: Maybe<MembersInsertResponse>;
  /** Adds one or more `Score` records to the collection */
  insertIntoScoreCollection?: Maybe<ScoreInsertResponse>;
  /** Adds one or more `Shoots` records to the collection */
  insertIntoShootsCollection?: Maybe<ShootsInsertResponse>;
  /** Adds one or more `Team` records to the collection */
  insertIntoTeamCollection?: Maybe<TeamInsertResponse>;
  /** Updates zero or more records in the `Category` collection */
  updateCategoryCollection: CategoryUpdateResponse;
  /** Updates zero or more records in the `Club` collection */
  updateClubCollection: ClubUpdateResponse;
  /** Updates zero or more records in the `Game` collection */
  updateGameCollection: GameUpdateResponse;
  /** Updates zero or more records in the `GameScore` collection */
  updateGameScoreCollection: GameScoreUpdateResponse;
  /** Updates zero or more records in the `Members` collection */
  updateMembersCollection: MembersUpdateResponse;
  /** Updates zero or more records in the `Score` collection */
  updateScoreCollection: ScoreUpdateResponse;
  /** Updates zero or more records in the `Shoots` collection */
  updateShootsCollection: ShootsUpdateResponse;
  /** Updates zero or more records in the `Team` collection */
  updateTeamCollection: TeamUpdateResponse;
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
export type MutationDeleteFromGameScoreCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GameScoreFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromScoreCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ScoreFilter>;
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
export type MutationInsertIntoGameScoreCollectionArgs = {
  objects: Array<GameScoreInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoMembersCollectionArgs = {
  objects: Array<MembersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoScoreCollectionArgs = {
  objects: Array<ScoreInsertInput>;
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
export type MutationUpdateGameScoreCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<GameScoreFilter>;
  set: GameScoreUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
  set: MembersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateScoreCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ScoreFilter>;
  set: ScoreUpdateInput;
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
  /** A pagable collection of type `GameScore` */
  gameScoreCollection?: Maybe<GameScoreConnection>;
  /** A pagable collection of type `Members` */
  membersCollection?: Maybe<MembersConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `Score` */
  scoreCollection?: Maybe<ScoreConnection>;
  /** A pagable collection of type `Shoots` */
  shootsCollection?: Maybe<ShootsConnection>;
  /** A pagable collection of type `Team` */
  teamCollection?: Maybe<TeamConnection>;
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
export type QueryGameScoreCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameScoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameScoreOrderBy>>;
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
export type QueryScoreCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ScoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ScoreOrderBy>>;
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

export type Score = Node & {
  __typename?: 'Score';
  accuracy?: Maybe<Scalars['Float']['output']>;
  created_at: Scalars['Datetime']['output'];
  gameScoreCollection?: Maybe<GameScoreConnection>;
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  shootsCollection?: Maybe<ShootsConnection>;
};


export type ScoreGameScoreCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameScoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameScoreOrderBy>>;
};


export type ScoreShootsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShootsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShootsOrderBy>>;
};

export type ScoreConnection = {
  __typename?: 'ScoreConnection';
  edges: Array<ScoreEdge>;
  pageInfo: PageInfo;
};

export type ScoreDeleteResponse = {
  __typename?: 'ScoreDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Score>;
};

export type ScoreEdge = {
  __typename?: 'ScoreEdge';
  cursor: Scalars['String']['output'];
  node: Score;
};

export type ScoreFilter = {
  accuracy?: InputMaybe<FloatFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type ScoreInsertInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ScoreInsertResponse = {
  __typename?: 'ScoreInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Score>;
};

export type ScoreOrderBy = {
  accuracy?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
};

export type ScoreUpdateInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ScoreUpdateResponse = {
  __typename?: 'ScoreUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Score>;
};

export type Shoots = Node & {
  __typename?: 'Shoots';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  member?: Maybe<Members>;
  memberId?: Maybe<Scalars['BigInt']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  score?: Maybe<Score>;
  scoreId?: Maybe<Scalars['BigInt']['output']>;
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
  scoreId?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<StringFilter>;
  x?: InputMaybe<BigIntFilter>;
  y?: InputMaybe<BigIntFilter>;
};

export type ShootsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  scoreId?: InputMaybe<Scalars['BigInt']['input']>;
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
  scoreId?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  x?: InputMaybe<OrderByDirection>;
  y?: InputMaybe<OrderByDirection>;
};

export type ShootsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  memberId?: InputMaybe<Scalars['BigInt']['input']>;
  scoreId?: InputMaybe<Scalars['BigInt']['input']>;
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
  club: Club;
  clubId: Scalars['Int']['output'];
  created_at: Scalars['Datetime']['output'];
  gameScoreCollection?: Maybe<GameScoreConnection>;
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  teamName: Scalars['String']['output'];
};


export type TeamGameScoreCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<GameScoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GameScoreOrderBy>>;
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
  clubId?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  teamName?: InputMaybe<StringFilter>;
};

export type TeamInsertInput = {
  clubId?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type TeamInsertResponse = {
  __typename?: 'TeamInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Team>;
};

export type TeamOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  teamName?: InputMaybe<OrderByDirection>;
};

export type TeamUpdateInput = {
  clubId?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
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

export type ClubQueryQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type ClubQueryQuery = { __typename?: 'Query', clubCollection?: { __typename?: 'ClubConnection', edges: Array<{ __typename?: 'ClubEdge', node: { __typename?: 'Club', id: any, name: string } }> } | null };


export const ClubQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"clubQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clubCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ClubQueryQuery, ClubQueryQueryVariables>;