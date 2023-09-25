import { TouchableOpacity, View } from "react-native";
import { useState, memo } from "react";
import { Entypo } from "@expo/vector-icons";
import clsx from "clsx";
import { StyledText } from "./StyledText";
import { CustomDatePicker } from "./CustomDatePicker";
import { DateTime } from 'luxon'

export const Select = memo(({ onPress, label, value, cn, displayType, setDate }: {
  onPress: () => void;
  label: string;
  value: string | Date;
  cn?: string;
  displayType: "number" | "date";
  setDate: (date: string) => void;
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const isDatePicker = displayType === "date";

  return (
    <>
      <View className={cn}>
        <StyledText>{label}</StyledText>
        <TouchableOpacity
          onPress={() => (isDatePicker ? setOpenDatePicker(true) : onPress())}
        >
          <View className="border p-2 rounded flex-row justify-between">
            <StyledText
              cn={clsx(
                displayType === "number" &&
                "rounded-lg bg-blue-800 text-white px-1 overflow-hidden"
              )}
            >
              {isDatePicker ? DateTime.fromISO(value).toFormat("dd-MM-yyyy") : value}
            </StyledText>
            <View className="px-2">
              <Entypo name="chevron-small-down" size={18} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {isDatePicker && (
        <CustomDatePicker
          visible={openDatePicker}
          onClose={() => setOpenDatePicker(false)}
          setDate={setDate}
        />
      )}
    </>
  );
});

