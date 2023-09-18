import { createStyles, Text, Group, getStylesRef, Flex, ScrollArea } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "app/store/hooks";
import { IHistoryAction, Instrument } from "./types";
import { toggleCanceledAction } from "../model/slice";
import {
  IconCircle,
  IconEraser,
  IconLine,
  IconPencil,
  IconSquare,
  TablerIconsProps,
} from "@tabler/icons-react";

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

export function History() {
  const { classes, cx } = useStyles();

  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.history);

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

  const mainActions = history.map((action: IHistoryAction) => {
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
        onClick={() => dispatch(toggleCanceledAction(action))}
      >
        <Group>
          <Icon size={20} stroke={1.5} />
          <span>{action.label}</span>
        </Group>
      </Group>
    );
  });

  return (
    <>
      <Group px="md" mb="xs" position="apart">
        <Text size="xs" weight={500} color="dimmed">
          История
        </Text>
      </Group>
      <ScrollArea m="xs" h={400} type="auto" offsetScrollbars scrollbarSize={8}>
        <Flex mb="xs" justify="center" align="flex-start" direction="column" wrap="wrap">
          {mainActions}
        </Flex>
      </ScrollArea>
    </>
  );
}
