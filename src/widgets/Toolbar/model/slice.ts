import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToolbarState } from "../interfaces";
import { Instrument } from "features/History/ui/types";

const initialState: ToolbarState = {
  color: "#000000",
  typeTool: Instrument.brush,
};

export const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setTypeTool: (
      state,
      action: PayloadAction<Instrument>
    ) => {
      state.typeTool = action.payload;
    },
  },
});

export const { setColor, setTypeTool } = toolbarSlice.actions;
