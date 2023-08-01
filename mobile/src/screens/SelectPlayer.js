import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { StyledText } from "../components/StyledText";

import { CustomButton } from "../components/CustomButton";

export function SelectPlayer({ navigation, route }) {
  const gameId = route?.params?.gameId;
  const { players } = useSelector((state) =>
    state.games.gameList.find((g) => g.id === gameId)
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Scorer",
    });
  }, [navigation]);

  return (
    <ScrollView className="m-6">
      {players.map((member, i, arr) => (
        <MemberItem
          key={member.id}
          win={i % 2 === 0}
          first={i === 0}
          last={i === arr.length - 1}
          member={member}
        />
      ))}
    </ScrollView>
  );
}

function MemberItem({ member, first, last }) {
  const navigation = useNavigation();

  return (
    <View
      className={clsx(
        "border border-[#000000] flex-row justify-between items-center",
        "py-2 px-4",
        first && "rounded-t-lg",
        last && "rounded-b-lg"
      )}
    >
      <CustomButton cn="grow" onPress={() => navigation.goBack()}>
        <StyledText cn="font-bold text-lg">
          {member.firstName} {member.lastName}
        </StyledText>
      </CustomButton>
    </View>
  );
}
