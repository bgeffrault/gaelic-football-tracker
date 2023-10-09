import { useQuery } from "@tanstack/react-query";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import request from "graphql-request";
import { graphql, useFragment } from "../../gql";
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TeamSection, TeamSectionFragment } from "./TeamSection";
import { CategoryFilter } from "../../components/CategoryFilter";
import { GoHomeButton } from "../../components/GoHomeButton";

const teamsQuery = graphql(/* GraphQL */ `
  query teamsQuery($clubId: Int, $external: Boolean!, $categoryId: BigInt) {
    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}, categoryId: {eq: $categoryId}}) {
      edges {
          ...TeamSectionFragment
      }
    }
  }
`)


export function ClubConfig({ navigation }) {
    const [categoryId, setCategoryId] = useState(1)
    const clubId = useClubIdContext();
    const { data: dataClubTeams, isLoading: isLoadingClubTeams } = useQuery({
        queryKey: ["teams", { external: false, categoryId }],
        queryFn: async () =>
            request(
                Constants.expoConfig.extra.supabaseUrlGraphQl,
                teamsQuery,
                { clubId, external: false, categoryId },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
    })
    const { data: dataExternalTeams, isLoading: isLoadingExternalTeams } = useQuery({
        queryKey: ["teams", { external: true, categoryId }],
        queryFn: async () =>
            request(
                Constants.expoConfig.extra.supabaseUrlGraphQl,
                teamsQuery,
                { clubId, external: true, categoryId },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
    })

    const clubTeams = useFragment(TeamSectionFragment, dataClubTeams?.teamCollection.edges)
    const externalTeams = useFragment(TeamSectionFragment, dataExternalTeams?.teamCollection.edges)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <FontAwesome name="cog" size={24} color="#1F2937" />,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <GoHomeButton />,
        });
    }, [navigation]);

    if (isLoadingClubTeams || isLoadingExternalTeams) return null;

    return (
        <>
            <CategoryFilter onPress={(id) => setCategoryId(id)} categoryId={categoryId} />
            <ScrollView>
                <SafeAreaView >
                    <TeamSection teams={clubTeams} external={false} title="Equipes du club" categoryId={categoryId} />
                </SafeAreaView>
                <SafeAreaView>
                    <TeamSection teams={externalTeams} external title="Equipes adverses" categoryId={categoryId} />
                </SafeAreaView>
            </ScrollView>
        </>
    );
}
