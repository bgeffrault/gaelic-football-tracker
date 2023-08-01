import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton } from "../CustomButton";

export const HeaderRightAddButton = memo(({ nav }) => {
  const navigation = useNavigation();

  return (
    <CustomButton onPress={() => navigation.navigate(nav)}>
      <AntDesign name="pluscircleo" size={24} color="black" />
    </CustomButton>
  );
});
