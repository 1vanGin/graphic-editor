import "./index.css";
import { Card, createStyles, rem } from "@mantine/core";
import { History } from "features/History";
import { Layers } from "features/Layers";

const useStyles = createStyles((theme) => ({
  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.lg,
    paddingBottom: "20px",

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },
}));

export function Sidebar() {
  const { classes } = useStyles();

  return (
    <Card className="Sidebar_card">
      <Card.Section className={classes.section}>
        <Layers />
      </Card.Section>

      <Card.Section className={classes.section}>
        <History />
      </Card.Section>
    </Card>
  );
}
