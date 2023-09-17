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
  toggleVisibility,
  changeLayerLabel,
} from "../model/slice";
import { ILayer } from "./types";
import { EditableText } from "shared/EditableText";
import { useFirebaseDb } from "shared/hooks";

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
  const projectId = useAppSelector((state) => state.projects.openProjectId)

  const { updateProjectLayer, deleteProjectLayer } = useFirebaseDb();

  const handleEditableTextChange = (layer: ILayer, event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.currentTarget.value
    const layerProps = { ...layer }
    dispatch(
      changeLayerLabel({
        id: event.currentTarget.id,
        newLabel,
      })
    );
    layerProps.label = newLabel
    updateProjectLayer({
      projectId,
      layer: layerProps
    })
  };

  const toggleVisibilityHandler = (layer: ILayer) => {
    const layerProps = { ...layer }
    layerProps.isVisible = !layer.isVisible
    dispatch(toggleVisibility(layerProps))
    updateProjectLayer({
      projectId,
      layer: layerProps
    })
  }

  const deleteLayerHandler = (layer: ILayer) => {
    dispatch(deleteLayer(layer.id))
    deleteProjectLayer({
      projectId,
      layer
    })
  }

  const addHandler = () => {
    const newLayer: ILayer = {
      id: crypto.randomUUID(),
      label: "Новый слой",
      isVisible: true,
      opacity: 100,
      url: "",
      sortOrder: 0,
    };

    dispatch(addLayer(newLayer));
    updateProjectLayer({
      projectId,
      layer: newLayer
    })
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
        <IconLayersSubtract size={20} stroke={1.5} />
        <EditableText
          id={`${layer.id}`}
          text={layer.label}
          handleChange={(event) => handleEditableTextChange(layer, event)}
        />
      </Group>
      <div>
        <Tooltip label="Видимость слоя" withArrow position="bottom">
          <UnstyledButton mr="xs" onClick={() => toggleVisibilityHandler(layer)}>
            {layer.isVisible ? (
              <IconEye size={20} stroke={1.5} />
            ) : (
              <IconEyeOff size={20} stroke={1.5} />
            )}
          </UnstyledButton>
        </Tooltip>
        <Tooltip label="Удалить слой" withArrow position="bottom">
          <UnstyledButton onClick={() => deleteLayerHandler(layer)}>
            <IconTrash size={20} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      </div>
    </Group>
  ));

  return (
    <>
      <Group pl="md" pr="xl" my="sm" position="apart">
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
        <Stack my="sm" pl="md" pr="xl">
          <SliderHover />
        </Stack>
      )}
      <ScrollArea m="xs" h={400} type="auto" offsetScrollbars scrollbarSize={8}>
        <Flex mb="xs" justify="center" align="flex-start" direction="column" wrap="wrap">
          {mainLayers}
        </Flex>
      </ScrollArea>
    </>
  );
}
