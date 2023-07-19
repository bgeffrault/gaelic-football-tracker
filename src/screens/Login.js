import { View } from "react-native";
import { useEffect, useState } from "react";
import { CustomButton } from "../components/CustomButton";
import { Card } from "../components/Card";
import { StyledText } from "../components/StyledText";
import { LabelledTextInput } from "../components/StyledTextInput";

export function Login({ navigation }) {
  const [clubId, setClubId] = useState("");
  const disabled = !clubId;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Gaelic football tracker",
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Card className="">
        <LabelledTextInput
          label="Rejoindre un club"
          inputProps={{
            placeholder: "Baptiste",
            onChangeText: setClubId,
            value: clubId,
          }}
          buttonProps={{
            disabled,
            onPress: () => navigation.navigate("Home"),
          }}
        />
        <View
          style={{
            marginVertical: 8,
            borderBottomColor: "#737373",
            borderBottomWidth: "2px",
          }}
        />
        <View className="justify-center items-start mt-4">
          <CustomButton
            variant="text"
            onPress={() => navigation.navigate("CreateClub")}
          >
            <StyledText className="text-lg">Créer un club →</StyledText>
          </CustomButton>
        </View>
      </Card>
    </View>
  );
}
