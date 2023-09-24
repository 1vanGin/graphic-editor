export interface ILayer {
  id: string;
  label: string;
  url: string;
  isVisible: boolean;
  sortOrder: number;
  opacity: number;
}

export interface ILayersItemProps {
  layer: ILayer;
}
