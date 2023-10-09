import { MembersQueryQuery } from "../gql/graphql";
import { PlayerShoots } from "../screens/Player";

export const membersDataFixture = {
    "membersCollection": {
        "edges": [
            {
                "node": {
                    "id": "1790",
                    "pseudo": "BG",
                    "license": null,
                    "lastName": "Geffrault",
                    "firstName": "Baptiste",
                    "shootsCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "132",
                                    "type": "point"
                                }
                            },
                            {
                                "node": {
                                    "id": "135",
                                    "type": "goal"
                                }
                            },
                            {
                                "node": {
                                    "id": "142",
                                    "type": "point"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "node": {
                    "id": "1791",
                    "pseudo": "RG",
                    "license": "FR1467789809",
                    "lastName": "Geffrault",
                    "firstName": "Romain",
                    "shootsCollection": {
                        "edges": []
                    }
                }
            }
        ]
    }
} as unknown as MembersQueryQuery

export const playerScoreDataFixture = [
    {
        // "memberId": 1790,
        "type": "goal",
        "count": 1
    },
    {
        // "memberId": 1790,
        "type": "point",
        "count": 2
    }
] as PlayerShoots[]
