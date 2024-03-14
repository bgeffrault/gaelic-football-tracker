import { TouchableOpacity, View } from "react-native";
import React from "react";
import clsx from "clsx";

export function FilterItem({
  children,
  selected,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <View className="flex grow p-3">
      <TouchableOpacity
        className={clsx(
          "w-full grow justify-center items-center p-2 ",
          selected ? "bg-[#E3BBA6]" : "bg-[#ae9383]",
          "rounded-lg",
        )}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}

export function FilterContainer({ children }) {
  return <View className="flex flex-row justify-around">{children}</View>;
}
