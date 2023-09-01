import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LayersState } from "./types";
import { IconLayersSubtract } from "@tabler/icons-react";
import { ILayer } from "../ui/types";

const initialState: LayersState = {
  layers: [
    {
      id: 1,
      label: "Слой 1",
      icon: IconLayersSubtract,
      isVisible: true,
      opacity: "100%",
      body: [],
    },
    {
      id: 2,
      label: "Слой 2",
      icon: IconLayersSubtract,
      isVisible: true,
      opacity: "100%",
      body: [],
    },
    {
      id: 3,
      label: "Слой 3",
      icon: IconLayersSubtract,
      isVisible: false,
      opacity: "100%",
      body: [],
    },
  ],
  activeLayer: null,
};

export const layersSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    setActiveLayer(state, action: PayloadAction<ILayer>) {
      state.activeLayer = action.payload;
    },
    addLayer(state, action: PayloadAction<ILayer>) {
      state.layers.push(action.payload);
    },
    deleteLayer(state, action: PayloadAction<number>) {
      const filteredLayers = state.layers.filter(
        (item) => item.id !== action.payload
      );
      state.layers = filteredLayers;
    },
    toggleVisability(state, action: PayloadAction<ILayer>) {
      const findIndex = state.layers.findIndex(
        (item) => item.id == action.payload.id
      );
      state.layers[findIndex].isVisible = !action.payload.isVisible;
    },
  },
});

export const { addLayer, deleteLayer, toggleVisability, setActiveLayer } =
  layersSlice.actions;