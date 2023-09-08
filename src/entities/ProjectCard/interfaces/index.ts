import { ILayer } from "features/Layers/ui/types.ts";

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
