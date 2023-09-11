import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomValue: 100,
};

export const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    increaseZoom(state) {
      state.zoomValue = state.zoomValue + 5;
      if (state.zoomValue > 200) {
        state.zoomValue = 200;
      }
    },
    decreaseZoom(state) {
      state.zoomValue = state.zoomValue - 5;
      if (state.zoomValue < 5) {
        state.zoomValue = 5;
      }
    },
  },
});

export const { increaseZoom, decreaseZoom } = zoomSlice.actions;
