import "./index.css";
import { createStyles, Navbar, rem } from "@mantine/core";
import { History } from "features/History/ui";
import { Layers } from "features/Layers/ui";

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
}));

export function Sidebar() {
  const { classes } = useStyles();

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
        <Layers />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <History />
      </Navbar.Section>
    </Navbar>
  );
}
