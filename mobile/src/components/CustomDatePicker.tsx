import { Modal, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { StyledText } from "./StyledText";
import { CustomButton } from "./CustomButton";

type CustomDatePickerProps = {
  visible: boolean;
  onClose: () => unknown;
  setDate: (date: string) => unknown;
};

export function CustomDatePicker({
  visible,
  onClose,
  setDate,
}: CustomDatePickerProps) {
  return (
    <Modal visible={visible} transparent>
      <View className="flex-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
          className="flex-1"
        />
        <View className="w-full bg-white flex-1 justify-center items-center">
          <View className="flex-row justify-between w-full pt-6 px-2">
            <CustomButton onPress={onClose}>
              <StyledText>Annuler</StyledText>
            </CustomButton>
            <CustomButton onPress={onClose}>
              <StyledText>Terminé</StyledText>
            </CustomButton>
          </View>
          <DatePicker
            onSelectedChange={(d) => {
              setDate(d);
              onClose();
            }}
            mode="calendar"
          />
        </View>
      </View>
    </Modal>
  );
}
