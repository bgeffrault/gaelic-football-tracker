import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import clubReducer from "./slices/clubSlice";
import gamesReducer from "./slices/gamesSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    games: gamesReducer,
    club: clubReducer,
  },
});
