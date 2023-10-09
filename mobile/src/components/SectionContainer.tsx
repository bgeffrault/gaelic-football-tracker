import clsx from "clsx"
import { View } from "react-native"

export const SectionContainer = ({ children, cn }: {
    children: React.ReactNode,
    cn?: string
}) => {
    return (
        <View className={cn}>
            <View className={clsx(" bg-white rounded-3xl p-3")} >{children}</View>
        </View>)
}
