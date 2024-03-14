import { TouchableOpacity } from "react-native";
import { clsx } from "clsx";

export function CustomButton({
  disabled,
  onPress,
  cn,
  children,
  variant = "text",
  strong = false,
}: {
  disabled?: boolean;
  onPress: () => unknown;
  cn?: string;
  children: React.ReactNode;
  variant?: "iconButton" | "contained" | "text" | "outlined";
  strong?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      className={clsx(
        "flex-row justify-center items-center rounded-full h-10 px-2",
        disabled && "opacity-50",
        variant === "iconButton" && "h-10 w-10 bg-[#5E4E45]",
        variant === "contained" && "bg-[#e3bba65d] px-6",
        variant === "contained" && strong && "bg-[#5E4E45] px-6",
        variant === "text" && "text-gray-600",
        variant === "outlined" && "border border-[#b9b9b9]",
        cn,
      )}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
}
