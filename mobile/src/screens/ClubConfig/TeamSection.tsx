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
  mutation AddTeamMutation($teamName: String!, $external: Boolean!, $clubId: Int!, $categoryId: BigInt!) {
    insertIntoTeamCollection(objects: {teamName: $teamName, external: $external, clubId: $clubId, categoryId: $categoryId}) {
      records {
        id
      }
    }
  }
`);

export const TeamSection = ({ teams, external, title, categoryId }: {
    teams: readonly DocumentType<typeof TeamSectionFragment>[],
    external: boolean,
    title: string,
    categoryId: number
}) => {
    const clubId = useClubIdContext();
    const queryClient = useQueryClient();
    const { control, handleSubmit, reset } = useForm();

    const mutation = useMutation({
        mutationFn: async (data: Pick<Team, "external" | "teamName">) =>
            request(
                Constants.expoConfig.extra.supabaseUrlGraphQl,
                AddTeamMutation,
                { teamName: data.teamName, external: data.external, clubId, categoryId },
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams", { external, categoryId }] });
        },
    })

    const handleOnPressAddTeam = async (data) => {
        mutation.mutate({ ...data, external });
        reset()
    };

    return (
        <>
            <View className="p-2 my-3 bg-white rounded-xl" >
                <SectionTitle label={title} />
                <ScrollView className="max-h-48 mb-4">
                    {teams.length ? teams.map((edge) => (
                        <View key={edge.node.id}>
                            <StyledText cn="font-bold text-lg">
                                {edge.node.teamName}
                            </StyledText>
                        </View>
                    )) : (
                        <StyledText cn="text-center">
                            Aucune équipe
                        </StyledText>
                    )}
                </ScrollView>
                <View className="flex items-center justify-between border-t-2 border-gray-200 pt-4">
                    <ControlledLabelledTextInput
                        label="Team name"
                        inputProps={{
                            placeholder: "Rennes A",
                        }}
                        control={control}
                        name="teamName"
                        rules={{ required: "Le nom de l'équipe est obligatoire" }}
                        cn="w-full"
                    />
                </View>
            </View>
            <View className="mt-2 flex items-center">
                <CustomButton
                    onPress={handleSubmit(handleOnPressAddTeam)}
                    variant="contained"
                    cn="w-32"
                >
                    <StyledText cn="text-white text-sm">Add Team</StyledText>
                </CustomButton>
            </View>
        </>
    )
}
