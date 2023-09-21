import { ILayer } from "entities/LayersItem/ui/types";

export interface FormValues {
  name: string;
  height: number;
  width: number;
}

export interface ProjectProp {
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

export interface IUpdateProjectLayers {
  projectId: string;
  layer: ILayer;
}

export interface IUpdateProjectLayerImageUrl {
  projectId: string;
  layerId: string;
  url: string;
}
