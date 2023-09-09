import { Menu } from "@mantine/core";
import { ReactNode } from "react";

interface ContextMenuItemComponentProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  color?: string;
}

export const ContextMenuItemComponent = ({
  icon,
  title,
  color = "black",
  onClick,
}: ContextMenuItemComponentProps) => {
  return (
    <Menu.Item icon={icon} color={color} onClick={onClick}>
      {title}
    </Menu.Item>
  );
};
