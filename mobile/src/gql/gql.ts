/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddMemberMutationDocument,
    "\n  query teamsQuery($clubId: Int, $external: Boolean!) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n": types.TeamsQueryDocument,
    "\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    ": types.TeamSectionFragmentFragmentDoc,
    "\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId}) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddTeamMutationDocument,
    "\n  fragment TeamScoreFragment on TeamGame {\n    id\n    team {\n      teamName\n    }\n\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n": types.TeamScoreFragmentFragmentDoc,
    "\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n\n    teamGameCollection {\n      edges {\n        node {\n          ...TeamScoreFragment\n\n          shootsCollection {\n            edges {\n              node {\n                id\n                type\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GameFragmentFragmentDoc,
    "\n  fragment GameListFragment on GameEdge {\n    node {\n      id,\n      ...GameFragment\n    }\n  }\n": types.GameListFragmentFragmentDoc,
    "\n  fragment HomeFragment on Club {\n    id\n    name\n  }\n": types.HomeFragmentFragmentDoc,
    "\n  query clubQuery($id: BigInt!) {\n    clubCollection(filter: { id: {eq: $id} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n": types.ClubQueryDocument,
    "\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n": types.MemberItemFragmentFragmentDoc,
    "\n  query membersQuery($clubId: BigInt!) {\n    membersCollection(filter: {clubId: {eq: $clubId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n": types.MembersQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query teamsQuery($clubId: Int, $external: Boolean!) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query teamsQuery($clubId: Int, $external: Boolean!) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    "): (typeof documents)["\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId}) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId}) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TeamScoreFragment on TeamGame {\n    id\n    team {\n      teamName\n    }\n\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment TeamScoreFragment on TeamGame {\n    id\n    team {\n      teamName\n    }\n\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n\n    teamGameCollection {\n      edges {\n        node {\n          ...TeamScoreFragment\n\n          shootsCollection {\n            edges {\n              node {\n                id\n                type\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n\n    teamGameCollection {\n      edges {\n        node {\n          ...TeamScoreFragment\n\n          shootsCollection {\n            edges {\n              node {\n                id\n                type\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GameListFragment on GameEdge {\n    node {\n      id,\n      ...GameFragment\n    }\n  }\n"): (typeof documents)["\n  fragment GameListFragment on GameEdge {\n    node {\n      id,\n      ...GameFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HomeFragment on Club {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment HomeFragment on Club {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query clubQuery($id: BigInt!) {\n    clubCollection(filter: { id: {eq: $id} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query clubQuery($id: BigInt!) {\n    clubCollection(filter: { id: {eq: $id} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false } }) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query membersQuery($clubId: BigInt!) {\n    membersCollection(filter: {clubId: {eq: $clubId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query membersQuery($clubId: BigInt!) {\n    membersCollection(filter: {clubId: {eq: $clubId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;