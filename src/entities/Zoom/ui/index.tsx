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
    <Card
      display="flex"
      shadow="sm"
      padding="sm"
      radius="md"
      className="bottombar_card"
    >
      <IconButton
        icon={<IconMinus size="1rem" color="black" />}
        variant={"subtle"}
        onClick={() => {
          dispatch(decreaseZoom());
        }}
      />
      <div className="zoom_value_container">{zoomValue}%</div>
      <IconButton
        icon={<IconPlus size="1rem" color="black" />}
        variant={"subtle"}
        onClick={() => {
          dispatch(increaseZoom());
        }}
      />
    </Card>
  );
}
