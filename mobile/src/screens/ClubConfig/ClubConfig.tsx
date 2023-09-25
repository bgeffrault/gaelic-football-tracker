import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import request from "graphql-request";
import { graphql, DocumentType, useFragment } from "../../gql";
import Constants from 'expo-constants';
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { StyledText } from "../../components/StyledText";
import { SectionTitle } from "../../components/SectionTitle";
import { FontAwesome } from "@expo/vector-icons";
import { Team } from "../../gql/graphql";
import { CustomButton } from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import { ControlledLabelledTextInput } from "../../components/ControllesComponents";
import { TeamSection, TeamSectionFragment } from "./TeamSection";

const teamsQuery = graphql(/* GraphQL */ `
  query teamsQuery($clubId: Int, $external: Boolean!) {
    teamCollection(filter: {clubId: {eq: $clubId}, external: {eq: $external}}) {
      edges {
          ...TeamSectionFragment
      }
    }
  }
`)




export function ClubConfig({ navigation, route }) {
    const clubId = useClubIdContext();

    const { data: dataClubTeams, isLoading: isLoadingClubTeams } = useQuery({
        queryKey: ["teams-internal"],
        queryFn: async () =>
            request(
                Constants.expoConfig.extra.supabaseUrl,
                teamsQuery,
                { clubId, external: false },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
    })
    const { data: dataExternalTeams, isLoading: isLoadingExternalTeams } = useQuery({
        queryKey: ["teams-external"],
        queryFn: async () =>
            request(
                Constants.expoConfig.extra.supabaseUrl,
                teamsQuery,
                { clubId, external: true },
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
            headerTitle: () => <FontAwesome name="cog" size={24} color="black" />,
        });
    }, [navigation]);

    if (isLoadingClubTeams || isLoadingExternalTeams) return null;

    return (
        <View className="m-6">
            <TeamSection teams={clubTeams} external={false} title="Equipes du club" />
            <TeamSection teams={externalTeams} external title="Equipes adverses" />
        </View>
    );
}
