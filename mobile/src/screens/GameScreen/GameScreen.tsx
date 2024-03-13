import { useEffect, useReducer } from "react";
import { SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  AppNavigationProp,
  AppRouteProp,
  NavigationRoutes,
  useAppNavigation,
} from "../../navigators";
import { Game, TeamGame } from "./Game";
import { resetGame, resetPlayerId } from "../../stores";
import { CustomButton } from "../../components/CustomButton";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { TeamShoots } from "./FielZone";
import { StyledText } from "../../components/StyledText";
import { TeamShootAction } from "./ScoreTable";
import { Shoot } from "../../domain/types";

SplashScreen.preventAutoHideAsync();

export function EditGameIconButton() {
  const route = useRoute<RouteProp<NavigationRoutes, "Game">>();
  const navigation = useAppNavigation();
  return (
    <CustomButton
      onPress={() => {
        navigation.navigate("EditGame", { gameId: route.params.gameResult.id });
      }}
    >
      <Ionicons name="document-text" size={24} color="#DF8C5F" />
    </CustomButton>
  );
}

const useRouteGameId = (route: AppRouteProp<"Game">) => {
  return route.params.gameResult.id;
};

type GameType = {
  categoryId: number;
  clubId: number;
  created_at: string;
  date: string;
  duration: number;
  gameEnded: boolean;
  id: number;
  name: string;
  TeamGame: TeamGame[];
};

const useGameShoots = (gameId: number) => {
  const supabaseClient = useSupabaseClientContext();
  const { data: game, ...queryResults } = useQuery({
    queryKey: ["game shoots", { gameId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Game")
        .select("*, TeamGame(*, Team(teamName, external), Shoots(*))")
        .order("id", { referencedTable: "TeamGame", ascending: true })
        .filter("id", "eq", gameId)
        .limit(1)
        .single();

      return result.data;
    },
  });

  return { game, ...queryResults };
};

const useTeams = (game?: GameType) => {
  if (!game) {
    return { teamGame: null, opponentTeamGame: null };
  }
  const teamGames = game.TeamGame;
  const teamGame1 = teamGames[0];
  const teamGame2 = teamGames[1];
  const teamGame = teamGame1.Team.external ? teamGame2 : teamGame1;
  const opponentTeamGame = teamGame1.Team.external ? teamGame1 : teamGame2;

  return { teamGame, opponentTeamGame };
};

const useTeamShoots = (
  teamGame: TeamGame,
): [state: TeamShoots, update: React.Dispatch<TeamShootAction>] => {
  const initialState = teamGame.Shoots.reduce(
    (prev, curr) => {
      (prev[`${curr.type}Shoots`] as Shoot[]).push({ ...curr });
      return prev;
    },
    {
      pointShoots: [] as Shoot[],
      goalShoots: [] as Shoot[],
      missedShoots: [] as Shoot[],
      blockedShoots: [] as Shoot[],
      teamGameId: teamGame.id,
    },
  );

  const reducer = useReducer((current: TeamShoots, action: TeamShootAction) => {
    switch (action.type) {
      case "ADD_POINT":
        return {
          ...current,
          pointShoots: [...current.pointShoots, action.payload],
        };
      case "ADD_GOAL":
        return {
          ...current,
          goalShoots: [...current.goalShoots, action.payload],
        };
      case "ADD_MISSED":
        return {
          ...current,
          missedShoots: [...current.missedShoots, action.payload],
        };
      case "ADD_BLOCKED":
        return {
          ...current,
          blockedShoots: [...current.blockedShoots, action.payload],
        };

      default:
        return current;
    }
  }, initialState);

  return reducer;
};

function GameContainer({
  teamGame,
  opponentTeamGame,
  gameId,
  gameEnded,
  duration,
}: {
  teamGame: TeamGame;
  opponentTeamGame: TeamGame;
  gameId: number;
  duration: number;
  gameEnded: boolean;
}) {
  const dispatch = useDispatch();
  const [teamGameState, updateTeamGameState] = useTeamShoots(teamGame);
  const [opponentTeamGameState, updateOpponentGameState] =
    useTeamShoots(opponentTeamGame);

  useEffect(() => {
    return () => {
      dispatch(resetPlayerId());
      dispatch(resetGame());
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Game
        gameId={gameId}
        teamGame={teamGame}
        opponentTeamGame={opponentTeamGame}
        game={{ gameEnded, gameId, duration }}
        teamGameState={teamGameState}
        updateTeamGameState={updateTeamGameState}
        opponentTeamGameState={opponentTeamGameState}
        updateOpponentGameState={updateOpponentGameState}
      />
    </SafeAreaView>
  );
}

export function GameScreen({ route }: AppNavigationProp<"Game">) {
  const gameId = useRouteGameId(route);
  // const { data, isFetching } = useInfiniteGameQuery(gameId);
  const { game, isFetching } = useGameShoots(gameId);

  const { teamGame, opponentTeamGame } = useTeams(game);

  if (isFetching) {
    return null;
  }
  if (!game) {
    return <StyledText>No game</StyledText>;
  }

  return (
    <GameContainer
      teamGame={teamGame}
      opponentTeamGame={opponentTeamGame}
      gameId={gameId}
      duration={game.duration}
      gameEnded={game.gameEnded}
    />
  );
}
