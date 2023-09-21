import { ILayer } from "entities/LayersItem/ui/types";

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
