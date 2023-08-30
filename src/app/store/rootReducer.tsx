import { combineReducers } from "redux";
import { projectsSlice } from "../../widgets/ProjectCardList/model/slice.ts";
import { toolbarSlice } from "widgets/Toolbar/model/slice.ts";

export const rootReducer = combineReducers({
  [projectsSlice.name]: projectsSlice.reducer,
  [toolbarSlice.name]: toolbarSlice.reducer,
});
