import "./index.css";
import { Flex } from "@mantine/core";
import { useAppDispatch } from "app/store/hooks";
import { UndoRedo } from "entities/UndoRedo";
import { Zoom } from "entities/Zoom";
import { redo, undo } from "features/History";

export function BottomBar() {
  const dispatch = useAppDispatch();
  const handleUndoClick = () => {
    dispatch(undo());
  };

  const handleRedoClick = () => {
    dispatch(redo());
  };
  return (
    <>
      <Flex gap="md" className="bottombar_card">
        <Zoom />
        <UndoRedo onLeftBtnClick={handleUndoClick} onRightBtnClick={handleRedoClick} />
      </Flex>
    </>
  );
}
