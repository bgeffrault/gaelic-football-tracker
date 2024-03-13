import { ScrollView, View } from "react-native";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { setOpponentTeam, setTeam } from "../stores/slices/gameSlice";
import { useAppSelector } from "../stores/store";
import {
  AppNavigationProp,
  NavigationRoutes,
  useAppNavigation,
} from "../navigators";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { ListItem } from "../components/ListItem";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { Team } from "../types/Team";

export const TeamHeaderButton = memo(
  ({ selectMode }: { selectMode: boolean }) => {
    const navigation = useAppNavigation();

    return selectMode ? (
      <CustomButton onPress={() => navigation.goBack()}>
        <StyledText cn="">OK</StyledText>
      </CustomButton>
    ) : null;
  },
);

function TeamItem({
  team,
  first,
  last,
  selectMode,
}: {
  team: Team;
  first: boolean;
  last: boolean;
  selectMode: boolean;
}) {
  const route =
    useRoute<NativeStackScreenProps<NavigationRoutes, "Teams">["route"]>();

  const navigation = useAppNavigation();
  const { external } = route.params;
  const isSelected = Boolean(
    useAppSelector((state) =>
      team.external
        ? state.game.opponentTeam?.id === team.id
        : state.game.team?.id === team.id,
    ),
  );
  const dispatch = useDispatch();

  return (
    <ListItem
      onPress={() => {
        dispatch(external ? setOpponentTeam(team) : setTeam(team));
        navigation.goBack();
      }}
      disabled={!selectMode}
      first={first}
      last={last}
      isSelected={isSelected}
    >
      <StyledText cn="font-bold text-lg">{team.teamName}</StyledText>
    </ListItem>
  );
}

export function Teams({ route }: AppNavigationProp<"Teams">) {
  const clubId = useClubIdContext();

  const selectMode = route.params?.mode === "select";
  const categoryId = route.params?.categoryId;
  const external = route.params?.external;
  const supabaseClient = useSupabaseClientContext();

  const { data: teams, isLoading } = useQuery({
    queryKey: ["teams", { external, categoryId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Team")
        .select("*")
        .eq("clubId", clubId)
        .eq("categoryId", categoryId)
        .eq("external", external);
      return result.data;
    },
  });

  if (isLoading) return null;

  return (
    <View className="mt-3 bg-white rounded-xl">
      <ScrollView>
        {teams?.length ? (
          teams.map((team, i, arr) => {
            return (
              <TeamItem
                key={team.id}
                first={i === 0}
                last={i === arr.length - 1}
                selectMode={selectMode}
                team={team}
              />
            );
          })
        ) : (
          <View className="my-3 bg-white rounded-xl p-2">
            <View className="flex items-center p-3">
              <StyledText>No Teams</StyledText>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
