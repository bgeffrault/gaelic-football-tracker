import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { DateTime } from "luxon";
import { View } from "react-native";
import { CustomButton } from "./CustomButton";
import { LabelledTextInput, StyledTextInput } from "./StyledTextInput";
import { Select } from "./Select";
import { StyledText } from "./StyledText";

export type Rules = Omit<
  RegisterOptions<FieldValues, string>,
  "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

export function ControlledLabelledTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  buttonProps,
  control,
  inputProps,
  name,
  rules,
  defaultValue,
  cn,
}: {
  label: string;
  buttonProps?: Omit<React.ComponentProps<typeof CustomButton>, "children">;
  inputProps: Omit<
    React.ComponentProps<typeof StyledTextInput>,
    "onChangeText" | "value"
  >;
  cn?: string;
  control: Control<TFieldValues>;
  name: TName;
  rules?: Rules;
  defaultValue?: PathValue<TFieldValues, TName>;
}) {
  const { field, formState } = useController<TFieldValues, TName>({
    control,
    defaultValue,
    name,
    rules,
  });
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <LabelledTextInput
      label={label}
      buttonProps={buttonProps}
      inputProps={{
        ...inputProps,
        onChangeText: field.onChange,
        value: field.value,
      }}
      error={error}
      cn={cn}
    />
  );
}

export function ControlledSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue = null,
  rules,
  disabled,
  ...props
}: {
  control: Control<TFieldValues>;
  name: TName;
  defaultValue?: PathValue<TFieldValues, TName>;
  rules?: Rules;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof Select>, "value" | "setDate">) {
  const { field, formState } = useController<TFieldValues, TName>({
    control,
    defaultValue,
    name,
    rules,
  });
  const error = formState.errors[name]?.message as string | undefined;

  return (
    <>
      <Select
        value={field.value}
        {...props}
        setDate={(value) => {
          field.onChange(
            DateTime.fromFormat(value, "yyyy/MM/dd").toJSDate().toISOString(),
          );
        }}
        disabled={disabled}
      />
      <View>
        <StyledText cn="text-xs text-red-400 pb-2">{error}</StyledText>
      </View>
    </>
  );
}
