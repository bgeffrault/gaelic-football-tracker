import { FontAwesome } from "@expo/vector-icons";
import { useAppNavigation } from "../navigators";
import { CustomButton } from "./CustomButton";

export function GoHomeButton() {
  const navigation = useAppNavigation();
  return (
    <CustomButton
      onPress={() => {
        navigation.navigate("Home");
      }}
    >
      <FontAwesome name="home" size={24} color="#DF8C5F" />
    </CustomButton>
  );
}
