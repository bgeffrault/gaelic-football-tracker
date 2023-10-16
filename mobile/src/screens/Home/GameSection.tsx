import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { CustomButton } from "../../components/CustomButton";
import { StyledText } from "../../components/StyledText";
import { gameResultGradientColors, getGameResult, getTeamResult } from "../../utils/shootsUtils";
import { useAppNavigation } from "../../navigators";
import { SectionTitle } from "../../components/SectionTitle";
import { LinearGradient } from 'expo-linear-gradient';
import { SectionContainer } from "../../components/SectionContainer";
import { DateTime } from "luxon";


export type GameResult = {
  categoryId: number;
  clubId: number;
  count: number;
  date: string;
  duration: number;
  external: boolean;
  gameEnded: boolean;
  id: number;
  name: string;
  teamGameId: number;
  teamName: string;
  type: string;
}

type TeamGameResult = {
  gameResults: GameResult[];
  teamName: string;
  external: boolean;
  categoryId: number;
}

export type GameResultByTeam = {
  teamGame: TeamGameResult;
  opponentTeamGame: TeamGameResult;
  id: number;
  gameEnded: boolean;
  name: string;
  duration: number;
  date: string;
}

export type GameContent = GameResultByTeam[]

export type Game = {
  id: number;
  gameEnded: boolean;
  name: string;
  duration: number;
  date: string;
  GameResult: GameResult[];
  TeamGame: {
    id: number;
    Team: {
      teamName: string;
      external: boolean;
      categoryId: number;
    };
  }[];
}


export function GamesSection({ games, title }: {
  games: GameContent;
  title: string;
}) {
  return (
    <SectionContainer >
      <SectionTitle label={title} />
      {games.map(((game, i, arr) => {
        return (
          <GameListItem
            key={game.id}
            game={game}
            gameId={game.id}
            first={i === 0}
            last={i === arr.length - 1}
          />
        )
      }))}
    </SectionContainer>
  );
}



export function GameListItem({ game, first, last, gameId }: {
  game: GameResultByTeam;
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
  const date = DateTime.fromISO(game.date).toFormat("dd-MM-yyyy");
  const gameName = game.name
  return (
    <Card
      cn="mb-1"
      first={first}
      last={last}
      isListItem
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={gameResultGradientColors[result]}
        className="rounded-xl py-1 px-4">
        <View className="flex-row">
          <View className="w-2/5">
            <TeamScore cn="items-start" teamScore={teamScore} teamName={teamGame.teamName} />
          </View>
          <View className="items-center w-1/5">
            <StyledText>{game.duration}&apos;</StyledText>
            {<CustomButton onPress={handleOnPress}>
              <AntDesign name="eye" size={24} color="#DF8C5F" />
            </CustomButton>}
          </View>
          <View className="w-2/5">
            <TeamScore cn="items-end" teamScore={opponentTeamScore} teamName={opponentTeamGame.teamName} />
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

const useTeamScore = (teamGame: TeamGameResult) => {
  return {
    pointCount: teamGame.gameResults.filter((gameResult) => gameResult.type === "point")[0]?.count ?? 0,
    goalCount: teamGame.gameResults.filter((gameResult) => gameResult.type === "goal")[0]?.count ?? 0,
    missedCount: teamGame.gameResults.filter((gameResult) => gameResult.type === "missed")[0]?.count ?? 0,
    blockedCount: teamGame.gameResults.filter((gameResult) => gameResult.type === "blocked")[0]?.count ?? 0,
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
