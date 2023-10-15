import { TouchableOpacity, View } from "react-native";
import { useState, memo } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyledText } from "./StyledText";
import { CustomDatePicker } from "./CustomDatePicker";

export const Select = ({ onPress, label, value, cn, dateType = false, setDate, renderValue, disabled }: {
  onPress?: () => void;
  label: string;
  value: unknown;
  cn?: string;
  dateType?: boolean;
  setDate: (date: string) => void;
  renderValue: (value: unknown) => React.ReactNode;
  disabled?: boolean;
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <>
      <View className={cn}>
        <StyledText cn={"text-gray-500 mb-1"}>{label}</StyledText>
        <TouchableOpacity
          onPress={() => (dateType ? setOpenDatePicker(true) : onPress())}
          disabled={disabled}
        >
          <View className="border border-gray-200 p-2 rounded flex-row justify-between">
            {renderValue(value)}
            <View className="px-2">
              <Entypo name="chevron-small-down" size={18} color="#6B7280" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {dateType && (
        <CustomDatePicker
          visible={openDatePicker}
          onClose={() => setOpenDatePicker(false)}
          setDate={setDate}
        />
      )}
    </>
  );
};

