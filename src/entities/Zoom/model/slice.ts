import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomValue: 100,
};

export const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    increaseZoom(state) {
      let zoom = state.zoomValue + 5;
      if (zoom > 200) {
        zoom = 200;
      }
      return { ...state, zoomValue: zoom }
    },
    decreaseZoom(state) {
      let zoom = state.zoomValue - 5;
      if (zoom < 5) {
        zoom = 5;
      }
      return { ...state, zoomValue: zoom }
    },
  },
});

export const { increaseZoom, decreaseZoom } = zoomSlice.actions;
