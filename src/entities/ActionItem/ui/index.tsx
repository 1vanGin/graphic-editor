import { IActionItemProps, Instrument } from "../interface";
import {
  IconCircle,
  IconEraser,
  IconLine,
  IconPencil,
  IconSquare,
  TablerIconsProps,
} from "@tabler/icons-react";
import { Group, getStylesRef, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  action: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  actionActive: {
    "&, &:hover": {
      color: "#a0a0a0",
      [`& .${getStylesRef("icon")}`]: {
        color: "#a0a0a0",
      },
    },
  },
}));

export function ActionItem({ action, onClickAction }: IActionItemProps) {
  const { classes, cx } = useStyles();

  type InstrumentIconType = (props: TablerIconsProps) => JSX.Element;

  const getInstrumentIcon = (instrument: Instrument): InstrumentIconType => {
    switch (instrument) {
      case Instrument.line:
        return IconLine;
      case Instrument.ellipse:
        return IconCircle;
      case Instrument.brush:
        return IconPencil;
      case Instrument.rectangle:
        return IconSquare;
      case Instrument.eraser:
        return IconEraser;
      default:
        return IconPencil;
    }
  };

  const Icon = getInstrumentIcon(action.instrument);
  return (
    <Group
      key={action.id}
      position="apart"
      fz="xs"
      fw="500"
      p="xs"
      w="100%"
      className={cx(classes.action, {
        [classes.actionActive]: action.isCancel,
      })}
      onClick={() => onClickAction(action)}
    >
      <Group>
        <Icon size={20} stroke={1.5} />
        <span>{action.label}</span>
      </Group>
    </Group>
  );
}
