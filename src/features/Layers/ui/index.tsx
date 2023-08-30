import {
  createStyles,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  getStylesRef,
  Flex,
  Space,
} from "@mantine/core";
import {
  IconTrash,
  IconLayersSubtract,
  IconEye,
  IconEyeOff,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { SliderHover } from "shared/SliderHover/ui";

const useStyles = createStyles((theme) => ({
  layer: {
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
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
    <Group
      key={layer.id}
      position="apart"
      fz="xs"
      fw="500"
      p="xs"
      w="100%"
      className={cx(classes.layer, {
        [classes.layerActive]: layer.id === active,
      })}
      onClick={() => setActive(layer.id)}
    >
      <Group>
        <layer.icon size={20} stroke={1.5} />
        <span>{layer.label}</span>
      </Group>
      <div>
        <Tooltip label="Видимость слоя" withArrow position="bottom">
          <UnstyledButton mr="xs" onClick={() => visabilityHandler(layer.id)}>
            {layer.isVisible ? (
              <IconEye size={20} stroke={1.5} />
            ) : (
              <IconEyeOff size={20} stroke={1.5} />
            )}
          </UnstyledButton>
        </Tooltip>
        <Tooltip label="Удалить слой" withArrow position="bottom">
          <UnstyledButton onClick={() => deleteHandler(layer.id)}>
            <IconTrash size={20} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      </div>
    </Group>
  ));

  return (
    <>
      <Group px="md" mb="xs" position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Слои
        </Text>
        <Tooltip label="Создать слой" withArrow position="bottom">
          <ActionIcon variant="default" size={18}>
            <IconPlus size="0.8rem" stroke={1.5} onClick={addHandler} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Space h="sm" />
      <SliderHover />
      <Space h="md" />
      <Flex
        px="xs"
        mb="xs"
        justify="center"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        {mainLayers}
      </Flex>
    </>
  );
}
