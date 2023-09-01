import "./index.css";
import { Flex } from "@mantine/core";
import { UndoRedo } from "entities/UndoRedo";
import { Zoom } from "entities/Zoom";

export function BottomBar() {
  return (
    <>
      <Flex gap="md" className="bottombar_card">
        <Zoom />
        <UndoRedo />
      </Flex>
    </>
  );
}
