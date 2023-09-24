import { IProjectCard } from "entities/ProjectCard/interfaces";

export type ProjectsState = {
    openProjectId: string
    projects: IProjectCard[];
};
