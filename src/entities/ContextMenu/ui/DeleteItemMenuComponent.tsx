import { ContextMenuItemComponent } from "shared/ui";
import { rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { ItemMenuProps } from "../interfaces";

export const DeleteItemMenuComponent = ({ onClick }: ItemMenuProps) => {
  return (
    <ContextMenuItemComponent
      title="Удалить"
      icon={<IconTrash size={rem(14)} />}
      color="red"
      onClick={onClick}
    />
  );
};
