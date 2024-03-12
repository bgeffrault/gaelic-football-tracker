import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { CustomButton } from "../../components/CustomButton";
import { HeaderRightAddButton } from "../../components/Header/HeaderRightAddButton";
import { useAppNavigation } from "../../navigators";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import { GamesSection } from "./GameSection";
import { CategoryFilter } from "../../components/CategoryFilter";
import { StyledText } from "../../components/StyledText";
import { SectionContainer } from "../../components/SectionContainer";
import { SectionTitle } from "../../components/SectionTitle";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { GamesFilter } from "./GamesFilter";
import { getGameResult, getActionsCountByType } from "../../utils/shootsUtils";
import {
  Game,
  GameContent,
  GameResult,
  GameResultByTeam,
} from "../../types/Game";
import { GAME_RESULT_SELECTOR } from "../../selectors/Game";

function NoGames({ title, cn }: { title: string; cn?: string }) {
  return (
    <SectionContainer cn={cn}>
      <SectionTitle label={title} />
      <View className="flex items-center p-3">
        <StyledText>No games yet</StyledText>
      </View>
    </SectionContainer>
  );
}

const groupById = (data?: Game[]): GameContent => {
  if (!data) return [];
  const groupedData = data.reduce((acc, item) => {
    const gameResults = item.GameResult;
    const internalTeamGame = item.TeamGame?.[0]?.Team.external
      ? item.TeamGame[1]
      : item.TeamGame[0];

    if (item.TeamGame?.length !== 2) return acc;

    const externalTeamGame = item.TeamGame?.[0]?.Team.external
      ? item.TeamGame[0]
      : item.TeamGame[1];
    const internalTeamGameId = internalTeamGame.id;

    const { teamActions, opponentTeamActions } = gameResults.reduce(
      (acc2, gameResult) => {
        if (gameResult.teamGameId === internalTeamGameId)
          acc2.teamActions.push(gameResult);
        else acc2.opponentTeamActions.push(gameResult);
        return acc2;
      },
      { teamActions: [], opponentTeamActions: [] },
    );

    const teamGame = {
      gameResults: teamActions,
      teamName: internalTeamGame.Team.teamName,
      external: internalTeamGame.Team.external,
      categoryId: internalTeamGame.Team.categoryId,
      actionsCountByType: getActionsCountByType(teamActions as GameResult[]),
    };

    const opponentTeamGame = {
      gameResults: opponentTeamActions,
      teamName: externalTeamGame.Team.teamName,
      external: externalTeamGame.Team.external,
      categoryId: externalTeamGame.Team.categoryId,
      actionsCountByType: getActionsCountByType(
        opponentTeamActions as GameResult[],
      ),
    };

    acc.push({
      teamGame,
      opponentTeamGame,
      ...item,
      outcome: getGameResult(
        teamGame.actionsCountByType,
        opponentTeamGame.actionsCountByType,
      ),
    });

    return acc;
  }, [] as GameContent);

  return groupedData;
};

const useGamesResult = (categoryId: number) => {
  const supabaseClient = useSupabaseClientContext();
  const clubId = useClubIdContext();
  const { data, ...queryResults } = useQuery({
    queryKey: ["games", { categoryId, clubId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Game")
        .select(GAME_RESULT_SELECTOR) // @To-improve: improve view by removing unnecessary fields
        .filter("categoryId", "eq", categoryId)
        .filter("clubId", "eq", clubId)
        .order("date", { ascending: false });

      const games = result.data;
      const gamesId = games.map((game) => game.id);

      const resultGameResults = await supabaseClient
        .from("GameResult")
        .select("*")
        .in("id", gamesId);

      const finalResult: Game[] = games.map((game) => {
        const gameResults = resultGameResults.data.filter(
          (gameResult) => gameResult.id === game.id,
        );
        return { ...game, GameResult: gameResults as GameResult[] };
      });

      return finalResult;
    },
  });

  return {
    ...queryResults,
    games: groupById(data?.filter((game) => !game.gameEnded)) ?? [],
    gamesEnded: groupById(data?.filter((game) => game.gameEnded)) ?? [],
  };
};

const useRefetchOnScreenFocused = (
  refetch: ReturnType<typeof useQuery>["refetch"],
) => {
  const isFocused = useIsFocused();
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
};

// @To-do: It does not work with games without shoots
export function Home() {
  const [categoryId, setCategoryId] = useState(1);
  const [oldGamesFilter, setOldGamesFilter] = useState(true);
  const supabaseClient = useSupabaseClientContext();

  const navigation = useAppNavigation();
  const clubId = useClubIdContext();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", { clubId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Club")
        .select("id, name")
        .filter("id", "eq", clubId)
        .single();
      return result.data;
    },
  });

  const {
    games,
    gamesEnded,
    isLoading: isLoadingGames,
    refetch: refetchGames,
    isRefetching,
  } = useGamesResult(categoryId);

  const isInProgressGame = (game: GameResultByTeam) => {
    const setMidnight = (date: Date) => {
      date.setHours(0, 0, 0, 0);
      return date;
    };

    // Get the current date and time, then set its time to midnight
    const currentDate = setMidnight(new Date());
    console.log("currentDate", currentDate);
    const parsedDate = new Date(game.date);
    console.log("parsedDate", parsedDate);
    // Set the parsed date time to midnight
    const comparedDate = setMidnight(new Date(parsedDate));
    console.log("comparedDate > currentDate", comparedDate > currentDate);
    return comparedDate <= currentDate;
  };

  const gamesToCome = useMemo(
    () => games.filter((game) => !isInProgressGame(game)),
    [games],
  );
  const gamesInProgress = useMemo(
    () => games.filter((game) => isInProgressGame(game)),
    [games],
  );

  const onRefresh = () => {
    refetchGames();
  };

  const clubName = useMemo(() => {
    if (club) return club.name;
    return "Home";
  }, [club]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightAddButton nav="NewGame" />,
      headerTitle: clubName,
    });
  }, [navigation, clubName]);

  useRefetchOnScreenFocused(refetchGames);

  if (isLoading || isLoadingGames) {
    // @To do: add a loading indicator
    return null;
  }

  return (
    <View className="flex-1">
      <CategoryFilter
        onPress={(id) => setCategoryId(id)}
        categoryId={categoryId}
      />
      <ScrollView
        className="py-1 grow flex-1"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        {Object.keys(gamesInProgress).length > 0 ? (
          <View className="mb-3">
            <GamesSection games={games} title="In progress" />
          </View>
        ) : (
          <NoGames title="In progress" cn="" />
        )}
        <GamesFilter
          oldGame={oldGamesFilter}
          onPress={(oldGames) => setOldGamesFilter(oldGames)}
        />
        {!oldGamesFilter &&
          (Object.keys(gamesToCome).length > 0 ? (
            <View className="mb-3">
              <GamesSection games={gamesToCome} title="Incoming Games" />
            </View>
          ) : (
            <NoGames title="No incoming games" />
          ))}
        {oldGamesFilter &&
          (Object.keys(gamesEnded).length > 0 ? (
            <View className="">
              <GamesSection games={gamesEnded} title="Last Games" />
            </View>
          ) : (
            <NoGames title="Last Games" />
          ))}
      </ScrollView>
      <View className="flex-row justify-around items-center pb-8 pt-2">
        <CustomButton onPress={() => navigation.navigate("Members")}>
          <FontAwesome name="users" size={24} color="#6B7280" />
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate("ClubConfig")}>
          <FontAwesome name="cog" size={24} color="#6B7280" />
        </CustomButton>
      </View>
    </View>
  );
}
