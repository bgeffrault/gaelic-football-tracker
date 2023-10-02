import { ScrollView, View } from "react-native";
import { memo, useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { setOpponentTeam, setTeam } from "../stores/slices/gameSlice";
import { useAppSelector } from "../stores/store";
import { useAppNavigation } from "../navigators";
import { graphql, DocumentType, useFragment } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { useClubIdContext } from "../providers/ClubIdProvider";

const TeamHeaderButton = memo(({ selectMode }: {
  selectMode: boolean;
}) => {
  const navigation = useAppNavigation();

  return selectMode ? (
    <CustomButton onPress={() => navigation.goBack()}>
      <StyledText cn="">OK</StyledText>
    </CustomButton>
  ) : null;
});

const TeamItemFragment = graphql(/* GraphQL */ `
  fragment TeamItemFragment on Team {
    id
    teamName
  }
`)

function TeamItem({ team, first, last, selectMode, external }: {
  team: DocumentType<typeof TeamItemFragment>;
  first: boolean;
  last: boolean;
  selectMode: boolean;
  external: boolean;
}) {
  const isSelected = Boolean(
    useAppSelector(
      (state) => external ? state.game.opponentTeam?.id === team.id : state.game.team?.id === team.id
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
      <StyledText cn="font-bold text-lg">
        {team.teamName}
      </StyledText>
      <View>
        {selectMode && (
          <CustomCheckbox
            isChecked={isSelected}
            setChecked={() =>
              dispatch(external ? setOpponentTeam(team) : setTeam(team))
            }
          />
        )}
      </View>
    </View>
  );
}



const teamsModalQuery = graphql(/* GraphQL */ `
  query teamsModalQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {
    teamCollection(filter: {external: {eq: $external}, clubId: {eq: $clubId}, categoryId: {eq: $categoryId} }) {
      edges {
        node {
          ...TeamItemFragment
        }
      }
    }
  }
`)


export function Teams({ navigation, route }) {
  const clubId = useClubIdContext();

  const selectMode = route.params?.mode === "select";
  const categoryId = route.params?.categoryId;
  const external = route.params?.external;

  const { data, isLoading } = useQuery({
    queryKey: ["teams", categoryId, external],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        teamsModalQuery,
        {
          clubId,
          external,
          categoryId,
        },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectMode ? "Sélection de l'équipe" : "Teams",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <TeamHeaderButton selectMode={selectMode} />,
    });
  }, [navigation]);

  if (isLoading) return null;

  return (
    <View className="m-6">
      <ScrollView>
        {data.teamCollection.edges.map((edge, i, arr) => {
          const team = useFragment(TeamItemFragment, edge.node);
          return (
            <TeamItem
              key={team.id}
              first={i === 0}
              last={i === arr.length - 1}
              selectMode={selectMode}
              team={team}
              external={external}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

