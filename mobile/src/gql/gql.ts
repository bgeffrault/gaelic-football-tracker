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
    "\n  query categoriesFilterQuery {\n    categoryCollection {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.CategoriesFilterQueryDocument,
    "\nmutation AddTeamMembersMutation($teamMembers: [TeamMembersInsertInput!]!) {\n  insertIntoTeamMembersCollection(objects: $teamMembers) {\n    records {\n      id\n    }\n  }\n}\n": types.AddTeamMembersMutationDocument,
    "\n  mutation AddTeamGameMutation($teamId: Int!, $gameId: BigInt!, $teamId2: Int!) {\n    insertIntoTeamGameCollection(objects: [\n      {\n        teamId: $teamId, \n        gameId: $gameId, \n      },\n      {\n        teamId: $teamId2, \n        gameId: $gameId, \n      },\n    ]) {\n      records {\n        id\n        teamId\n      }\n    }\n  }\n": types.AddTeamGameMutationDocument,
    "\n  mutation AddGameMutation($date: Datetime!, $duration: Int!, $name: String, $clubId: BigInt!) {\n    insertIntoGameCollection(objects: {\n      date: $date, \n      duration: $duration, \n      name: $name, \n      gameEnded: false, \n      clubId: $clubId,\n    }) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddGameMutationDocument,
    "\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt, $license: String) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId, license: $license}) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddMemberMutationDocument,
    "\n  fragment CategoryItemFragment on Category {\n    id\n    name\n  }\n": types.CategoryItemFragmentFragmentDoc,
    "\n  query categoriesQuery {\n    categoryCollection {\n      edges {\n        node {\n          ...CategoryItemFragment\n        }\n      }\n    }\n  }\n": types.CategoriesQueryDocument,
    "\n  query teamsQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}, categoryId: {eq: $categoryId}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n": types.TeamsQueryDocument,
    "\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    ": types.TeamSectionFragmentFragmentDoc,
    "\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!, $categoryId: BigInt!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddTeamMutationDocument,
    "\n  fragment GameScreenTeamItemFragment on TeamGame {\n    id\n    team {\n      id\n      teamName\n      external\n      category {\n        name\n      }\n    }\n    teamMembersCollection {\n      edges {\n        node {\n          id\n          member {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n    shootsCollection(after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          x\n          y\n          type\n          memberId\n        }\n      }\n    }\n  }\n": types.GameScreenTeamItemFragmentFragmentDoc,
    "\n  mutation AddShootMutation($x: BigInt!, $y: BigInt!, $type: String!, $teamGameId: BigInt!, $memberId: BigInt!) {\n    insertIntoShootsCollection(objects: {x: $x, y: $y, type: $type, teamGameId: $teamGameId, memberId: $memberId}) {\n      records {\n        id\n      }\n    }\n  }\n": types.AddShootMutationDocument,
    "\n  query gameQuery($gameId: BigInt!, $after: Cursor) {\n    gameCollection(filter: { id: { eq: $gameId } }) {\n      edges {\n        node {\n          id\n          date\n          duration\n          gameEnded\n          name\n          teamGameCollection(orderBy: [{id: DescNullsLast}]) {\n            edges {\n              node {\n                ...GameScreenTeamItemFragment\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GameQueryDocument,
    "\nmutation GameEndedMutation($gameId: BigInt!, $gameEnded: Boolean!) {\n  updateGameCollection(set: {gameEnded: $gameEnded}, filter: {id: {eq: $gameId}}){\n    records {\n      id\n      gameEnded\n    }\n  }\n}\n": types.GameEndedMutationDocument,
    "\n  query SelectedShootOverviewQuery($memberId: BigInt!) {\n    membersCollection(filter: { id: {eq: $memberId} }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n        }\n      }\n    }\n  }\n": types.SelectedShootOverviewQueryDocument,
    "\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n    name\n    date\n\n    teamGameCollection {\n      edges {\n        node {\n          id\n          team {\n            external\n            teamName\n          }\n        }\n      }\n    }\n  }\n": types.GameFragmentFragmentDoc,
    "\n  fragment GameListFragment on GameEdge {\n    node {\n      id,\n      ...GameFragment\n    }\n  }\n": types.GameListFragmentFragmentDoc,
    "\n  fragment HomeFragment on Club {\n    id\n    name\n  }\n": types.HomeFragmentFragmentDoc,
    "\n  query clubQuery($clubId: BigInt!) {\n    clubCollection(filter: { id: {eq: $clubId} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n  }\n": types.ClubQueryDocument,
    "\n  query gamesQuery($clubId: BigInt!, $categoryId: BigInt!) {\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId}  }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId} }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n": types.GamesQueryDocument,
    "\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    license\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n": types.MemberItemFragmentFragmentDoc,
    "\n  query membersQuery($clubId: BigInt!, $categoryId: BigInt) {\n    membersCollection(filter: {clubId: {eq: $clubId}, categoryId: {eq: $categoryId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n": types.MembersQueryDocument,
    "\n  fragment SelectPlayerItemQuery on Members {\n    id\n    firstName\n    lastName\n    pseudo\n  }\n": types.SelectPlayerItemQueryFragmentDoc,
    "\n  query playerQuery($playerId: BigInt) {\n    membersCollection(filter: { id: { eq: $playerId } }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n          license\n        }\n      }\n    }\n  }\n": types.PlayerQueryDocument,
    "\n  query selectPlayerQuery($teamGameId: BigInt) {\n    teamMembersCollection(filter: { teamGameId: { eq: $teamGameId } }) {\n      edges {\n        node {\n          id\n          member {\n            ...SelectPlayerItemQuery\n          }\n        }\n      }\n    }\n  }\n": types.SelectPlayerQueryDocument,
    "\n  fragment TeamItemFragment on Team {\n    id\n    teamName\n  }\n": types.TeamItemFragmentFragmentDoc,
    "\n  query teamsModalQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {external: {eq: $external}, clubId: {eq: $clubId}, categoryId: {eq: $categoryId} }) {\n      edges {\n        node {\n          ...TeamItemFragment\n        }\n      }\n    }\n  }\n": types.TeamsModalQueryDocument,
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
export function graphql(source: "\n  query categoriesFilterQuery {\n    categoryCollection {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query categoriesFilterQuery {\n    categoryCollection {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation AddTeamMembersMutation($teamMembers: [TeamMembersInsertInput!]!) {\n  insertIntoTeamMembersCollection(objects: $teamMembers) {\n    records {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nmutation AddTeamMembersMutation($teamMembers: [TeamMembersInsertInput!]!) {\n  insertIntoTeamMembersCollection(objects: $teamMembers) {\n    records {\n      id\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTeamGameMutation($teamId: Int!, $gameId: BigInt!, $teamId2: Int!) {\n    insertIntoTeamGameCollection(objects: [\n      {\n        teamId: $teamId, \n        gameId: $gameId, \n      },\n      {\n        teamId: $teamId2, \n        gameId: $gameId, \n      },\n    ]) {\n      records {\n        id\n        teamId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddTeamGameMutation($teamId: Int!, $gameId: BigInt!, $teamId2: Int!) {\n    insertIntoTeamGameCollection(objects: [\n      {\n        teamId: $teamId, \n        gameId: $gameId, \n      },\n      {\n        teamId: $teamId2, \n        gameId: $gameId, \n      },\n    ]) {\n      records {\n        id\n        teamId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddGameMutation($date: Datetime!, $duration: Int!, $name: String, $clubId: BigInt!) {\n    insertIntoGameCollection(objects: {\n      date: $date, \n      duration: $duration, \n      name: $name, \n      gameEnded: false, \n      clubId: $clubId,\n    }) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddGameMutation($date: Datetime!, $duration: Int!, $name: String, $clubId: BigInt!) {\n    insertIntoGameCollection(objects: {\n      date: $date, \n      duration: $duration, \n      name: $name, \n      gameEnded: false, \n      clubId: $clubId,\n    }) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt, $license: String) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId, license: $license}) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt, $license: String) {\n    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId, license: $license}) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryItemFragment on Category {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment CategoryItemFragment on Category {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoriesQuery {\n    categoryCollection {\n      edges {\n        node {\n          ...CategoryItemFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query categoriesQuery {\n    categoryCollection {\n      edges {\n        node {\n          ...CategoryItemFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query teamsQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}, categoryId: {eq: $categoryId}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query teamsQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}, categoryId: {eq: $categoryId}}) {\n      edges {\n          ...TeamSectionFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    "): (typeof documents)["\n    fragment TeamSectionFragment on TeamEdge {\n        node {\n          id\n            teamName\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!, $categoryId: BigInt!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!, $categoryId: BigInt!) {\n    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId, categoryId: $categoryId}) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GameScreenTeamItemFragment on TeamGame {\n    id\n    team {\n      id\n      teamName\n      external\n      category {\n        name\n      }\n    }\n    teamMembersCollection {\n      edges {\n        node {\n          id\n          member {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n    shootsCollection(after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          x\n          y\n          type\n          memberId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GameScreenTeamItemFragment on TeamGame {\n    id\n    team {\n      id\n      teamName\n      external\n      category {\n        name\n      }\n    }\n    teamMembersCollection {\n      edges {\n        node {\n          id\n          member {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n    shootsCollection(after: $after) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          x\n          y\n          type\n          memberId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddShootMutation($x: BigInt!, $y: BigInt!, $type: String!, $teamGameId: BigInt!, $memberId: BigInt!) {\n    insertIntoShootsCollection(objects: {x: $x, y: $y, type: $type, teamGameId: $teamGameId, memberId: $memberId}) {\n      records {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddShootMutation($x: BigInt!, $y: BigInt!, $type: String!, $teamGameId: BigInt!, $memberId: BigInt!) {\n    insertIntoShootsCollection(objects: {x: $x, y: $y, type: $type, teamGameId: $teamGameId, memberId: $memberId}) {\n      records {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gameQuery($gameId: BigInt!, $after: Cursor) {\n    gameCollection(filter: { id: { eq: $gameId } }) {\n      edges {\n        node {\n          id\n          date\n          duration\n          gameEnded\n          name\n          teamGameCollection(orderBy: [{id: DescNullsLast}]) {\n            edges {\n              node {\n                ...GameScreenTeamItemFragment\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query gameQuery($gameId: BigInt!, $after: Cursor) {\n    gameCollection(filter: { id: { eq: $gameId } }) {\n      edges {\n        node {\n          id\n          date\n          duration\n          gameEnded\n          name\n          teamGameCollection(orderBy: [{id: DescNullsLast}]) {\n            edges {\n              node {\n                ...GameScreenTeamItemFragment\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation GameEndedMutation($gameId: BigInt!, $gameEnded: Boolean!) {\n  updateGameCollection(set: {gameEnded: $gameEnded}, filter: {id: {eq: $gameId}}){\n    records {\n      id\n      gameEnded\n    }\n  }\n}\n"): (typeof documents)["\nmutation GameEndedMutation($gameId: BigInt!, $gameEnded: Boolean!) {\n  updateGameCollection(set: {gameEnded: $gameEnded}, filter: {id: {eq: $gameId}}){\n    records {\n      id\n      gameEnded\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SelectedShootOverviewQuery($memberId: BigInt!) {\n    membersCollection(filter: { id: {eq: $memberId} }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SelectedShootOverviewQuery($memberId: BigInt!) {\n    membersCollection(filter: { id: {eq: $memberId} }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n    name\n    date\n\n    teamGameCollection {\n      edges {\n        node {\n          id\n          team {\n            external\n            teamName\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GameFragment on Game {\n    id\n    duration\n    gameEnded\n    name\n    date\n\n    teamGameCollection {\n      edges {\n        node {\n          id\n          team {\n            external\n            teamName\n          }\n        }\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query clubQuery($clubId: BigInt!) {\n    clubCollection(filter: { id: {eq: $clubId} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query clubQuery($clubId: BigInt!) {\n    clubCollection(filter: { id: {eq: $clubId} }) {\n      edges {\n        node {\n          id\n          ...HomeFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gamesQuery($clubId: BigInt!, $categoryId: BigInt!) {\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId}  }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId} }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query gamesQuery($clubId: BigInt!, $categoryId: BigInt!) {\n    gameEndedCollection: gameCollection(filter: { gameEnded: { eq: true }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId}  }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n    gameInProgressCollection: gameCollection(filter: { gameEnded: { eq: false }, categoryId: { eq: $categoryId }, clubId: { eq: $clubId} }, orderBy: [{date: DescNullsLast}]) {\n      edges {\n        ...GameListFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    license\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MemberItemFragment on Members {\n    id\n    firstName\n    lastName\n    pseudo\n    license\n    shootsCollection {\n      edges {\n        node {\n          id\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query membersQuery($clubId: BigInt!, $categoryId: BigInt) {\n    membersCollection(filter: {clubId: {eq: $clubId}, categoryId: {eq: $categoryId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query membersQuery($clubId: BigInt!, $categoryId: BigInt) {\n    membersCollection(filter: {clubId: {eq: $clubId}, categoryId: {eq: $categoryId}}) {\n      edges {\n        node {\n          id\n          ...MemberItemFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SelectPlayerItemQuery on Members {\n    id\n    firstName\n    lastName\n    pseudo\n  }\n"): (typeof documents)["\n  fragment SelectPlayerItemQuery on Members {\n    id\n    firstName\n    lastName\n    pseudo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query playerQuery($playerId: BigInt) {\n    membersCollection(filter: { id: { eq: $playerId } }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n          license\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query playerQuery($playerId: BigInt) {\n    membersCollection(filter: { id: { eq: $playerId } }) {\n      edges {\n        node {\n          id\n          firstName\n          lastName\n          pseudo\n          license\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query selectPlayerQuery($teamGameId: BigInt) {\n    teamMembersCollection(filter: { teamGameId: { eq: $teamGameId } }) {\n      edges {\n        node {\n          id\n          member {\n            ...SelectPlayerItemQuery\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query selectPlayerQuery($teamGameId: BigInt) {\n    teamMembersCollection(filter: { teamGameId: { eq: $teamGameId } }) {\n      edges {\n        node {\n          id\n          member {\n            ...SelectPlayerItemQuery\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TeamItemFragment on Team {\n    id\n    teamName\n  }\n"): (typeof documents)["\n  fragment TeamItemFragment on Team {\n    id\n    teamName\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query teamsModalQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {external: {eq: $external}, clubId: {eq: $clubId}, categoryId: {eq: $categoryId} }) {\n      edges {\n        node {\n          ...TeamItemFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query teamsModalQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {\n    teamCollection(filter: {external: {eq: $external}, clubId: {eq: $clubId}, categoryId: {eq: $categoryId} }) {\n      edges {\n        node {\n          ...TeamItemFragment\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;