import { ClubQueryQuery, GamesQueryQuery } from "../gql/graphql";
import { TeamScore } from "../screens/Home/GameSection";

export const gamesDataFixture = {
    "gameEndedCollection": {
        "edges": [
            {
                "node": {
                    "id": "89",
                    "date": "2023-10-08T08:35:54.877",
                    "name": "Test3",
                    "duration": 60,
                    "gameEnded": true,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "101",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "102",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
    "gameInProgressCollection": {
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
                                    "id": "105",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "106",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "node": {
                    "id": "90",
                    "date": "2023-10-08T08:36:05.751",
                    "name": "Test4",
                    "duration": 60,
                    "gameEnded": false,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "103",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "104",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "node": {
                    "id": "88",
                    "date": "2023-10-08T08:35:47.55",
                    "name": "Test2",
                    "duration": 60,
                    "gameEnded": false,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "99",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "100",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "node": {
                    "id": "87",
                    "date": "2023-10-08T08:35:30.878",
                    "name": "Test",
                    "duration": 60,
                    "gameEnded": false,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "97",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "98",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                "node": {
                    "id": "86",
                    "date": "2023-10-07T21:23:56.789",
                    "name": "Coupe de France",
                    "duration": 60,
                    "gameEnded": false,
                    "teamGameCollection": {
                        "edges": [
                            {
                                "node": {
                                    "id": "95",
                                    "team": {
                                        "external": false,
                                        "teamName": "Rennes A"
                                    }
                                }
                            },
                            {
                                "node": {
                                    "id": "96",
                                    "team": {
                                        "external": true,
                                        "teamName": "Nantes A"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }
} as unknown as GamesQueryQuery


export const clubDataFixture = {
    "clubCollection": {
        "edges": [
            {
                "node": {
                    "id": "3",
                    "name": "Ar Gwazy Guez"
                }
            }
        ]
    }
} as unknown as ClubQueryQuery


//generateTeamScoreFixture generates a random number of entries based on
/*
{
        "teamGameId": 105,
        "gameId": 91,
        "type": "goal",
        "count": 1
    }
*/
export const generateTeamScoreFixture = ({ teamGameId, gameId = 89 }): TeamScore[] => {
    return [
        {
            teamGameId,
            gameId,
            "type": "goal",
            count: Math.floor(Math.random() * 10)
        },
        {
            teamGameId,
            gameId,
            "type": "point",
            count: Math.floor(Math.random() * 10)
        },
        {
            teamGameId,
            gameId,
            "type": "missed",
            count: Math.floor(Math.random() * 10)
        },
        {
            teamGameId,
            gameId,
            "type": "blocked",
            count: Math.floor(Math.random() * 10)
        },
    ]
}
