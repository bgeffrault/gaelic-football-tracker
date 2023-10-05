import clsx from "clsx";
import { memo } from "react";
import { TextInput, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { StyledText } from "./StyledText";

export function StyledTextInput({ cn, ...props }: { cn?: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      className={clsx(
        "border border-gray-200 rounded-lg p-2 grow min-w-[200px]",
        cn
      )}
      {...props}
    />
  );
}


export const LabelledTextInput = memo(
  ({ label, buttonProps, inputProps, error, cn }: {
    label: string;
    buttonProps?: Omit<React.ComponentProps<typeof CustomButton>, "children">;
    inputProps: React.ComponentProps<typeof StyledTextInput>;
    cn?: string;
    error?: string;
  }) => (
    <>
      <View className={clsx("justify-center items-start flex", cn)}>
        <StyledText cn="text-gray-500 mb-1">{label}</StyledText>
        <View className="flex-row justify-center items-center">
          <StyledTextInput {...inputProps} />
          {buttonProps && (
            <CustomButton {...buttonProps} cn="ml-2" variant="iconButton">
              <StyledText cn="text-white text-lg">→</StyledText>
            </CustomButton>
          )}
        </View>
        <View>
          <StyledText cn="text-xs text-red-400">
            {error}
          </StyledText>
        </View>
      </View>
    </>
  )
);



