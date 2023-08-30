import { ILayer } from "features/Layers/ui/types";

export type LayersState = {
  layers: ILayer[];
  activeLayer: ILayer | null;
};
