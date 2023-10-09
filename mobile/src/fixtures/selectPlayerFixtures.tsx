import { SelectPlayerQueryQuery } from "../gql/graphql";

export const playersDataFixture = {
    "teamMembersCollection": {
        "edges": [
            {
                "node": {
                    "id": "102",
                    "member": {
                        "id": "1790",
                        "pseudo": "BG",
                        "lastName": "Geffrault",
                        "firstName": "Baptiste"
                    }
                }
            }
        ]
    }
} as unknown as SelectPlayerQueryQuery
