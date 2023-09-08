import {
  createStyles,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  getStylesRef,
  Flex,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { IconTrash, IconLayersSubtract, IconEye, IconEyeOff, IconPlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { SliderHover } from "shared/SliderHover/ui";
import {
  addLayer,
  deleteLayer,
  setActiveLayer,
  toggleVisability,
  changeLayerLabel,
} from "../model/slice";
import { ILayer } from "./types";
import { EditableText } from "shared/EditableText";

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
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      },
    },
  },
}));

export function Layers() {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const layers = useAppSelector((state) => state.layers.layers);
  const active = useAppSelector((state) => state.layers.activeLayer);

  const handleEditableTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeLayerLabel({
        id: +event.currentTarget.id,
        newLabel: event.currentTarget.value,
      })
    );
  };

  const addHandler = () => {
    const generatedId = Number(new Date());
    const newLayer: ILayer = {
      id: generatedId,
      icon: IconLayersSubtract,
      label: "Новый слой",
      isVisible: true,
      opacity: 100,
      url: "",
      sortOrder: 0,
      // body: [],
    };

    dispatch(addLayer(newLayer));
    dispatch(setActiveLayer(newLayer));
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
        [classes.layerActive]: layer.id === active?.id,
      })}
      onClick={() => dispatch(setActiveLayer(layer))}
    >
      <Group>
        <layer.icon size={20} stroke={1.5} />
        <EditableText
          id={`${layer.id}`}
          text={layer.label}
          handleChange={handleEditableTextChange}
        />
      </Group>
      <div>
        <Tooltip label="Видимость слоя" withArrow position="bottom">
          <UnstyledButton mr="xs" onClick={() => dispatch(toggleVisability(layer))}>
            {layer.isVisible ? (
              <IconEye size={20} stroke={1.5} />
            ) : (
              <IconEyeOff size={20} stroke={1.5} />
            )}
          </UnstyledButton>
        </Tooltip>
        <Tooltip label="Удалить слой" withArrow position="bottom">
          <UnstyledButton onClick={() => dispatch(deleteLayer(layer.id))}>
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
      {active && (
        <Stack my="sm" px="sm">
          <SliderHover />
        </Stack>
      )}
      <ScrollArea m="xs" h={400} type="auto" offsetScrollbars scrollbarSize={8}>
        <Flex px="xs" mb="xs" justify="center" align="flex-start" direction="column" wrap="wrap">
          {mainLayers}
        </Flex>
      </ScrollArea>
    </>
  );
}
