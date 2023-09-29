import { ScrollView, View } from "react-native"
import { SectionTitle } from "../../components/SectionTitle"
import { StyledText } from "../../components/StyledText"
import { ControlledLabelledTextInput } from "../../components/ControlledComponents"
import { CustomButton } from "../../components/CustomButton"
import { Control, FieldValues, useForm } from "react-hook-form"
import { graphql, DocumentType } from "../../gql"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Team } from "../../gql/graphql"
import Constants from 'expo-constants';
import request from "graphql-request"
import { useClubIdContext } from "../../providers/ClubIdProvider"
import { AntDesign } from "@expo/vector-icons"

export const TeamSectionFragment = graphql(/* GraphQL */ `
    fragment TeamSectionFragment on TeamEdge {
        node {
          id
            teamName
        }
    }
    `)

const AddTeamMutation = graphql(/* GraphQL */ `
  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!) {
    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId}) {
      records {
        id
      }
    }
  }
`);

export const TeamSection = <T extends unknown>({ teams, external, title }: {
    teams: readonly DocumentType<typeof TeamSectionFragment>[],
    external: boolean,
    title: string,
}) => {
    const clubId = useClubIdContext();
    const queryClient = useQueryClient();
    const { control, handleSubmit, reset } = useForm();

    const mutation = useMutation({
        mutationFn: async (data: Pick<Team, "external" | "teamName">) =>
            request(
                Constants.expoConfig.extra.supabaseUrl,
                AddTeamMutation,
                { teamName: data.teamName, external: data.external, clubId },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`teams-${external ? "external" : "internal"}`] });
        },
    })

    const handleOnPressAddTeam = async (data) => {
        mutation.mutate({ ...data, external });
        reset()
    };

    return (
        <>
            <SectionTitle cn="mb-2">
                {title}
            </SectionTitle>
            <ScrollView className="max-h-48">
                {teams.map((edge) => (
                    <View key={edge.node.id}>
                        <StyledText cn="font-bold text-lg">
                            {edge.node.teamName}
                        </StyledText>
                    </View>
                ))}
            </ScrollView>
            <View className="flex-row items-center justify-between border-t-2 mt-4 border-gray-200">
                <ControlledLabelledTextInput
                    label="Team name"
                    inputProps={{
                        placeholder: "Rennes A",
                    }}
                    control={control}
                    name="teamName"
                    rules={{ required: "Le nom de l'équipe est obligatoire" }}
                />
                <CustomButton
                    onPress={handleSubmit(handleOnPressAddTeam)}
                >
                    <AntDesign name="pluscircle" size={24} color="black" />
                </CustomButton>
            </View>
        </>)
}
