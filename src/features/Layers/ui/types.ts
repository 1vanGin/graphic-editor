import { TablerIconsProps } from "@tabler/icons-react";

export interface ILayer {
  id: string;
  label: string;
  url: string;
  isVisible: boolean;
  sortOrder: number;
  opacity: number;
  icon?: (props: TablerIconsProps) => JSX.Element;
  // body: [];
}
