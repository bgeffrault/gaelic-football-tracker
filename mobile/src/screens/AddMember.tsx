import { Text, View } from "react-native";
import { useEffect } from "react";
import { ControlledLabelledTextInput } from "../components/StyledTextInput";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { useForm } from "react-hook-form";
import { graphql } from "../gql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { Members } from "../gql/graphql";

type Field = {
  label: string;
  placeholder: string;
  name: string;
  rules?: React.ComponentProps<typeof ControlledLabelledTextInput>["rules"];
}

const AddMemberMutation = graphql(/* GraphQL */ `
  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt) {
    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId}) {
      records {
        id
      }
    }
  }
`);

export function AddMember({ navigation }) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm()
  const mutation = useMutation({
    mutationFn: async (data: Pick<Members, "firstName" | "lastName" | "pseudo">) =>
      request(
        Constants.expoConfig.extra.supabaseUrl,
        AddMemberMutation,
        { firstName: data.firstName, lastName: data.lastName, pseudo: data.pseudo, clubId: 1, categoryId: 1 },
        {
          "content-type": "application/json",
          "apikey": Constants.expoConfig.extra.supabaseAnonKey,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      navigation.navigate("Members");
    },
  })

  const fields: Field[] = [
    {
      label: "Prénom",
      placeholder: "Baptiste",
      name: "firstName",
      rules: {
        required: "Le prénom est obligatoire",
      }
    },
    {
      label: "Nom",
      placeholder: "Geffrault",
      name: "lastName",
      rules: {
        required: "Le nom est obligatoire",
      }
    },
    {
      label: "Pseudo",
      placeholder: "bg",
      name: "pseudo",
      rules: {}
    },
  ];

  const handleOnPress = async (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Ajouter un membre",
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Card>
        <View>
          {fields.map(
            ({ label, name, placeholder, rules }, i) => (
              <ControlledLabelledTextInput
                key={label}
                label={`${label}${rules.required ? " *" : ""}`}
                inputProps={{
                  placeholder,
                }}
                control={control}
                name={name}
                rules={rules}
              />
            )
          )}
          <View className="mt-8">
            <CustomButton
              variant="contained"
              onPress={handleSubmit(handleOnPress)}
            >
              <Text className="text-white text-lg">Ajouter</Text>
            </CustomButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
