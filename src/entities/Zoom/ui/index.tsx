import "./index.css";
import { Card } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import IconButton from "shared/IconButton/ui";
import { decreaseZoom, increaseZoom } from "../model/slice";

export function Zoom() {
  const dispatch = useAppDispatch();
  const zoomValue = useAppSelector((state) => state.zoom.zoomValue);
  return (
    <Card display="flex" shadow="sm" padding="sm" radius="md">
      <div title="hotkey: -">
        <IconButton
          icon={<IconMinus data-testid="decrease-zoom-button" size="1rem" color="black" />}
          variant={"subtle"}
          onClick={() => {
            dispatch(decreaseZoom());
          }}
        />
      </div>
      <div className="zoom_value_container">{zoomValue}%</div>
      <div title="hotkey: =">
        <IconButton
          icon={<IconPlus data-testid="increase-zoom-button" size="1rem" color="black" />}
          variant={"subtle"}
          onClick={() => {
            dispatch(increaseZoom());
          }}
        />
      </div>
    </Card>
  );
}
