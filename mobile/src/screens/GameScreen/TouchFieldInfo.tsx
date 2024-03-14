import { View } from "react-native";
import { StyledText } from "../../components/StyledText";

export function TouchFieldInfo() {
  return (
    <View className="mt-2 flex-1 items-center justify-center">
      <View className="mt-2 p-2 rounded-xl bg-white w-full items-center justify-center">
        <StyledText cn="text-gray-400 text-lg">Touch the field 👆⬆️</StyledText>
        <StyledText cn="text-gray-400">(where the shoot happened)</StyledText>
      </View>
    </View>
  );
}
