import clsx from "clsx";
import { View } from "react-native";

export function Card({ children, cn, first, last, isListItem = false }) {
  return (
    <View
      className={clsx(
        "border p-4 border-gray-500 bg-gray-100",
        first && "rounded-t-lg",
        last && "rounded-b-lg",
        !isListItem && "rounded-lg",
        cn
      )}
    >
      {children}
    </View>
  );
}
