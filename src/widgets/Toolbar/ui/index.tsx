import { useRef, useState } from "react";
import {
  IconBrush,
  IconEraser,
  IconBackslash,
  IconSquare,
  IconPalette,
  IconCircle,
} from "@tabler/icons-react";
import IconButton from "shared/IconButton/ui";
import { Card, ColorPicker } from "@mantine/core";
import "./index.css";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { setColor, setTypeTool } from "../model/slice";

import { useOnClickOutside } from "usehooks-ts";
import { Instrument } from "entities/ActionItem";
import { useHotkeys } from "react-hotkeys-hook";

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const { color, typeTool } = useAppSelector((state) => state.toolbar);
  const ref = useRef(null);

  const [isShowPalette, setShowPalette] = useState<Boolean>(false);

  const handlerClickInstrument = (instrument: Instrument) => {
    dispatch(setTypeTool(instrument));
  };

  const handlerClickColor = () => {
    setShowPalette(!isShowPalette);
  };

  useOnClickOutside(ref, () => {
    setShowPalette(false);
  });

  useHotkeys('B', () => handlerClickInstrument(Instrument.brush));
  useHotkeys('E', () => handlerClickInstrument(Instrument.eraser));
  useHotkeys('L', () => handlerClickInstrument(Instrument.line));
  useHotkeys('R', () => handlerClickInstrument(Instrument.rectangle));
  useHotkeys('C', () => handlerClickInstrument(Instrument.ellipse));
  useHotkeys('P', handlerClickColor);

  return (
    <div ref={ref}>
      <Card shadow="sm" padding="sm" radius="md" className="toolbar">
        <div title="hotkey: B">
          <IconButton
            onClick={() => handlerClickInstrument(Instrument.brush)}
            icon={<IconBrush size="1rem" color="black" />}
            variant={typeTool === Instrument.brush ? "light" : "subtle"}
          />
        </div>
        <div title="hotkey: E">
          <IconButton
            onClick={() => handlerClickInstrument(Instrument.eraser)}
            icon={<IconEraser size="1rem" color="black" />}
            variant={typeTool === Instrument.eraser ? "light" : "subtle"}
          />
        </div>
        <div title="hotkey: L">
          <IconButton
            onClick={() => handlerClickInstrument(Instrument.line)}
            icon={<IconBackslash size="1rem" color="black" />}
            variant={typeTool === Instrument.line ? "light" : "subtle"}
          />
        </div>
        <div title="hotkey: R">
          <IconButton
            onClick={() => handlerClickInstrument(Instrument.rectangle)}
            icon={<IconSquare size="1rem" color="black" />}
            variant={typeTool === Instrument.rectangle ? "light" : "subtle"}
          />
        </div>
        <div title="hotkey: C">
          <IconButton
            onClick={() => handlerClickInstrument(Instrument.ellipse)}
            icon={<IconCircle size="1rem" color="black" />}
            variant={typeTool === Instrument.ellipse ? "light" : "subtle"}
          />
        </div>
        <div title="hotkey: P">
          <IconButton
            onClick={handlerClickColor}
            icon={<IconPalette size="1rem" color="black" />}
            variant={isShowPalette ? "light" : "subtle"}
          />
        </div>
      </Card>
      {isShowPalette && (
        <Card shadow="sm" padding="sm" radius="md" className="color-picker">
          <ColorPicker value={color} onChange={(color) => dispatch(setColor(color))} />
        </Card>
      )}
    </div>
  );
};

export default Toolbar;
