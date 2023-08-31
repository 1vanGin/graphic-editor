import "./index.css";
import { Card } from "@mantine/core";
import { IconBrush, IconEraser } from "@tabler/icons-react";
import IconButton from "shared/IconButton/ui";

export function BottomBar() {
  return (
    <Card
      display="flex"
      shadow="sm"
      padding="sm"
      radius="md"
      className="bottombar_card"
    >
      <IconButton
        icon={<IconBrush size="1rem" color="black" />}
        variant={"subtle"}
      />
      <IconButton
        icon={<IconEraser size="1rem" color="black" />}
        variant={"subtle"}
      />
    </Card>
  );
}
