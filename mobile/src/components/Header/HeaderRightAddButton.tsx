import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton } from "../CustomButton";
import { RootNavigation, useAppNavigation } from "../../navigators";

export const HeaderRightAddButton = memo(({ nav, params }: {
  nav: RootNavigation,
  params?: any;
}) => {
  const navigation = useAppNavigation();

  return (
    <CustomButton onPress={() => navigation.navigate(nav, params)}>
      <AntDesign name="pluscircle" size={24} color="#DF8C5F" />
    </CustomButton>
  );
});
