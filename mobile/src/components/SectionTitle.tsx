import { View } from "react-native";
import clsx from "clsx";
import { StyledText } from "./StyledText";

export function SectionTitle({
  children,
  cn,
  label,
}: {
  children?: React.ReactNode;
  cn?: string;
  label?: string;
}) {
  if (label) {
    return (
      <View className="mb-2">
        <StyledText cn={clsx("tracking-wide p-1 text-gray-400", cn)}>
          {label}
        </StyledText>
      </View>
    );
  }
  return <View className={clsx("mb-1", cn)}>{children}</View>;
}
