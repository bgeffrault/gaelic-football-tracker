import { ScrollView, TouchableOpacity, View } from "react-native";
import { memo, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { addPlayer, removePlayer } from "../stores/slices/gameSlice";
import { HeaderRightAddButton } from "../components/Header/HeaderRightAddButton";
import { useAppSelector } from "../stores/store";
import { useAppNavigation } from "../navigators";
import { graphql, DocumentType, useFragment } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { shootsAccuracy, sumShoots } from "../utils/shootsUtils";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { ListItem } from "../components/ListItem";
import { SectionTitle } from "../components/SectionTitle";
import { FontAwesome } from "@expo/vector-icons";
import { GoHomeButton } from "../components/GoHomeButton";

const MembersHeaderButton = memo(({ selectMode }: {
  selectMode: boolean;
}) => {
  const navigation = useAppNavigation();

  return selectMode ? (
    <CustomButton onPress={() => navigation.goBack()}>
      <StyledText cn="">OK</StyledText>
    </CustomButton>
  ) : (
    <HeaderRightAddButton nav="AddMember" />
  );
});

const MemberItemFragment = graphql(/* GraphQL */ `
  fragment MemberItemFragment on Members {
    id
    firstName
    lastName
    pseudo
    shootsCollection {
      edges {
        node {
          id
          type
        }
      }
    }
  }
`)

function MemberItem({ member, first, last, selectMode }: {
  member: DocumentType<typeof MemberItemFragment>;
  first: boolean;
  last: boolean;
  selectMode: boolean;
}) {
  const isSelected = Boolean(
    useAppSelector(
      (state) => state.game.players.filter((p) => p.id === member.id).length
    )
  );
  const dispatch = useDispatch();

  const { totalPoints, accuracy } = useMemo(() => {
    const shoots = member.shootsCollection.edges.map((e) => e.node)
    const totalPoints = sumShoots(shoots);
    const accuracy = shootsAccuracy(shoots);
    return { totalPoints, accuracy };
  }, [member])

  return (
    <ListItem
      onPress={() => dispatch(isSelected ? removePlayer(member) : addPlayer(member))}
      disabled={!selectMode}
      first={first}
      last={last}
      isSelected={isSelected}
    >
      <View className="flex flex-row justify-between items-center grow" >
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



const membersQuery = graphql(/* GraphQL */ `
  query membersQuery($clubId: BigInt!, $categoryId: BigInt) {
    membersCollection(filter: {clubId: {eq: $clubId}, categoryId: {eq: $categoryId}}) {
      edges {
        node {
          id
          ...MemberItemFragment
        }
      }
    }
  }
`)


export function Members({ navigation, route }) {
  const clubId = useClubIdContext();

  const mode = route.params?.mode;
  const selectMode = mode === "select";
  const categoryId = route.params?.categoryId;

  const nbrSelected = useAppSelector(
    (state) => state.game.players.length
  )
    ;

  const { data, isLoading } = useQuery({
    queryKey: ["members", categoryId],
    queryFn: async () =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        membersQuery,
        { clubId, categoryId },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
  })

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectMode ? nbrSelected ? `${nbrSelected} player${nbrSelected > 1 ? 's' : ""}` : "Sélection des joueurs" : () => <FontAwesome name="users" size={24} color="#6B7280" />
      ,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MembersHeaderButton selectMode={selectMode} />,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <GoHomeButton />,
    });
  }, [navigation, nbrSelected, selectMode]);

  if (isLoading) return null;

  return (
    <View className="mt-3 bg-white rounded-xl">
      <SectionTitle cn="flex flex-row grow justify-between items-center p-1 px-4">
        <StyledText cn="text-gray-400">
          Player
        </StyledText>
        <StyledText cn="text-gray-400">
          Stats
        </StyledText>
      </SectionTitle>
      <ScrollView>
        {data.membersCollection.edges.map((edge, i, arr) => {
          const member = useFragment(MemberItemFragment, edge.node);
          return (
            <MemberItem
              key={edge.node.id}
              first={i === 0}
              last={i === arr.length - 1}
              selectMode={selectMode}
              member={member}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

