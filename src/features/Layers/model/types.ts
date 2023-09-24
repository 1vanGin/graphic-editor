import { ILayer } from "entities/LayersItem";

export type LayersState = {
  layers: ILayer[];
  activeLayer: ILayer | null;
};
