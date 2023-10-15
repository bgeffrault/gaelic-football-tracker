/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  opponentTeam: null,
  team: null,
  gameName: "",
  category: null,
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
    resetPlayers: (state) => {
      state.players = [];
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    resetGame: () => initialState,
    setOpponentTeam: (state, action) => {
      state.opponentTeam = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    }
  },
});

export const {
  addPlayer,
  removePlayer,
  resetGame,
  setOpponentTeam,
  setCategory,
  setTeam,
  resetPlayers,
  setPlayers
} = gameSlice.actions;
export default gameSlice.reducer;
