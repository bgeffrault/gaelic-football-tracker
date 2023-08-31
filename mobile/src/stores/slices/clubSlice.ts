/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { ClubType } from "../../domain/types";

const initialState: ClubType = {
  members: [
    { firstName: "Jean", lastName: "Dupont", id: 1, categoryId: 1 },
    { firstName: "Jeff", lastName: "Dupont", id: 2, categoryId: 1 },
    { firstName: "Joe", lastName: "Tupont", id: 3, categoryId: 1 },
    { firstName: "Mike", lastName: "Bupont", id: 4, categoryId: 1 },
    { firstName: "Jeanne", lastName: "Darc", id: 5, categoryId: 2 },
  ],
  teamName: "Rennes GAA",
};

const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    addMember: (state, action) => {
      // @To do: check if member already exists + create an id
      state.members.push({ ...action.payload, id: state.members.length + 1 });
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(
        (player) => player.id !== action.payload.id
      );
    },
  },
});

export const { addMember, removeMember } = clubSlice.actions;
export default clubSlice.reducer;
