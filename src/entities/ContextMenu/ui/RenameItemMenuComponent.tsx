import { ContextMenuItemComponent } from "shared/ui";
import { rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { ItemMenuProps } from "../interfaces";

export const RenameItemMenuComponent = ({ onClick }: ItemMenuProps) => {
  return (
    <ContextMenuItemComponent
      title="Переименовать"
      icon={<IconPencil size={rem(14)} />}
      onClick={onClick}
    />
  );
};
