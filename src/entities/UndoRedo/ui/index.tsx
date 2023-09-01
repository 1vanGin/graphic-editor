import { Card } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useAppDispatch } from "app/store/hooks";
import IconButton from "shared/IconButton/ui";

export function UndoRedo() {
  const dispatch = useAppDispatch();
  return (
    <Card display="flex" shadow="sm" padding="sm" radius="md">
      <IconButton
        icon={<IconChevronLeft size="1rem" color="black" />}
        variant={"subtle"}
        // onClick={() => {
        //   dispatch(decreaseZoom());
        // }}
      />

      <IconButton
        icon={<IconChevronRight size="1rem" color="black" />}
        variant={"subtle"}
        // onClick={() => {
        //   dispatch(increaseZoom());
        // }}
      />
    </Card>
  );
}
