import { ILayer } from "entities/LayersItem";

export interface FormValues {
  name: string;
  height: number;
  width: number;
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
