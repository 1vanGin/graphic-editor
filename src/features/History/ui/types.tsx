import { TablerIconsProps } from "@tabler/icons-react";

export interface IHistoryAction {
  id: number;
  label: string;
  isCancel: boolean;
  icon: (props: TablerIconsProps) => JSX.Element;
  body: [];
}
