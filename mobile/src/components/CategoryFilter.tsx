import React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { StyledText } from "./StyledText";
import { getCategoryName } from "../utils/getCategoryName";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { FilterContainer, FilterItem } from "./Filter/Filter";

export function CategoryFilter({
  onPress,
  categoryId,
}: {
  onPress: (id: number) => void;
  categoryId: number;
}) {
  const supabaseClient = useSupabaseClientContext();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await supabaseClient.from("Category").select("id, name");
      return result.data;
    },
  });

  if (isLoading) return null;

  return (
    <FilterContainer>
      {categories
        .filter((category) => category.name !== "mix")
        .map((category) => {
          const selected = categoryId === Number(category.id);
          return (
            <FilterItem
              key={category.id}
              onPress={() => onPress(Number(category.id))}
              selected={selected}
            >
              <StyledText cn={clsx(selected ? "text-gray-800" : "text-white")}>
                {getCategoryName(category.name)}
              </StyledText>
            </FilterItem>
          );
        })}
    </FilterContainer>
  );
}
