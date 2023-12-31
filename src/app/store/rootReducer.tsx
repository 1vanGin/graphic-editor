import { combineReducers } from "redux";
import { projectsSlice } from "widgets/ProjectCardList/model/slice.ts";
import { toolbarSlice } from "widgets/Toolbar/model/slice.ts";
import { historySlice } from "features/History/model/slice.ts";
import { layersSlice } from "features/Layers/model/slice.ts";
import { zoomSlice } from "entities/Zoom/model/slice.ts";
import { canvasSlice } from "widgets/Canvas/model/slice";

export const rootReducer = combineReducers({
  [projectsSlice.name]: projectsSlice.reducer,
  [toolbarSlice.name]: toolbarSlice.reducer,
  [historySlice.name]: historySlice.reducer,
  [layersSlice.name]: layersSlice.reducer,
  [zoomSlice.name]: zoomSlice.reducer,
  [canvasSlice.name]: canvasSlice.reducer,
});
