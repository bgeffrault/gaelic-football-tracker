import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton } from "../CustomButton";
import { RootNavigation, useAppNavigation } from "../../navigators";

export const HeaderRightAddButton = memo(({ nav }: { nav: RootNavigation}) => {
  const navigation = useAppNavigation();

  return (
    <CustomButton onPress={() => navigation.navigate(nav)}>
      <AntDesign name="pluscircleo" size={24} color="black" />
    </CustomButton>
  );
});
