import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import clubReducer from "./slices/clubSlice";
import playerReducer from "./slices/playerSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    games: playerReducer,
    club: clubReducer,
    player: playerReducer,
  },
});

export interface RootState {
  game: ReturnType<typeof gameReducer>;
  player: ReturnType<typeof playerReducer>;
  club: ReturnType<typeof clubReducer>;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
