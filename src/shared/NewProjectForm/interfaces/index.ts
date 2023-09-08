import { ILayer } from "../../../features/Layers/ui/types.ts";

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
  preview?: string;
  layers?: {
    [key: string]: ILayer;
  };
}
