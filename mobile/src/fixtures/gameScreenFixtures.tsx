import { GameQueryQuery, SelectedShootOverviewQueryQuery } from "../gql/graphql";

export const gameScreenFixtures = {
    "gameCollection": {
        "edges": [
            {
                "node": {
                    "id": "91",
                    "date": "2023-10-08T08:41:23.747",
                    "name": "Test6",
                    "duration": 60,
                    "gameEnded": false,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "106",
                                    "team": {
                                        "id": "65",
                                        "category": {
                                            "name": "homme"
                                        },
                                        "external": true,
                                        "teamName": "Nantes A"
                                    },
                                    "shootsCollection": {
                                        "edges": [
                                            {
                                                "node": {
                                                    "x": "219",
                                                    "y": "186",
                                                    "id": "138",
                                                    "type": "point",
                                                    "memberId": null
                                                }
                                            }
                                        ],
                                        "pageInfo": {
                                            "endCursor": "WzEzOF0=",
                                            "hasNextPage": false
                                        }
                                    },
                                    "teamMembersCollection": {
                                        "edges": []
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "105",
                                    "team": {
                                        "id": "64",
                                        "category": {
                                            "name": "homme"
                                        },
                                        "external": false,
                                        "teamName": "Rennes A"
                                    },
                                    "shootsCollection": {
                                        "edges": [
                                            {
                                                "node": {
                                                    "x": "264",
                                                    "y": "153",
                                                    "id": "131",
                                                    "type": "point",
                                                    "memberId": "1790"
                                                }
                                            },
                                            {
                                                "node": {
                                                    "x": "264",
                                                    "y": "153",
                                                    "id": "132",
                                                    "type": "point",
                                                    "memberId": "1790"
                                                }
                                            },
                                            {
                                                "node": {
                                                    "x": "84",
                                                    "y": "164",
                                                    "id": "133",
                                                    "type": "point",
                                                    "memberId": "1790"
                                                }
                                            },
                                            {
                                                "node": {
                                                    "x": "155",
                                                    "y": "33",
                                                    "id": "139",
                                                    "type": "goal",
                                                    "memberId": "1790"
                                                }
                                            }
                                        ],
                                        "pageInfo": {
                                            "endCursor": "WzEzOV0=",
                                            "hasNextPage": false
                                        }
                                    },
                                    "teamMembersCollection": {
                                        "edges": [
                                            {
                                                "node": {
                                                    "id": "102",
                                                    "member": {
                                                        "id": "1790",
                                                        "lastName": "Geffrault",
                                                        "firstName": "Baptiste"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }
} as unknown as GameQueryQuery

export const memberDataFixture = (id: number) => {
    return {
        "membersCollection": {
            "edges": [
                {
                    "node": {
                        "id": id,
                        "pseudo": "BG",
                        "lastName": "Geffrault",
                        "firstName": "Baptiste",
                        "license": "FR1624"
                    }
                }
            ]
        }
    } as unknown as SelectedShootOverviewQueryQuery
} 
