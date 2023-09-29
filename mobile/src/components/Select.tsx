import { TouchableOpacity, View } from "react-native";
import { useState, memo } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyledText } from "./StyledText";
import { CustomDatePicker } from "./CustomDatePicker";

export const Select = ({ onPress, label, value, cn, dateType = false, setDate, renderValue }: {
  onPress?: () => void;
  label: string;
  value: any;
  cn?: string;
  dateType?: boolean;
  setDate: (date: string) => void;
  renderValue: (value: any) => React.ReactNode;
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <>
      <View className={cn}>
        <StyledText cn="text-lg">{label}</StyledText>
        <TouchableOpacity
          onPress={() => (dateType ? setOpenDatePicker(true) : onPress())}
        >
          <View className="border p-2 rounded flex-row justify-between">
            {renderValue(value)}
            <View className="px-2">
              <Entypo name="chevron-small-down" size={18} color="black" />
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

