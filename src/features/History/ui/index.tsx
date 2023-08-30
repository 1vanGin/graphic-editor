import { createStyles, Text, Group, getStylesRef, Flex } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "app/store/hooks";
import { IHistoryAction } from "./types";
import { toggleCanceledAction } from "../model/slice";

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

  const mainActions = history.map((action: IHistoryAction) => (
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
        <action.icon size={20} stroke={1.5} />
        <span>{action.label}</span>
      </Group>
    </Group>
  ));

  return (
    <>
      <Group px="md" mb="xs" position="apart">
        <Text size="xs" weight={500} color="dimmed">
          История
        </Text>
      </Group>
      <Flex
        px="xs"
        mb="xs"
        justify="center"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        {mainActions}
      </Flex>
    </>
  );
}
