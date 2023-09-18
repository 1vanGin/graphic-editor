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
import { Instrument } from "features/History/ui/types";
import { useOnClickOutside } from 'usehooks-ts'

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

  return (
    <div ref={ref}>
      <Card shadow="sm" padding="sm" radius="md" className="toolbar">
        <IconButton
          onClick={() => handlerClickInstrument(Instrument.brush)}
          icon={<IconBrush size="1rem" color="black" />}
          variant={typeTool === Instrument.brush ? "light" : "subtle"}
        />
        <IconButton
          onClick={() => handlerClickInstrument(Instrument.eraser)}
          icon={<IconEraser size="1rem" color="black" />}
          variant={typeTool === Instrument.eraser ? "light" : "subtle"}
        />
        <IconButton
          onClick={() => handlerClickInstrument(Instrument.line)}
          icon={<IconBackslash size="1rem" color="black" />}
          variant={typeTool === Instrument.line ? "light" : "subtle"}
        />
        <IconButton
          onClick={() => handlerClickInstrument(Instrument.rectangle)}
          icon={<IconSquare size="1rem" color="black" />}
          variant={typeTool === Instrument.rectangle ? "light" : "subtle"}
        />
        <IconButton
          onClick={() => handlerClickInstrument(Instrument.ellipse)}
          icon={<IconCircle size="1rem" color="black" />}
          variant={typeTool === Instrument.ellipse ? "light" : "subtle"}
        />
        <IconButton
          onClick={handlerClickColor}
          icon={<IconPalette size="1rem" color="black" />}
          variant={isShowPalette ? "light" : "subtle"}
        />
      </Card>
      {isShowPalette && (
        <Card shadow="sm" padding="sm" radius="md" className="color-picker">
          <ColorPicker
            value={color}
            onChange={(color) => dispatch(setColor(color))}
          />
        </Card>
      )}
    </div>
  );
};

export default Toolbar;
