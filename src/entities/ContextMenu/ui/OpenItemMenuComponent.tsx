import { ContextMenuItemComponent } from "shared/ui";
import { rem } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { ItemMenuProps } from "../interfaces";

export const OpenItemMenuComponent = ({ onClick }: ItemMenuProps) => {
  return (
    <ContextMenuItemComponent
      title="Открыть"
      icon={<IconEye size={rem(14)} />}
      color="green"
      onClick={onClick}
    />
  );
};
