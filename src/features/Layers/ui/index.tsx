import {
  createStyles,
  rem,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  getStylesRef,
} from "@mantine/core";
import {
  IconTrash,
  IconLayersSubtract,
  IconEye,
  IconEyeOff,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  layers: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  layer: {
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

  layerInner: {
    display: "flex",
    alignItems: "center",
  },

  layerIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  layerHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  layerActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const defaultLayers = [
  { id: 1, icon: IconLayersSubtract, label: "Слой 1", isVisible: true },
  { id: 2, icon: IconLayersSubtract, label: "Слой 2", isVisible: true },
  { id: 3, icon: IconLayersSubtract, label: "Слой 3", isVisible: false },
];

export function Layers() {
  const { classes, cx } = useStyles();
  const [layers, setLayers] = useState(defaultLayers);
  const [active, setActive] = useState(1);

  const deleteHandler = (id: number) => {
    const filteredLayers = layers.filter((item) => item.id !== id);
    setLayers(filteredLayers);
  };

  const visabilityHandler = (id: number) => {
    const newLayers = layers.map((item) => {
      if (item.id === id) {
        item.isVisible = !item.isVisible;
      }
      return item;
    });
    setLayers(newLayers);
  };

  const addHandler = () => {
    const generatedId = Number(new Date());
    const newLayer = {
      id: generatedId,
      icon: IconLayersSubtract,
      label: "Новый слой",
      isVisible: true,
    };

    setLayers([newLayer, ...layers]);
    setActive(generatedId);
  };

  const mainLayers = layers.map((layer) => (
    <UnstyledButton
      key={layer.id}
      className={cx(classes.layer, {
        [classes.layerActive]: layer.id === active,
      })}
      onClick={() => setActive(layer.id)}
    >
      <div className={classes.layerInner}>
        <layer.icon size={20} className={classes.layerIcon} stroke={1.5} />
        <span>{layer.label}</span>
      </div>
      <div className={classes.layerInner}>
        <UnstyledButton
          className={classes.layer}
          onClick={() => visabilityHandler(layer.id)}
        >
          {layer.isVisible ? (
            <IconEye size={20} className={classes.layerIcon} stroke={1.5} />
          ) : (
            <IconEyeOff size={20} className={classes.layerIcon} stroke={1.5} />
          )}
        </UnstyledButton>
        <UnstyledButton
          className={classes.layer}
          onClick={() => deleteHandler(layer.id)}
        >
          <IconTrash size={20} className={classes.layerIcon} stroke={1.5} />
        </UnstyledButton>
      </div>
    </UnstyledButton>
  ));

  return (
    <>
      <Group className={classes.layerHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Слои
        </Text>
        <Tooltip label="Создать слой" withArrow position="bottom">
          <ActionIcon variant="default" size={18}>
            <IconPlus size="0.8rem" stroke={1.5} onClick={addHandler} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <div className={classes.layers}>{mainLayers}</div>
    </>
  );
}
