/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  playerId: number | null;
} = {
  playerId: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
    resetPlayerId: (state) => {
      state.playerId = null;
    },
  },
});

export const { setPlayerId, resetPlayerId } = playerSlice.actions;
export default playerSlice.reducer;
