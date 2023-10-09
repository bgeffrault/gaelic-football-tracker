import { TeamsQueryQuery } from "../gql/graphql";

export const dataClubTeamsFixture = {
    "teamCollection": {
        "edges": [
            {
                "node": {
                    "id": "64",
                    "teamName": "Rennes A"
                }
            }
        ]
    }
} as unknown as TeamsQueryQuery;

export const dataExternalTeamsFixture = {
    "teamCollection": {
        "edges": [
            {
                "node": {
                    "id": "65",
                    "teamName": "Nantes A"
                }
            }
        ]
    }
} as unknown as TeamsQueryQuery;
