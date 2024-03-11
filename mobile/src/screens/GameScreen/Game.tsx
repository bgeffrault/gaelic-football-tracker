import { useEffect, useMemo, useState } from "react";
import { AddingShoot, FieldZone, ShootType, TeamShoots } from "./FielZone";
import { gameResultGradientColors } from "../../utils/shootsUtils";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SelectedShootOverview } from "./SelectedShootOverview";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSubscription } from "../../useSupabaseSubscription";
import { NavigationRoutes, useAppNavigation } from "../../navigators";
import { useAppSelector } from "../../stores/store";
import { ScoreTable, TeamShootAction, useScore } from "./ScoreTable";
import { TouchFieldInfo } from "./TouchFieldInfo";
import { setPlayerId } from "../../stores";
import { useDispatch } from "react-redux";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { Shoot } from "../../domain/types";



const useShootSubscription = ({ teamGameState, opponentTeamGameState, updateTeamGameState, updateOpponentGameState, gameId }:
    { teamGameState: TeamShoots, opponentTeamGameState: TeamShoots, updateTeamGameState: React.Dispatch<TeamShootAction>, updateOpponentGameState: React.Dispatch<TeamShootAction>, gameId: number }) => {
    const queryClient = useQueryClient();

    useSubscription<Pick<Shoot, "id" | "created_at" | "memberId" | "x" | "y" | "type" | "teamGameId">>({
        table: 'Shoots',
        filter: `teamGameId=in.(${teamGameState.teamGameId},${opponentTeamGameState.teamGameId})`
    }, (payload) => {
        switch (payload.eventType) {
            case "INSERT":
                const { teamGameId, type, x, y, memberId, id } = payload.new;
                if (Number(teamGameState.teamGameId) === Number(teamGameId)) {
                    updateTeamGameState({ type: `ADD_${type.toUpperCase()}` as TeamShootAction["type"], payload: { x, y, type, memberId, id } })
                    break
                }
                if (Number(opponentTeamGameState.teamGameId) === Number(teamGameId)) {
                    updateOpponentGameState({ type: `ADD_${type.toUpperCase()}` as TeamShootAction["type"], payload: { x, y, type, memberId, id } })
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

const useAddShootingPlayer = ({ addingShoot,
    setAddingShoot, gameId }: {
        addingShoot: AddingShoot | null;
        setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
        gameId: number;
    }) => {
    const supabaseClient = useSupabaseClientContext();
    const queryClient = useQueryClient();
    const { location, teamGameId } = useMemo(() => ({ location: addingShoot?.location, teamGameId: addingShoot?.teamGameId }), [addingShoot])
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: async ({ x, y, teamGameId, type, memberId }: Pick<Shoot, "x" | "y" | "teamGameId" | "type" | "memberId">) => {
            const result = await supabaseClient.from('Shoots').insert({
                x,
                y,
                type,
                teamGameId,
                memberId,
            })
            return result.data
        },
        onSuccess: () => {
            // @To do: invalidate games query
            queryClient.invalidateQueries({ queryKey: ["teamScore", { teamGameId }] });
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
            setAddingShoot(undefined)
            dispatch(setPlayerId(undefined))
        }
    }, [playerId, addingShoot])
}

export type TeamGame = {
    created_at: string;
    gameId: number;
    id: number;
    teamId: number;
    Team: {
        teamName: string;
        external: boolean;
    };
    Shoots: {
        id: number;
        memberId: number;
        type: string;
        x: number;
        y: number;
        teamGameId: number;
    }[];
}

export const Game = ({ gameId, teamGame, opponentTeamGame, game, teamGameState,
    updateTeamGameState, opponentTeamGameState, updateOpponentGameState
}: {
    gameId: number;
    teamGame: TeamGame;
    opponentTeamGame: TeamGame;
    game: {
        gameEnded: boolean;
        gameId: number;
        duration: number
    };
    teamGameState: TeamShoots;
    updateTeamGameState: React.Dispatch<TeamShootAction>;
    opponentTeamGameState: TeamShoots;
    updateOpponentGameState: React.Dispatch<TeamShootAction>;
}) => {
    const navigation = useAppNavigation();
    const route = useRoute<RouteProp<NavigationRoutes, "Game">>();
    const isOpponentTeamSelected = route.params.isOpponentTeamSelected

    const [addingShoot, setAddingShoot] = useState<AddingShoot>(null);
    const [selectedShoot, setSelectedShoot] = useState<Shoot>(null);


    const teamScore = useScore(teamGameState, updateTeamGameState);
    const opponentTeamScore = useScore(opponentTeamGameState, updateOpponentGameState);

    const handleShoot = (type: ShootType, teamGame: TeamShoots, isOpponent: boolean) => {
        setAddingShoot({ type, teamGameId: teamGame.teamGameId, location: null });
        navigation.setParams({ isOpponentTeamSelected: isOpponent })
    };

    const handleShootPressed = (shoot?: Shoot) => {
        // @To do: Bug it teleports the shoot randomly
        // setSelectedShoot(shoot);
    };


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
                teamScore={teamScore}
                opponentTeamScore={opponentTeamScore}
                teamName={teamGame.Team.teamName}
                opponentTeamName={opponentTeamGame.Team.teamName}
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


