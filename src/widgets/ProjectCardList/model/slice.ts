import { IProjectCard } from "entities/ProjectCard/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectsState } from "./types.ts";

const initialState: ProjectsState = {
  openProjectId: '',
  projects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsFromServer(state, action: PayloadAction<IProjectCard[]>) {
      if (state.projects.length === 0) {
        state.projects = action.payload;
      }
    },
    setOpenProjectId(state, action: PayloadAction<string>) {
      state.openProjectId = action.payload;
    },
    createProject(state, action: PayloadAction<IProjectCard>) {
      state.projects.push(action.payload);
    },
    deleteProject(state, action: PayloadAction<String>) {
      console.log("deleteProject", action.payload);

      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
    updateProject(
      state,
      action: PayloadAction<{ id: string; data: IProjectCard }>,
    ) {
      console.log("updateProject", action.payload);

      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );
      if (index !== -1) {
        state.projects[index] = action.payload.data;
      }
    },
  },
});

export const {
  setProjectsFromServer,
  createProject,
  deleteProject,
  updateProject,
  setOpenProjectId,
} = projectsSlice.actions;
