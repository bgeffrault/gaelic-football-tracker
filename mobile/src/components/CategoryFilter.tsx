import { TouchableOpacity, View } from "react-native";
import React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { StyledText } from "./StyledText";
import { getCategoryName } from "../utils/getCategoryName";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";

const FilterItem = ({ children, selected, onPress }: {
    children: React.ReactNode,
    onPress: () => void,
    selected: boolean
}) => (
    <View className="flex grow p-3">
        <TouchableOpacity className={clsx(
            'w-full grow justify-center items-center p-2 ',
            selected ? "bg-[#E3BBA6]" : "bg-[#ae9383]",
            "rounded-lg"
        )}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    </View>
)

export const CategoryFilter = ({ onPress, categoryId }: {
    onPress: (id: number) => void,
    categoryId: number
}) => {
    const supabaseClient = useSupabaseClientContext();

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const result = await supabaseClient.from('Category').select('id, name')
            return result.data
        },
    })

    if (isLoading) return null;

    return (
        <View className="flex flex-row justify-around">
            {categories.filter(category => category.name !== "mix").map((category) => {
                const selected = categoryId === Number(category.id);
                return (
                    <FilterItem key={category.id} onPress={() => onPress(Number(category.id))} selected={selected}>
                        <StyledText cn={clsx(selected ? "text-gray-800" : "text-white")}>
                            {getCategoryName(category.name)}
                        </StyledText>
                    </FilterItem>
                )
            }
            )}
        </View>)
};
