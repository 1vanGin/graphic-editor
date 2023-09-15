import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LayersState } from "./types";
import { ILayer } from "../ui/types";

const initialState: LayersState = {
  layers: [
    {
      id: "1",
      label: "Слой 1",
      isVisible: true,
      opacity: 100,
      sortOrder: 1,
      url: "",
    },
    {
      id: "2",
      label: "Слой 2",
      isVisible: true,
      opacity: 100,
      sortOrder: 2,
      url: "",
    },
    {
      id: "3",
      label: "Слой 3",
      isVisible: false,
      opacity: 100,
      sortOrder: 3,
      url: "",
    },
  ],
  activeLayer: null,
  dragLayer: null,
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
    deleteLayer(state, action: PayloadAction<string>) {
      const filteredLayers = state.layers.filter((item) => item.id !== action.payload);
      state.layers = filteredLayers;
    },
    toggleVisability(state, action: PayloadAction<ILayer>) {
      const findIndex = state.layers.findIndex((item) => item.id == action.payload.id);
      state.layers[findIndex].isVisible = !action.payload.isVisible;
    },
    changeLayerLabel(state, action: PayloadAction<{ id: string; newLabel: string }>) {
      state.layers.map((item) => {
        if (action.payload.id === item.id) {
          return (item.label = action.payload.newLabel);
        }
      });
    },
    dragLayer(state, action: PayloadAction<ILayer | null>) {
      state.dragLayer = action.payload;
    },
    setLayersOrder(state, action: PayloadAction<ILayer>) {
      const updatedLayers = state.layers.map((layer) => {
        if (layer?.id === action.payload?.id) {
          return { ...layer, sortOrder: state.dragLayer?.sortOrder };
        }
        if (layer?.id === state.dragLayer?.id) {
          return { ...layer, sortOrder: action.payload?.id };
        }
        return layer;
      });

      state.layers = updatedLayers as ILayer[];
    },
  },
});

export const {
  addLayer,
  deleteLayer,
  toggleVisability,
  setActiveLayer,
  changeLayerLabel,
  dragLayer,
  setLayersOrder,
} = layersSlice.actions;
