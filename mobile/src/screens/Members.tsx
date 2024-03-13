import { SafeAreaView, ScrollView, View } from "react-native";
import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { addPlayer, removePlayer } from "../stores/slices/gameSlice";
import { HeaderRightAddButton } from "../components/Header/HeaderRightAddButton";
import { store, useAppSelector } from "../stores/store";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { shootsAccuracy, sumShoots } from "../utils/shootsUtils";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { ListItem } from "../components/ListItem";
import { SectionTitle } from "../components/SectionTitle";
import { CategoryFilter } from "../components/CategoryFilter";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { MemberType } from "../domain/types";
import { GoHomeButton } from "../components/GoHomeButton";

export const MembersHeaderButton = memo(
  ({ selectMode, categoryId }: { selectMode: boolean; categoryId: number }) => {
    const navigation = useAppNavigation();

    return selectMode ? (
      <CustomButton onPress={() => navigation.goBack()}>
        <StyledText cn="">OK</StyledText>
      </CustomButton>
    ) : (
      <HeaderRightAddButton nav="AddMember" params={{ categoryId }} />
    );
  },
);

export const getMemberScreenOptions: (
  props: AppNavigationProp<"Members" | "SelectMembers">,
) => NativeStackNavigationOptions = ({ route: { params } }) => {
  const { mode, categoryId } = params ?? {};
  const selectMode = mode === "select";
  const nbrSelected = store.getState().game.players.length;
  return {
    // eslint-disable-next-line no-nested-ternary
    headerTitle: selectMode
      ? nbrSelected
        ? `${nbrSelected} player${nbrSelected > 1 ? "s" : ""}`
        : "Sélection des joueurs"
      : () => <FontAwesome name="users" size={24} color="#6B7280" />,
    headerLeft: () => (selectMode ? null : <GoHomeButton />),
    headerBackVisible: false,
    headerRight: () => (
      <MembersHeaderButton selectMode={selectMode} categoryId={categoryId} />
    ),
  };
};

function MemberItem({
  member,
  first,
  last,
  selectMode,
}: {
  member: MemberType & { shoots: { id: number; type: string }[] };
  first: boolean;
  last: boolean;
  selectMode: boolean;
}) {
  const isSelected = Boolean(
    useAppSelector(
      (state) => state.game.players.filter((p) => p.id === member.id).length,
    ),
  );
  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  const handleOnPress = () => {
    if (selectMode) {
      dispatch(isSelected ? removePlayer(member) : addPlayer(member));
      return;
    }

    navigation.navigate("Player", { playerId: member.id });
  };

  const { totalPoints, accuracy } = useMemo(() => {
    const { shoots } = member;
    return { totalPoints: sumShoots(shoots), accuracy: shootsAccuracy(shoots) };
  }, [member]);

  return (
    <ListItem
      onPress={handleOnPress}
      first={first}
      last={last}
      isSelected={isSelected}
    >
      <View className="flex flex-row justify-between items-center grow">
        <StyledText cn="font-bold text-lg">
          {member.firstName} {member.lastName}
        </StyledText>
        <StyledText>
          {totalPoints} pts - {accuracy}%
        </StyledText>
      </View>
    </ListItem>
  );
}

export function Members({ navigation, route }: AppNavigationProp<"Members">) {
  const clubId = useClubIdContext();
  const supabaseClient = useSupabaseClientContext();

  const mode = route.params?.mode;
  const selectMode = mode === "select";
  const categoryId = route.params?.categoryId ?? 1;

  const { data: members, isLoading } = useQuery({
    queryKey: ["members", { categoryId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Members")
        .select("*, shoots: Shoots(*)")
        .eq("clubId", clubId)
        .eq("categoryId", categoryId);
      return result.data;
    },
  });

  // useEffect(() => {
  //   navigation.setOptions(getMemberScreenOptions({ navigation, route }));
  // }, [navigation, nbrSelected, route, categoryId]);

  return (
    <>
      <CategoryFilter
        categoryId={categoryId}
        onPress={(newCategoryId) => {
          navigation.setParams({ categoryId: newCategoryId });
        }}
      />
      {!isLoading && (
        <SafeAreaView className="my-3 bg-white rounded-xl">
          <SectionTitle cn="flex flex-row grow justify-between items-center p-1 px-4">
            <StyledText cn="text-gray-400">Player</StyledText>
            <StyledText cn="text-gray-400">Stats</StyledText>
          </SectionTitle>
          <ScrollView>
            {members.length ? (
              members.map((member, i, arr) => {
                return (
                  <MemberItem
                    key={member.id}
                    first={i === 0}
                    last={i === arr.length - 1}
                    selectMode={selectMode}
                    member={member}
                  />
                );
              })
            ) : (
              <View className="flex items-center p-3">
                <StyledText>No players</StyledText>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
