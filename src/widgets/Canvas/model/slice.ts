import { createSlice } from "@reduxjs/toolkit";

type CanvasState = {
  events: string[];
}

const initialState: CanvasState = {
  events: [],
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    save(state) {
      state.events.push('save');
    },
    clearEvents(state) {
      state.events = [];
    }
  },
});

export const { save, clearEvents } = canvasSlice.actions;
