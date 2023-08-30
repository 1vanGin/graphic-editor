import { TablerIconsProps } from "@tabler/icons-react";

export interface ILayer {
  id: number;
  label: string;
  isVisible: boolean;
  opacity: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  body: [];
}
