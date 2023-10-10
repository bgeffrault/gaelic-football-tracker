import { useEffect, useMemo, useReducer, useState } from "react";
import { AddingShoot, FieldZone, Shoot, ShootType, TeamShoots } from "./FielZone";
import { gameResultGradientColors } from "../../utils/shootsUtils";
import { DocumentType, graphql } from "../../gql";
import { useRoute } from "@react-navigation/native";
import { SelectedShootOverview } from "./SelectedShootOverview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';

import { Shoots } from "../../gql/graphql";
import { useSubscription } from "../../useSupabaseSubscription";
import { useAppNavigation } from "../../navigators";
import { useAppSelector } from "../../stores/store";
import { ScoreTable, useScore } from "./ScoreTable";
import { View } from "react-native";
import { StyledText } from "../../components/StyledText";
import { TouchFieldInfo } from "./TouchFieldInfo";

export const GameScreenTeamItemFragment = graphql(/* GraphQL */ `
  fragment GameScreenTeamItemFragment on TeamGame {
    id
    team {
      id
      teamName
      external
      category {
        name
      }
    }
    teamMembersCollection {
      edges {
        node {
          id
          member {
            id
            firstName
            lastName
          }
        }
      }
    }
    shootsCollection(after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          x
          y
          type
          memberId
        }
      }
    }
  }
`)

const useTeamShoots = (teamGame: DocumentType<typeof GameScreenTeamItemFragment>): [state: TeamShoots, update: React.Dispatch<Partial<TeamShoots>>] => {
    const initialState = teamGame.shootsCollection.edges.reduce((prev, curr) => {
        prev[`${curr.node.type}Shoots`].push({
            x: Number(curr.node.x),
            y: Number(curr.node.y),
            type: curr.node.type,
            memberId: Number(curr.node.memberId)
        });
        return prev;
    }, {
        pointShoots: [],
        goalShoots: [],
        missedShoots: [],
        blockedShoots: [],
        teamGameId: teamGame.id
    });

    const reducer = useReducer(
        (current: TeamShoots, partialState: Partial<TeamShoots>) => {
            return ({
                ...current,
                ...partialState,
            });
        },
        initialState
    );

    return reducer;
};

const useShootSubscription = ({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId }:
    { teamGameState: TeamShoots, opponentTeamGameState: TeamShoots, updateTeamGameState: React.Dispatch<Partial<TeamShoots>>, updateOpponentGameState: React.Dispatch<Partial<TeamShoots>>, gameId: number }) => {
    const queryClient = useQueryClient();

    useSubscription<Pick<Shoots, "id" | "created_at" | "memberId" | "x" | "y" | "type" | "teamGameId">>({
        table: 'Shoots',
        filter: `teamGameId=in.(${teamGameState.teamGameId},${opponentTeamGameState.teamGameId})`
    }, (payload) => {
        switch (payload.eventType) {
            case "INSERT":
                const { teamGameId, type, x, y, memberId } = payload.new;
                if (Number(teamGameState.teamGameId) === Number(teamGameId)) {
                    updateTeamGameState({ [`${type}Shoots`]: [...teamGameState[`${type}Shoots`], { x, y, type, memberId }] })
                    break
                }
                if (Number(opponentTeamGameState.teamGameId) === Number(teamGameId)) {
                    updateOpponentGameState({ [`${type}Shoots`]: [...opponentTeamGameState[`${type}Shoots`], { x, y, type, memberId }] })
                    break
                }
                console.warn("No team matched for this insert")
                break;

            case "UPDATE": // @To do: update the shoot
            case "DELETE": // @To do: delete the shoot
            default:
                console.warn("No match for this subscription event")
                break;
        }
        queryClient.invalidateQueries({ queryKey: ["game", { gameId }], exact: true });
    })
}

const AddShootMutation = graphql(/* GraphQL */ `
  mutation AddShootMutation($x: BigInt!, $y: BigInt!, $type: String!, $teamGameId: BigInt!, $memberId: BigInt!) {
    insertIntoShootsCollection(objects: {x: $x, y: $y, type: $type, teamGameId: $teamGameId, memberId: $memberId}) {
      records {
        id
      }
    }
  }
`);

const useAddShootingPlayer = ({ addingShoot,
    setAddingShoot, gameId }: {
        addingShoot: AddingShoot | null;
        setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
        gameId: number;
    }) => {
    const queryClient = useQueryClient();
    const { location, teamGameId } = useMemo(() => ({ location: addingShoot?.location, teamGameId: addingShoot?.teamGameId }), [addingShoot])

    const mutation = useMutation({
        mutationFn: async ({ x, y, teamGameId, type, memberId }: Pick<Shoots, "x" | "y" | "teamGameId" | "type" | "memberId">) =>
            request(
                Constants.expoConfig.extra.supabaseUrlGraphQl,
                AddShootMutation,
                { x, y, teamGameId, type, memberId },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
        onSuccess: () => {
            // @To do: invalidate games query
            queryClient.invalidateQueries({ queryKey: ["teamScore", { teamGameId }] });
            setAddingShoot(null)
        },
    })

    const navigation = useAppNavigation();
    const playerId = useAppSelector((state) => state.player.playerId);

    useEffect(() => {
        if (location) {
            navigation.navigate("SelectPlayer", { teamGameId });
        }
    }, [location, teamGameId, navigation])

    useEffect(() => {
        if ((playerId || playerId === null) && addingShoot?.location) {
            mutation.mutate({ ...addingShoot.location, teamGameId: addingShoot.teamGameId, type: addingShoot.type, memberId: playerId })
        }

    }, [playerId, addingShoot])
}

export const Game = ({ gameId, teamGame, opponentTeamGame, game }: {
    gameId: number;
    teamGame: DocumentType<typeof GameScreenTeamItemFragment>;
    opponentTeamGame: DocumentType<typeof GameScreenTeamItemFragment>;
    game: {
        gameEnded: boolean;
        gameId: number;
        duration: number
    };
}) => {
    const navigation = useAppNavigation();
    const route = useRoute();
    const isOpponentTeamSelected = (route.params as any).isOpponentTeamSelected

    const [addingShoot, setAddingShoot] = useState<AddingShoot>(null);
    const [selectedShoot, setSelectedShoot] = useState<Shoot>(null);

    const [teamGameState, updateTeamGameState] = useTeamShoots(teamGame);
    const [opponentTeamGameState, updateOpponentGameState] = useTeamShoots(opponentTeamGame);
    const teamAScore = useScore(teamGameState, updateTeamGameState);
    const teamBScore = useScore(opponentTeamGameState, updateOpponentGameState);

    const handleShoot = (type: ShootType, teamGame: TeamShoots, isOpponent: boolean) => {
        setAddingShoot({ type, teamGameId: teamGame.teamGameId, location: null });
        navigation.setParams({ isOpponentTeamSelected: isOpponent })
    };

    const handleShootPressed = (shoot?: Shoot) => {
        // @To do: Bug it teleports the shoot randomly
        // setSelectedShoot(shoot);
    };

    const result = useMemo(() => {
        if (teamAScore.total > teamBScore.total) return "win";
        if (teamAScore.total < teamBScore.total) return "lose";
        return "draw";
    }, [teamAScore, teamBScore]);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: gameResultGradientColors[result][result === "win" ? 0 : 1]
            }
        });
    }, [navigation, result]);

    useAddShootingPlayer({ addingShoot, setAddingShoot, gameId });

    useShootSubscription({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId });

    return (<>
        <FieldZone
            cn="mt-2"
            addingShoot={addingShoot}
            setAddingShoot={setAddingShoot}
            teamGameState={isOpponentTeamSelected ? opponentTeamGameState : teamGameState}
            onPress={handleShootPressed}
            isOpponentSelected={isOpponentTeamSelected}

        />
        {!Boolean(addingShoot) ? <>
            <SelectedShootOverview shoot={selectedShoot} teamGameId={isOpponentTeamSelected ? opponentTeamGame.id : teamGame.id} />
            <ScoreTable
                onShoot={handleShoot}
                teamScore={teamAScore}
                opponentTeamScore={teamBScore}
                teamName={teamGame.team.teamName}
                opponentTeamName={opponentTeamGame.team.teamName}
                addingShoot={Boolean(addingShoot)}
                game={game}
                isOpponentTeamSelected={isOpponentTeamSelected}
                setIsOpponentTeamSelected={(isOpponent) => navigation.setParams({ isOpponentTeamSelected: isOpponent })}
            />
        </>
            : <TouchFieldInfo />
        }
    </>
    );
};


