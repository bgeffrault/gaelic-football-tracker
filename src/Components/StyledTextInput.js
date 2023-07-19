import clsx from "clsx";
import { memo } from "react";
import { TextInput, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { StyledText } from "./StyledText";

export function StyledTextInput({ cn, ...props }) {
  return (
    <TextInput
      className={clsx(
        "border border-black rounded-lg p-2 grow min-w-[200px]",
        cn
      )}
      {...props}
    />
  );
}

export const LabelledTextInput = memo(
  ({ label, buttonProps, inputProps, cn }) => (
    <View className={clsx("justify-center items-start flex", cn)}>
      <StyledText cn="text-lg">{label}</StyledText>
      <View className="flex-row justify-center items-center">
        <StyledTextInput {...inputProps} />
        {buttonProps && (
          <CustomButton {...buttonProps} cn="ml-2" variant="iconButton">
            <StyledText cn="text-white text-lg">→</StyledText>
          </CustomButton>
        )}
      </View>
    </View>
  )
);
