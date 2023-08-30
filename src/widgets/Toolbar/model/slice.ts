import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToolbarState } from "../interfaces";

const initialState: ToolbarState = {
  color: "#000000",
  typeTool: null,
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
      action: PayloadAction<"brush" | "eraser" | "line" | "figure" | null>
    ) => {
      state.typeTool = action.payload;
    },
  },
});

export const { setColor, setTypeTool } = toolbarSlice.actions;
