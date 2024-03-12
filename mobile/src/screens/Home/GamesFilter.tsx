import React from "react";
import clsx from "clsx";
import { FilterContainer, FilterItem } from "../../components/Filter/Filter";
import { StyledText } from "../../components/StyledText";

export function GamesFilter({
  onPress,
  oldGame,
}: {
  onPress: (olgGames: boolean) => void;
  oldGame: boolean;
}) {
  return (
    <FilterContainer>
      <FilterItem onPress={() => onPress(true)} selected={oldGame}>
        <StyledText cn={clsx(oldGame ? "text-gray-800" : "text-white")}>
          Old
        </StyledText>
      </FilterItem>
      <FilterItem onPress={() => onPress(false)} selected={!oldGame}>
        <StyledText cn={clsx(!oldGame ? "text-gray-800" : "text-white")}>
          Incoming
        </StyledText>
      </FilterItem>
    </FilterContainer>
  );
}
