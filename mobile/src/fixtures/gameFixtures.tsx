import { GameQueryQuery, GameScreenTeamItemFragmentFragment } from "../gql/graphql"

export const teamGameFixture: GameScreenTeamItemFragmentFragment = {
    id: 1,
    team: {
        __typename: 'Team',
        id: 1, teamName: "Rennes",
        external: false,
        category: {
            __typename: 'Category',
            name: "homme"
        }
    },
    teamMembersCollection: {
        __typename: 'TeamMembersConnection',
        edges: [
            {
                __typename: 'TeamMembersEdge',
                node: {
                    __typename: 'TeamMembers',
                    id: 1,
                    member: {
                        __typename: 'Members',
                        id: 1,
                        firstName: "Alexandre",
                        lastName: "Legrand"
                    }
                }
            }
        ]
    },
    shootsCollection: {
        __typename: 'ShootsConnection',
        pageInfo: {
            __typename: 'PageInfo',
            endCursor: null,
            hasNextPage: false
        },
        edges: [
            {
                __typename: 'ShootsEdge',
                node: {
                    __typename: 'Shoots',
                    id: 1,
                    x: 200,
                    y: 100,
                    type: "point",
                    memberId: 1
                }
            },
            {
                __typename: 'ShootsEdge',
                node: {
                    __typename: 'Shoots',
                    id: 3,
                    x: 150,
                    y: 10,
                    type: "goal",
                    memberId: 1
                }
            },
            {
                __typename: 'ShootsEdge',
                node: {
                    __typename: 'Shoots',
                    id: 5,
                    x: 150,
                    y: 300,
                    type: "missed",
                    memberId: 1
                }
            }
        ]
    }
}

export const teamGameFixture2: GameScreenTeamItemFragmentFragment = {
    id: 1,
    team: {
        __typename: 'Team',
        id: 1, teamName: "Nantes",
        external: true,
        category: {
            __typename: 'Category',
            name: "homme"
        }
    },
    teamMembersCollection: {
        __typename: 'TeamMembersConnection',
        edges: [
            {
                __typename: 'TeamMembersEdge',
                node: {
                    __typename: 'TeamMembers',
                    id: 2,
                    member: {
                        __typename: 'Members',
                        id: 2,
                        firstName: "Benoit",
                        lastName: "karl"
                    }
                }
            }
        ]
    },
    shootsCollection: {
        __typename: 'ShootsConnection',
        pageInfo: {
            __typename: 'PageInfo',
            endCursor: null,
            hasNextPage: false
        },
        edges: [
            // {
            //   __typename: 'ShootsEdge',
            //   node: {
            //     __typename: 'Shoots',
            //     id: 1,
            //     x: 300,
            //     y: 100,
            //     type: "point",
            //     memberId: 1
            //   }
            // },
            // {
            //   __typename: 'ShootsEdge',
            //   node: {
            //     __typename: 'Shoots',
            //     id: 4,
            //     x: 200,
            //     y: 10,
            //     type: "goal",
            //     memberId: 1
            //   }
            // }
        ]
    }
}

export const data: GameQueryQuery = {
    gameCollection: {
        edges: [
            {
                node: {
                    name: "Fixture",
                    __typename: 'Game',
                    id: 1,
                    date: "2023-01-11",
                    duration: 60,
                    gameEnded: false,
                    teamGameCollection: {
                        __typename: 'TeamGameConnection',
                        edges: [
                            {
                                __typename: 'TeamGameEdge',
                                node: {
                                    __typename: 'TeamGame',
                                    ...teamGameFixture
                                }
                            },
                            {
                                __typename: 'TeamGameEdge',
                                node: {
                                    __typename: 'TeamGame',
                                    ...teamGameFixture2
                                }
                            }
                        ]
                    }

                }
            }
        ]
    }
}
