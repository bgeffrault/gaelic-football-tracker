import clsx from "clsx";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { StyledText } from "../components/StyledText";
import { HeaderRightAddButton } from "../components/Header/HeaderRightAddButton";
import { sumScore } from "../utils/sumScore";
import { gameResult, gameResultColors } from "../utils/gameResult";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { Game, Score } from "../domain/types";

export function Home({}: AppNavigationProp<"Home">) {
  const navigation = useAppNavigation();
  const { gameList } = useAppSelector((state) => state.games);
  const gamesInProgress = gameList.filter((game) => !game.gameEnded);
  const gamesEnded = gameList.filter((game) => game.gameEnded);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <HeaderRightAddButton nav="NewGame" />,
    });
  }, [navigation]);

  return (
    <>
      <View className="p-6 flex-1">
        {gamesInProgress.length > 0 && (
          <View className="mb-4">
            <GamesSection games={gamesInProgress} title="In progress" />
          </View>
        )}
        {gamesEnded.length && (
          <View className="flex-1">
            <GamesSection games={gamesEnded} title="Last Games" />
          </View>
        )}
      </View>
      <View className="h-24 justify-center items-center border border-x-0 border-b-0">
        <CustomButton onPress={() => navigation.navigate("Members")}>
          <FontAwesome name="users" size={42} color="black" />
        </CustomButton>
      </View>
    </>
  );
}

function GamesSection({ games, title }) {
  return (
    <View className="">
      <StyledText cn="tracking-wide bg-[#df8c5f] p-1">{title}</StyledText>
      <ScrollView className="mt-2">
        {games.map((game, i, arr) => (
          <GameListItem
            key={game.id}
            game={game}
            first={i === 0}
            last={i === arr.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function GameListItem({ game, first, last }: {
  game: Game;
  first: boolean;
  last: boolean;
}) {
  const result = gameResult(game);
  const navigation = useAppNavigation();
  const handleOnPress = () => {
    navigation.navigate("Game", { gameId: game.id });
  };

  return (
    <Card
      cn={clsx(
        gameResultColors[result],
        "border border-[#00000066]",
        "py-1 px-4"
      )}
      first={first}
      last={last}
      isListItem
    >
      <View className="flex-row justify-between">
        <TeamScore score={game.teamsScore.us} teamName={game.teamName} />
        <View className="items-center">
          <StyledText>{game.duration}&apos;</StyledText>
          {game.gameEnded ? (
            <StyledText>-</StyledText>
          ) : (
            <CustomButton onPress={handleOnPress}>
              <AntDesign name="playcircleo" size={24} color="black" />
            </CustomButton>
          )}
        </View>
        <TeamScore
          score={game.teamsScore.them}
          teamName={game.opponentName}
          inProgress={game.gameEnded}
        />
      </View>
      <StyledText cn="mt-1 text-xs text-gray-800">
        Accuracy: {game.teamsScore.us.accuracy}%
      </StyledText>
    </Card>
  );
}

function TeamScore({ score, teamName, inProgress }: {
  score: Score;
  teamName: string;
  inProgress?: boolean;
}) {
  return (
    <View className="items-center">
      <StyledText cn="text-lg ">{teamName}</StyledText>
      <StyledText cn="text-lg">
        {score.points.length} - {score.goals.length} ({sumScore(score)})
      </StyledText>
    </View>
  );
}
