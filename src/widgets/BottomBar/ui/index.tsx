import "./index.css";
import { Flex } from "@mantine/core";
import { useAppDispatch } from "app/store/hooks";
import { UndoRedo } from "entities/UndoRedo";
import { Zoom } from "entities/Zoom";
import { decreaseZoom, increaseZoom } from "entities/Zoom/model/slice";
import { redo, undo } from "features/History";
import { useHotkeys } from 'react-hotkeys-hook';

export function BottomBar() {
  const dispatch = useAppDispatch();
  const handleUndoClick = () => {
    dispatch(undo());
  };

  const handleRedoClick = () => {
    dispatch(redo());
  };

  useHotkeys('ctrl+z', handleUndoClick);
  useHotkeys('ctrl+y', handleRedoClick);
  useHotkeys('-', () => {
    dispatch(decreaseZoom());
  });
  useHotkeys('=', () => {
    dispatch(increaseZoom());
  });

  return (
    <>
      <Flex gap="md" className="bottombar_card">
        <Zoom />
        <UndoRedo onLeftBtnClick={handleUndoClick} onRightBtnClick={handleRedoClick} />
      </Flex>
    </>
  );
}
