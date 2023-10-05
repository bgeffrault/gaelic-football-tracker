import { TouchableOpacity } from "react-native";
import { clsx } from "clsx";

export function CustomButton({
  disabled,
  onPress,
  cn,
  children,
  variant = "text",
  color = "#5E4E45"
}: {
  disabled?: boolean;
  onPress: () => void;
  cn?: string;
  children: React.ReactNode;
  variant?: "iconButton" | "contained" | "text" | "outlined";
  color?: string
}) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      className={clsx(
        "flex-row justify-center items-center rounded-full h-10 px-2",
        disabled && "opacity-50",
        variant === "iconButton" && `h-10 w-10 bg-[${color}]`,
        variant === `contained` && `bg-[${color}] px-6`,
        variant === `text` && `text-blue-800`,
        variant === `outlined` && `border border-[${color}]`,
        cn
      )}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
}
