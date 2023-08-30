import { IProjectCard } from "./../../../entities/ProjectCard/interfaces/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectsState } from "./types.ts";

const initialState: ProjectsState = {
    projects: [
        {
            id: "1",
            name: "Project 1",
            height: 640,
            width: 480,
            preview:
                "https://render.fineartamerica.com/images/rendered/medium/print/6.5/8/break/images/artworkimages/medium/3/computer-programmer-showing-coding-word-drawing-frank-ramspott.jpg",
        },
        {
            id: "2",
            name: "Project 2",
            height: 640,
            width: 480,
            preview:
                "https://static.vecteezy.com/system/resources/previews/011/634/195/original/man-sitting-at-table-with-laptop-work-as-freelancer-and-programmer-modern-gadget-smiling-happy-guy-bubble-with-light-bulb-idea-concept-invention-and-thought-hand-drawn-sketch-cartoon-vector.jpg",
        },
        {
            id: "3",
            name: "Project 3",
            height: 640,
            width: 480,
            preview:
                "https://static.vecteezy.com/system/resources/previews/022/136/286/original/freelance-programmer-with-laptop-and-cup-monochromatic-flat-character-linear-hand-drawn-sketch-editable-person-simple-black-and-white-spot-illustration-for-web-graphic-design-and-animation-vector.jpg",
        },
    ],
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        createProject(state, action: PayloadAction<IProjectCard>) {
            state.projects.push(action.payload);
        },
        deleteProject(state, action: PayloadAction<String>) {
            console.log("deleteProject", action.payload);

            state.projects = state.projects.filter(
                (project) => project.id !== action.payload
            );
        },
        updateProject(
            state,
            action: PayloadAction<{ id: string; data: IProjectCard }>
        ) {
            console.log("updateProject", action.payload);

            const index = state.projects.findIndex(
                (project) => project.id === action.payload.id
            );
            if (index !== -1) {
                state.projects[index] = action.payload.data;
            }
        },
    },
});

export const { createProject, deleteProject, updateProject } =
    projectsSlice.actions;
