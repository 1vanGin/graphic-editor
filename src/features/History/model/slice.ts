import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./types";
import { IHistoryAction, Instrument } from "../ui/types";

const initialState: HistoryState = {
  history: [
    {
      id: "1",
      label: "Действие 1",
      instrument: Instrument.ellipse,
      isCancel: false,
      startPoint: { x: 0, y: 0 },
      flashingPoints: [],
      endPoint: { x: 0, y: 0 },
      layerId: "l1",
    },
    {
      id: "2",
      label: "Действие 2",
      instrument: Instrument.brush,
      isCancel: false,
      startPoint: { x: 0, y: 0 },
      flashingPoints: [],
      endPoint: { x: 0, y: 0 },
      layerId: "l2",
    },
    {
      id: "3",
      label: "Действие 3",
      instrument: Instrument.line,
      isCancel: false,
      startPoint: { x: 0, y: 0 },
      flashingPoints: [],
      endPoint: { x: 0, y: 0 },
      layerId: "l3",
    },
  ],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addAction(state, action: PayloadAction<IHistoryAction>) {
      console.log("action.payload", action.payload);
      state.history.unshift(action.payload);
    },
    toggleCanceledAction(state, action: PayloadAction<IHistoryAction>) {
      const findIndex = state.history.findIndex((item) => item.id == action.payload.id);
      state.history[findIndex].isCancel = !action.payload.isCancel;
    },
    undo(state) {
      let isActionFound = false;
      state.history.map((item) => {
        if (!item.isCancel && !isActionFound) {
          item.isCancel = true;
          isActionFound = true;
          return item;
        }
        return item;
      });
    },
    redo(state) {
      let isActionFound = false;
      for (let i = state.history.length - 1; i >= 0; i--) {
        if (state.history[i].isCancel && !isActionFound) {
          state.history[i].isCancel = false;
          isActionFound = true;
        }
      }
    },
  },
});

export const { addAction, toggleCanceledAction, undo, redo } = historySlice.actions;
