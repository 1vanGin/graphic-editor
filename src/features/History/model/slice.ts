import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./types";
import { IHistoryAction } from "entities/ActionItem";

const initialState: HistoryState = {
  history: [],
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
    clear(state) {
      state.history = [];
    },
  },
});

export const { addAction, toggleCanceledAction, undo, redo, clear } = historySlice.actions;
