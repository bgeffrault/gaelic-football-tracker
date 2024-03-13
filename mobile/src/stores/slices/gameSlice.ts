/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MemberType } from "../../domain/types";
import { Team } from "../../types/Team";
import { Category } from "../../types/Category";

export type GameSliceState = {
  players: MemberType[];
  opponentTeam: null | Team;
  team: null | Team;
  gameName: string;
  category: null | Category;
};

const initialState: GameSliceState = {
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
    addPlayer: (state, action: PayloadAction<MemberType>) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<MemberType>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id,
      );
    },
    resetPlayers: (state) => {
      state.players = [];
    },
    setPlayers: (state, action: PayloadAction<MemberType[]>) => {
      state.players = action.payload;
    },
    resetGame: () => initialState,
    setOpponentTeam: (state, action: PayloadAction<Team>) => {
      state.opponentTeam = action.payload;
    },
    setTeam: (state, action: PayloadAction<Team>) => {
      state.team = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setGame: (state, action: PayloadAction<Partial<GameSliceState>>) => {
      return { ...state, ...action.payload };
    },
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
  setPlayers,
  setGame,
} = gameSlice.actions;
export default gameSlice.reducer;
