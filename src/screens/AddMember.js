import { Text, View } from "react-native";
import { useEffect, useReducer } from "react";
import { LabelledTextInput } from "../components/StyledTextInput";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";

export function AddMember({ navigation }) {
  const [state, updateState] = useReducer(
    (current, partialState) => ({
      ...current,
      ...partialState,
    }),
    { firstName: "", lastName: "", pseudo: "" }
  );
  const fields = [
    {
      label: "Prénom",
      placeholder: "Baptiste",
      value: state.firstName,
      onChangeText: (text) => updateState({ firstName: text }),
      required: true,
    },
    {
      label: "Nom",
      placeholder: "Geffrault",
      value: state.lastName,
      onChangeText: (text) => updateState({ lastName: text }),
      required: true,
    },
    {
      label: "Pseudo",
      placeholder: "bg",
      value: state.pseudo,
      onChangeText: (text) => updateState({ pseudo: text }),
      required: false,
    },
  ];

  const isValid = fields.every((elem) => (elem.required ? elem.value : true));

  const handleOnPress = () => {
    // Add member to CreateClub
    navigation.navigate("Members");
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
            ({ label, value, placeholder, onChangeText, required }, i) => (
              <LabelledTextInput
                key={label}
                label={`${label}${required ? " *" : ""}`}
                inputProps={{
                  placeholder,
                  onChangeText,
                  value,
                }}
                cn={i > 0 && "mt-4"}
              />
            )
          )}
          <View className="mt-8">
            <CustomButton
              variant="contained"
              disabled={!isValid}
              onPress={handleOnPress}
            >
              <Text className="text-white text-lg">Ajouter</Text>
            </CustomButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
