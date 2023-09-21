import { ILayer } from "entities/LayersItem/ui/types";

export type LayersState = {
  layers: ILayer[];
  activeLayer: ILayer | null;
};
