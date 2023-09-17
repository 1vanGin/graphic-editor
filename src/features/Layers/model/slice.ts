import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LayersState } from "./types";
import { ILayer } from "../ui/types";
import { setProjectLayersThunk } from "./layersThunk";

const initialState: LayersState = {
  layers: [],
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
    deleteLayer(state, action: PayloadAction<string>) {
      const filteredLayers = state.layers.filter((item) => item.id !== action.payload);
      state.layers = filteredLayers;
    },
    toggleVisibility(state, action: PayloadAction<ILayer>) {
      const findIndex = state.layers.findIndex((item) => item.id == action.payload.id);
      state.layers[findIndex].isVisible = action.payload.isVisible;
    },
    changeLayerLabel(state, action: PayloadAction<{ id: string; newLabel: string }>) {
      state.layers.map((item) => {
        if (action.payload.id === item.id) {
          return (item.label = action.payload.newLabel);
        }
      });
    },
    changeLayerImageUrl(state, action: PayloadAction<{ id: string; url: string }>) {
      state.layers.map((item) => {
        if (action.payload.id === item.id) {
          return (item.url = action.payload.url);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setProjectLayersThunk, (state, action) => {
      state.layers = action.payload;
    });
  },
});

export const { addLayer, deleteLayer, toggleVisibility, setActiveLayer, changeLayerLabel, changeLayerImageUrl } =
  layersSlice.actions;
