import { Text, View } from "react-native";
import { useEffect } from "react";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { useForm } from "react-hook-form";
import { graphql } from "../gql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { Members } from "../gql/graphql";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { ControlledLabelledTextInput, Rules } from "../components/ControlledComponents";
import { AppNavigationProp } from "../navigators";
import { SectionContainer } from "../components/SectionContainer";
import { CategoryFilter } from "../components/CategoryFilter";

type Field = {
  label: string;
  placeholder: string;
  name: string;
  rules?: Rules;
}

const AddMemberMutation = graphql(/* GraphQL */ `
  mutation AddMemberMutation($firstName: String!, $lastName: String!, $pseudo: String, $clubId: BigInt, $categoryId: BigInt, $license: String) {
    insertIntoMembersCollection(objects: {firstName: $firstName, lastName: $lastName, pseudo: $pseudo, clubId: $clubId, categoryId: $categoryId, license: $license}) {
      records {
        id
      }
    }
  }
`);

export function AddMember({ navigation, route }: AppNavigationProp<"AddMember">) {
  const categoryId = route.params.categoryId;
  const clubId = useClubIdContext();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: async (data: Pick<Members, "firstName" | "lastName" | "pseudo" | "license">) =>
      request(
        Constants.expoConfig.extra.supabaseUrlGraphQl,
        AddMemberMutation,
        { firstName: data.firstName, lastName: data.lastName, pseudo: data.pseudo, clubId, categoryId: 1, license: data.license },
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
    {
      label: "License",
      placeholder: "FR16 7611 4220",
      name: "license",
      rules: {}
    },
  ];

  const handleOnPress = async (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add a member",
    });
  }, [navigation]);

  return (
    <>
      <CategoryFilter categoryId={categoryId} onPress={categoryId => {
        navigation.setParams({ categoryId })
      }} />
      <SectionContainer cn="mt-3">
        <View className="">
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
            </View>
          </Card>
        </View>
      </SectionContainer>
      <View className="mt-8 flex-1 justify-end items-center pb-8">
        <CustomButton
          variant="contained"
          onPress={handleSubmit(handleOnPress)}
        >
          <Text className="text-white text-lg">Add Player</Text>
        </CustomButton>
      </View>
    </>
  );
}
