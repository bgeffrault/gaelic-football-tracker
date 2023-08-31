import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import clubReducer from "./slices/clubSlice";
import gamesReducer from "./slices/gamesSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    games: gamesReducer,
    club: clubReducer,
  },
});

export interface RootState {
  game: ReturnType<typeof gameReducer>;
  games: ReturnType<typeof gamesReducer>;
  club: ReturnType<typeof clubReducer>;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
