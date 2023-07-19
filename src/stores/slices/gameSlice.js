/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  opponentName: "",
  duration: "60",
  gameName: "",
  date: new Date().toISOString(),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id
      );
    },
    reset: () => initialState,
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setOpponentName: (state, action) => {
      state.opponentName = action.payload;
    },
    setGameName: (state, action) => {
      state.gameName = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  reset,
  setDuration,
  setOpponentName,
  setGameName,
  setDate,
} = gameSlice.actions;
export default gameSlice.reducer;
