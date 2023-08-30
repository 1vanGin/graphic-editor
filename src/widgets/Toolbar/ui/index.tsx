import React, { useState } from "react";
import {
  IconBrush,
  IconEraser,
  IconBackslash,
  IconSquare,
  IconPalette,
} from "@tabler/icons-react";
import IconButton from "shared/IconButton/ui";
import { Card, ColorPicker } from "@mantine/core";
import { typeButttonClick } from "../interfaces";
import "./index.css";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { setColor, setTypeTool } from "../model/slice";

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const { color } = useAppSelector((state) => state.toolbar);
  const [focusButton, setFocusButton] = useState<typeButttonClick>(null);

  const hundlerClickBrush = (event: React.MouseEvent<HTMLElement>) => {
    if (focusButton === "brush") {
      setFocusButton(null);
      dispatch(setTypeTool(null));
    } else {
      setFocusButton("brush");
      dispatch(setTypeTool("brush"));
    }
  };

  const hundlerClickEraser = (event: React.MouseEvent<HTMLElement>) => {
    if (focusButton === "eraser") {
      setFocusButton(null);
      dispatch(setTypeTool(null));
    } else {
      setFocusButton("eraser");
      dispatch(setTypeTool("eraser"));
    }
  };

  const hundlerClickLine = (event: React.MouseEvent<HTMLElement>) => {
    if (focusButton === "line") {
      setFocusButton(null);
      dispatch(setTypeTool(null));
    } else {
      setFocusButton("line");
      dispatch(setTypeTool("line"));
    }
  };

  const hundlerClickFigure = (event: React.MouseEvent<HTMLElement>) => {
    if (focusButton === "figure") {
      setFocusButton(null);
      dispatch(setTypeTool(null));
    } else {
      setFocusButton("figure");
      dispatch(setTypeTool("figure"));
    }
  };

  const hundlerClickColor = (event: React.MouseEvent<HTMLElement>) => {
    if (focusButton === "color") {
      setFocusButton(null);
    } else {
      setFocusButton("color");
    }
  };

  return (
    <div className="">
      <Card shadow="sm" padding="sm" radius="md" className="toolbar">
        <IconButton
          onClick={hundlerClickBrush}
          icon={<IconBrush size="1rem" color="black" />}
          variant={focusButton === "brush" ? "light" : "subtle"}
        />
        <IconButton
          onClick={hundlerClickEraser}
          icon={<IconEraser size="1rem" color="black" />}
          variant={focusButton === "eraser" ? "light" : "subtle"}
        />
        <IconButton
          onClick={hundlerClickLine}
          icon={<IconBackslash size="1rem" color="black" />}
          variant={focusButton === "line" ? "light" : "subtle"}
        />
        <IconButton
          onClick={hundlerClickFigure}
          icon={<IconSquare size="1rem" color="black" />}
          variant={focusButton === "figure" ? "light" : "subtle"}
        />
        <IconButton
          onClick={hundlerClickColor}
          icon={<IconPalette size="1rem" color="black" />}
          variant={focusButton === "color" ? "light" : "subtle"}
        />
      </Card>
      {focusButton === "color" && (
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
