import { ScrollView, View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionTitle } from "../../components/SectionTitle";
import { StyledText } from "../../components/StyledText";
import { ControlledLabelledTextInput } from "../../components/ControlledComponents";
import { CustomButton } from "../../components/CustomButton";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";

type Team = {
  categoryId: number;
  clubId: number;
  created_at: string;
  external: boolean;
  id: number;
  teamName: string;
};

type FormValues = {
  teamName: string;
};

export function TeamSection({
  teams,
  external,
  title,
  categoryId,
}: {
  teams: Team[];
  external: boolean;
  title: string;
  categoryId: number;
}) {
  const clubId = useClubIdContext();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<FormValues>();
  const supabaseClient = useSupabaseClientContext();

  const mutation = useMutation({
    mutationFn: async (data: Pick<Team, "external" | "teamName">) => {
      const result = await supabaseClient.from("Team").insert({
        teamName: data.teamName,
        external,
        clubId,
        categoryId,
      });
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams", { external, categoryId }],
      });
    },
  });

  const handleOnPressAddTeam: SubmitHandler<FormValues> = (data) => {
    mutation.mutateAsync({ ...data, external });
    reset();
  };

  return (
    <>
      <View className="p-2 my-3 bg-white rounded-xl">
        <SectionTitle label={title} />
        <ScrollView className="max-h-48 mb-4">
          {teams.length ? (
            teams.map((team) => (
              <View key={team.id}>
                <StyledText cn="font-bold text-lg">{team.teamName}</StyledText>
              </View>
            ))
          ) : (
            <StyledText cn="text-center">Aucune équipe</StyledText>
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
  );
}
