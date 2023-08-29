import {
  createStyles,
  rem,
  UnstyledButton,
  Text,
  Group,
  getStylesRef,
} from "@mantine/core";
import { IconCircle, IconPencil, IconLine } from "@tabler/icons-react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  actions: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  action: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  actionInner: {
    display: "flex",
    alignItems: "center",
  },

  actionIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  historyHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  actionActive: {
    "&, &:hover": {
      color: theme.fn.variant({ variant: "light", color: "#F8F8F8" }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: "#F8F8F8" }).color,
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
    <UnstyledButton
      key={action.id}
      className={cx(classes.action, {
        [classes.actionActive]: action.id === active,
      })}
      onClick={() => setActive(action.id)}
    >
      <div className={classes.actionInner}>
        <action.icon size={20} className={classes.actionIcon} stroke={1.5} />
        <span>{action.label}</span>
      </div>
    </UnstyledButton>
  ));

  return (
    <>
      <Group className={classes.historyHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          История
        </Text>
      </Group>
      <div className={classes.actions}>{mainActions}</div>
    </>
  );
}
