import { ScrollView, View } from "react-native";
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
          <StyledText cn="">{totalPoints} pts - {accuracy}%</StyledText>
        )}
      </View>
    </View>
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
      headerTitle: selectMode ? "Sélection des joueurs" : "Membres",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MembersHeaderButton selectMode={selectMode} />,
    });
  }, [navigation]);

  if (isLoading) return null;

  return (
    <View className="m-6">
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

