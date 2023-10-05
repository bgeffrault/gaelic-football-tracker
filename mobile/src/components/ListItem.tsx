import clsx from "clsx";
import { TouchableOpacity } from "react-native";

export const ListItem = ({ children, onPress, disabled, first, last, isSelected }: {
    children: React.ReactNode;
    onPress: () => void;
    disabled: boolean;
    first: boolean;
    last: boolean;
    isSelected: boolean;
}) => {
    return (
        <TouchableOpacity
            className={clsx(
                "border border-x-0 border-t-0 border-b-[#5e3b2913] flex-row justify-between items-center",
                "py-2 px-4",
                first && "rounded-t-lg",
                last && "rounded-b-lg",
                isSelected && "bg-[#E3BBA6]"
            )}
            onPress={onPress}
            disabled={disabled}
        >
            {children}
        </TouchableOpacity>
    )
}
