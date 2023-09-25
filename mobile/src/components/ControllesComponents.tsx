import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { CustomButton } from "./CustomButton";
import { LabelledTextInput, StyledTextInput } from "./StyledTextInput";
import { Select } from "./Select";
import { DateTime } from "luxon";

export type Rules = Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">

export const ControlledLabelledTextInput = <T extends unknown>({ label, buttonProps, control, inputProps, name, rules, defaultValue, cn }: {
    label: string;
    buttonProps?: Omit<React.ComponentProps<typeof CustomButton>, "children">;
    inputProps: Omit<React.ComponentProps<typeof StyledTextInput>, "onChangeText" | "value">;
    cn?: string;
    control: Control<FieldValues, T>,
    name: string,
    rules?: Rules,
    defaultValue?: string
}) => {
    const { field, formState } = useController({
        control,
        defaultValue,
        name,
        rules
    })
    const error = formState.errors[name]?.message as string | undefined;

    return (
        <LabelledTextInput label={label} buttonProps={buttonProps} inputProps={{ ...inputProps, onChangeText: field.onChange, value: field.value }} error={error} cn={cn} />
    )
};

export const ControlledSelect = <T extends unknown>({ control, name, defaultValue = "", rules, displayType, ...props }: {
    control: Control<FieldValues, T>,
    name: string,
    defaultValue?: string,
    rules?: Rules,
} & Omit<React.ComponentProps<typeof Select>, "value">) => {
    const { field, formState } = useController({
        control,
        defaultValue,
        name,
        rules
    })
    const error = formState.errors[name]?.message as string | undefined;

    return (
        <Select
            value={displayType === "date" ? field.value : field.value.length}
            {...props}
            displayType={displayType}
            setDate={(value) => {
                field.onChange(DateTime.fromFormat(value, "yyyy/MM/dd").toJSDate().toISOString())
            }}
        />
    )
}
