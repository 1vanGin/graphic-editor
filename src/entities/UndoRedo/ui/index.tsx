import { Card } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import IconButton from "shared/IconButton/ui";

interface IUndoRedoProps {
  onLeftBtnClick: () => void;
  onRightBtnClick: () => void;
}

export function UndoRedo({ onLeftBtnClick, onRightBtnClick }: IUndoRedoProps) {
  return (
    <Card display="flex" shadow="sm" padding="sm" radius="md">
      <IconButton
        icon={<IconChevronLeft data-testid="undo-button" size="1rem" color="black" />}
        variant={"subtle"}
        onClick={onLeftBtnClick}
      />

      <IconButton
        icon={<IconChevronRight data-testid="redo-button" size="1rem" color="black" />}
        variant={"subtle"}
        onClick={onRightBtnClick}
      />
    </Card>
  );
}
