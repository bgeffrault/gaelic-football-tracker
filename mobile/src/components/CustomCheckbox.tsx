import { memo } from "react";
import Checkbox from "expo-checkbox";

export const CustomCheckbox = memo(
  ({
    isChecked,
    setChecked,
  }: {
    isChecked: boolean;
    setChecked: (value: boolean) => void;
  }) => (
    <Checkbox
      value={isChecked}
      onValueChange={setChecked}
      color={isChecked ? "#6F9FA8" : undefined}
    />
  ),
);
