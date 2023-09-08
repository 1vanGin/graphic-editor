import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomValue: 100,
};

export const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    increaseZoom(state) {
      if (state.zoomValue < 96) {
        state.zoomValue = state.zoomValue + 5;
      }
    },
    decreaseZoom(state) {
      if (state.zoomValue > 4) {
        state.zoomValue = state.zoomValue - 5;
      }
    },
  },
});

export const { increaseZoom, decreaseZoom } = zoomSlice.actions;
