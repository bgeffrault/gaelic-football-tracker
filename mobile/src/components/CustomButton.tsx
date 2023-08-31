import { TouchableOpacity } from "react-native";
import { clsx } from "clsx";

export function CustomButton({
  disabled,
  onPress,
  cn,
  children,
  variant = "text",
}: {
  disabled?: boolean;
  onPress: () => void;
  cn?: string;
  children: React.ReactNode;
  variant?: "iconButton" | "contained" | "text" | "outlined";
}) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      className={clsx(
        "flex-row justify-center items-center rounded-full h-10 px-2",
        disabled && "opacity-50",
        variant === "iconButton" && "h-10 w-10 bg-blue-800 border",
        variant === "contained" && "bg-blue-800 border",
        variant === "text" && "text-blue-800",
        variant === "outlined" && "text-blue-800 border border-black",
        cn
      )}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
}
