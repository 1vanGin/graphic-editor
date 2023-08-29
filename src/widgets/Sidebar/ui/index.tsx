import "./index.css";
import {
  createStyles,
  Navbar,
  rem,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconTrash,
  IconLayersSubtract,
  IconEye,
  IconEyeOff,
  IconPlus,
} from "@tabler/icons-react";
import { History } from "../../../features/History/ui";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    borderLeft: "0.0625rem solid #e9ecef",
    borderRight: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.lg,
    paddingBottom: "100px",

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
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

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  sectionHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },
}));

const layers = [
  { icon: IconLayersSubtract, label: "Слой 1", isVisible: true },
  { icon: IconLayersSubtract, label: "Слой 2", isVisible: true },
  { icon: IconLayersSubtract, label: "Слой 3", isVisible: false },
];

export function Sidebar() {
  const { classes } = useStyles();

  const mainLayers = layers.map((layer) => (
    <UnstyledButton key={layer.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <layer.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{layer.label}</span>
      </div>
      <div className={classes.mainLinkInner}>
        {layer.isVisible ? (
          <IconEye size={20} className={classes.mainLinkIcon} stroke={1.5} />
        ) : (
          <IconEyeOff size={20} className={classes.mainLinkIcon} stroke={1.5} />
        )}

        <IconTrash size={20} className={classes.mainLinkIcon} stroke={1.5} />
      </div>
    </UnstyledButton>
  ));

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      fixed={true}
      position={{ right: 0, top: 0 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.section}>
        <Group className={classes.sectionHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Слои
          </Text>
          <Tooltip label="Создать слой" withArrow position="bottom">
            <ActionIcon variant="default" size={18}>
              <IconPlus size="0.8rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.mainLinks}>{mainLayers}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <History />
      </Navbar.Section>
    </Navbar>
  );
}
