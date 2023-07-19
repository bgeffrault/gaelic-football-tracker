import { View } from "react-native";
import { memo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { addPlayer, removePlayer } from "../stores/slices/gameSlice";
import { HeaderRightAddButton } from "../components/Header/HeaderRightAddButton";

const MembersHeaderButton = memo(({ selectMode }) => {
  const navigation = useNavigation();

  return selectMode ? (
    <CustomButton onPress={() => navigation.goBack()}>
      <StyledText cn="">OK</StyledText>
    </CustomButton>
  ) : (
    <HeaderRightAddButton nav="AddMember" />
  );
});

export function Members({ navigation, route }) {
  const { members } = useSelector((state) => state.club);
  const mode = route.params?.mode;
  const selectMode = mode === "select";
  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectMode ? "Sélection des joueurs" : "Membres",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MembersHeaderButton selectMode={selectMode} />,
    });
  }, [navigation]);
  return (
    <View className="m-6">
      {members.map((member, i, arr) => (
        <MemberItem
          key={member.id}
          win={i % 2 === 0}
          first={i === 0}
          last={i === arr.length - 1}
          selectMode={selectMode}
          member={member}
        />
      ))}
    </View>
  );
}

function MemberItem({ member, first, last, selectMode }) {
  const isSelected = Boolean(
    useSelector(
      (state) => state.game.players.filter((p) => p.id === member.id).length
    )
  );
  const dispatch = useDispatch();

  return (
    <View
      className={clsx(
        "border border-[#000000] flex-row justify-between items-center",
        "py-2 px-4",
        first && "rounded-t-lg",
        last && "rounded-b-lg"
      )}
    >
      <View>
        <StyledText cn="font-bold text-lg">
          {member.firstName} {member.lastName}
        </StyledText>
      </View>
      <View>
        {selectMode ? (
          <CustomCheckbox
            isChecked={isSelected}
            setChecked={() =>
              dispatch(isSelected ? removePlayer(member) : addPlayer(member))
            }
          />
        ) : (
          <StyledText cn="">16 pts - 80%</StyledText>
        )}
      </View>
    </View>
  );
}
