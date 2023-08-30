import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./types";
import { IconCircle, IconLine, IconPencil } from "@tabler/icons-react";
import { IHistoryAction } from "../ui/types";

const initialState: HistoryState = {
  history: [
    {
      id: 1,
      label: "Действие 1",
      icon: IconCircle,
      isCancel: true,
      body: [],
    },
    {
      id: 2,
      label: "Действие 2",
      icon: IconPencil,
      isCancel: false,
      body: [],
    },
    {
      id: 3,
      label: "Действие 3",
      icon: IconLine,
      isCancel: false,
      body: [],
    },
  ],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addAction(state, action: PayloadAction<IHistoryAction>) {
      state.history.push(action.payload);
    },
    toggleCanceledAction(state, action: PayloadAction<IHistoryAction>) {
      const findIndex = state.history.findIndex(
        (item) => item.id == action.payload.id
      );
      state.history[findIndex].isCancel = !action.payload.isCancel;
    },
  },
});

export const { addAction, toggleCanceledAction } = historySlice.actions;
