import { createStyles, Text, Group, getStylesRef, Flex } from "@mantine/core";
import { IconCircle, IconPencil, IconLine } from "@tabler/icons-react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  action: {
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

const actions = [
  { id: 1, icon: IconCircle, label: "Действие 3" },
  { id: 2, icon: IconPencil, label: "Действие 2" },
  { id: 3, icon: IconLine, label: "Действие 1" },
];

export function History() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(1);

  const mainActions = actions.map((action) => (
    <Group
      key={action.id}
      position="apart"
      fz="xs"
      fw="500"
      p="xs"
      w="100%"
      className={cx(classes.action, {
        [classes.actionActive]: action.id === active,
      })}
      onClick={() => setActive(action.id)}
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
