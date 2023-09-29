import { TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomButton } from "./CustomButton";
import { Ionicons } from '@expo/vector-icons';
import clsx from "clsx";
import { graphql, useFragment } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Constants from 'expo-constants';
import { StyledText } from "./StyledText";
import { getCategoryName } from "../utils/getCategoryName";

const FilterItem = ({ children, selected, onPress }: {
    children: React.ReactNode,
    onPress: () => void,
    selected: boolean
}) => (
    <View className="flex grow">
        <TouchableOpacity className={clsx('w-full grow justify-center items-center p-2 ', selected ? "bg-[#E3BBA6]" : "bg-[#ae9383]")} onPress={onPress}>
            {children}
        </TouchableOpacity>
    </View>
)

const categoriesFilterQuery = graphql(/* GraphQL */ `
  query categoriesFilterQuery {
    categoryCollection {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)

export const CategoryFilter = ({ onPress, categoryId }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () =>
            request(
                Constants.expoConfig.extra.supabaseUrl,
                categoriesFilterQuery,
                {},
                {
                    "content-type": "application/json",
                    "apikey": Constants.expoConfig.extra.supabaseAnonKey,
                }
            ),
    })

    if (isLoading) return null;

    return (
        <View className="flex flex-row justify-around">
            {data.categoryCollection.edges.map((edge) => {
                const selected = categoryId === Number(edge.node.id);
                return (
                    <FilterItem key={edge.node.id} onPress={() => onPress(Number(edge.node.id))} selected={selected}>
                        <StyledText cn={clsx(selected ? "text-black" : "text-white")}>
                            {getCategoryName(edge.node.name)}
                        </StyledText>
                    </FilterItem>
                )
            }
            )}
        </View>)
};
