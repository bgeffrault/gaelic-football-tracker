import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton } from "../CustomButton";
import {
  AppRouteProp,
  RootNavigation,
  useAppNavigation,
} from "../../navigators";

type HeaderRightAddButtonProps<TRoute extends RootNavigation> = {
  nav: TRoute;
  params?: AppRouteProp<TRoute>["params"];
};

export const HeaderRightAddButton = memo(
  <TRoute extends RootNavigation>({
    nav,
    params,
  }: HeaderRightAddButtonProps<TRoute>) => {
    const navigation = useAppNavigation();

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      <CustomButton onPress={() => (navigation as any).navigate(nav, params)}>
        <AntDesign name="pluscircle" size={24} color="#DF8C5F" />
      </CustomButton>
    );
  },
);
