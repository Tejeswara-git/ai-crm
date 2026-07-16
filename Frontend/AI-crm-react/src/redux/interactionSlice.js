import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",

  initialState: {
    latest: null,
    history: [],
  },

  reducers: {

    setLatest(state, action) {
      state.latest = action.payload;
      state.history.unshift(action.payload);
    },

  },
});

export const { setLatest } = interactionSlice.actions;

export default interactionSlice.reducer;