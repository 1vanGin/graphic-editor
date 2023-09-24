import { ContextMenuItemComponent } from "shared/ui";
import { rem } from "@mantine/core";
import { IconFileTypePng } from "@tabler/icons-react";
import { ItemMenuProps } from "../interfaces";

export const DownloadItemMenuComponent = ({ onClick }: ItemMenuProps) => {
  return (
    <ContextMenuItemComponent
      title="Скачать"
      icon={<IconFileTypePng size={rem(14)} />}
      onClick={onClick}
    />
  );
};
