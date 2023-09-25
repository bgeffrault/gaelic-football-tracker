import clsx from "clsx";
import { memo } from "react";
import { TextInput, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { StyledText } from "./StyledText";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";

export function StyledTextInput({ cn, ...props }: { cn?: string } & React.ComponentProps<typeof TextInput>) {
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
  ({ label, buttonProps, inputProps, error, cn }: {
    label: string;
    buttonProps?: Omit<React.ComponentProps<typeof CustomButton>, "children">;
    inputProps: React.ComponentProps<typeof StyledTextInput>;
    cn?: string;
    error?: string;
  }) => (
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
      <View>
        <StyledText cn="text-xs text-red-400">
          {error}
        </StyledText>
      </View>
    </View>
  )
);

export type Rules = Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">

export const ControlledLabelledTextInput = <T extends unknown>({ label, buttonProps, control, inputProps, name, rules, cn }: {
  label: string;
  buttonProps?: Omit<React.ComponentProps<typeof CustomButton>, "children">;
  inputProps: Omit<React.ComponentProps<typeof StyledTextInput>, "onChangeText" | "value">;
  cn?: string;
  control: Control<FieldValues, T>,
  name: string,
  rules?: Rules
}) => {
  const { field, formState } = useController({
    control,
    defaultValue: "",
    name,
    rules
  })
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <LabelledTextInput label={label} buttonProps={buttonProps} inputProps={{ ...inputProps, onChangeText: field.onChange, value: field.value }} error={error} cn={cn} />
  )
};
