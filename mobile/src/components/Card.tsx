import clsx from "clsx";
import { View } from "react-native";

export function Card({
  children,
  cn,
  first,
  last,
  isListItem = false,
  border = false,
}: {
  children: React.ReactNode;
  cn?: string;
  first?: boolean;
  last?: boolean;
  isListItem?: boolean;
  border?: boolean;
}) {
  return (
    <View
      className={clsx(
        border && !last ? "border-b-2 border-[#5e3b2913]" : "border-0",
        first && "rounded-t-lg",
        last && "rounded-b-lg",
        !isListItem && "rounded-lg",
        cn,
      )}
    >
      {children}
    </View>
  );
}
