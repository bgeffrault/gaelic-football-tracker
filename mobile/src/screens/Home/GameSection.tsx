import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { gameResultGradientColors, getGameResult, getTeamResult } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { DocumentType, graphql } from "../../gql/gql";
import { useFragment } from "../../gql";
import { SectionTitle } from "../../components/SectionTitle";
import { LinearGradient } from 'expo-linear-gradient';
import { SectionContainer } from "../../components/SectionContainer";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { Database } from "../../domain/database.types";

export const GameFragment = graphql(/* GraphQL */ `
  fragment GameFragment on Game {
    id
    duration
    gameEnded
    name
    date

    teamGameCollection {
      edges {
        node {
          id
          team {
            external
            teamName
          }
        }
      }
    }
  }
`)

export const GameListFragment = graphql(/* GraphQL */ `
  fragment GameListFragment on GameEdge {
    node {
      id,
      ...GameFragment
    }
  }
`)

type GameResult = Database["public"]["Views"]["GameResult"]["Row"]
type Game = {
  teamGame: GameResult[];
  opponentTeamGame: GameResult[];
}
type GamesResult = Record<number, Game>

export function GamesSection({ games, title }: {
  games: GamesResult;
  title: string;
}) {
  return (
    <SectionContainer >
      <SectionTitle label={title} />
      {Object.entries(games).map((([key, game], i, arr) => {
        return (
          <GameListItem
            key={key}
            game={game}
            gameId={Number(key)}
            first={i === 0}
            last={i === arr.length - 1}
          />
        )
      }))}
    </SectionContainer>
  );
}



export function GameListItem({ game, first, last, gameId }: {
  game: Game;
  first: boolean;
  last: boolean;
  gameId: number;
}) {
  const navigation = useAppNavigation();
  const handleOnPress = () => {
    navigation.navigate("Game", { gameId: gameId, isOpponentTeamSelected: false });
  };
  const teamGame = game.teamGame;
  const opponentTeamGame = game.opponentTeamGame;

  const teamScore = useTeamScore(teamGame);
  const opponentTeamScore = useTeamScore(opponentTeamGame);

  const result = getGameResult({ teamScore, opponentTeamScore });
  // const date = DateTime.fromISO(game.date).toFormat("dd-MM-yyyy");
  const gameName = teamGame[0].name
  const date = DateTime.fromISO(teamGame[0].date).toFormat("dd-MM-yyyy");
  return (
    <Card
      cn="mb-1"
      first={first}
      last={last}
      isListItem
      border={result === "draw"}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={gameResultGradientColors[result]}
        className="rounded-xl py-1 px-4">
        <View className="flex-row">
          <View className="w-2/5">
            <TeamScore cn="items-start" teamScore={teamScore} teamName={teamGame[0].teamName} />
          </View>
          <View className="items-center w-1/5">
            <StyledText>{teamGame[0].duration}&apos;</StyledText>
            {<CustomButton onPress={handleOnPress}>
              <AntDesign name="eye" size={24} color="#DF8C5F" />
            </CustomButton>}
          </View>
          <View className="w-2/5">
            <TeamScore cn="items-end" teamScore={opponentTeamScore} teamName={opponentTeamGame[0].teamName} />
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <StyledText cn='text-gray-400'>{gameName}</StyledText>
          <StyledText cn='text-gray-400'>{date}</StyledText>
        </View>
      </LinearGradient>
    </Card>
  );
}

export type TeamScore = {
  teamGameId: number;
  type: "point" | "goal" | "missed" | "blocked";
  count: number;
  gameId: number;
}

const useTeamScore = (teamGame: GameResult[]) => {
  return {
    pointCount: teamGame?.filter((gameResult) => gameResult.type === "point")[0]?.count ?? 0,
    goalCount: teamGame?.filter((gameResult) => gameResult.type === "goal")[0]?.count ?? 0,
    missedCount: teamGame?.filter((gameResult) => gameResult.type === "missed")[0]?.count ?? 0,
    blockedCount: teamGame?.filter((gameResult) => gameResult.type === "blocked")[0]?.count ?? 0,
  }
}

const TeamScore = ({ teamScore, teamName, cn }: {
  cn?: string;
  teamName: string;
  teamScore: ReturnType<typeof useTeamScore>;
}) => {
  const { pointCount, goalCount, missedCount, blockedCount } = teamScore;
  const score = getTeamResult({ pointCount, goalCount, missedCount, blockedCount });

  return (
    <View className={cn}>
      <StyledText cn="text-lg text-gray-600">{teamName}</StyledText>
      <StyledText cn="text-lg text-gray-600">
        {goalCount} - {pointCount} ({score.result})
      </StyledText>
    </View>
  );
}
