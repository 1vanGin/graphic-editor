import { ILayer } from "entities/LayersItem";

export interface IProjectCard {
  id: string;
  name: string;
  width: number;
  height: number;
  createdDate: number;
  preview?: string;
  layers?: {
    [key: string]: ILayer;
  };
}

export interface ProjectModalProps {
  projectId: IProjectCard["id"];
}
