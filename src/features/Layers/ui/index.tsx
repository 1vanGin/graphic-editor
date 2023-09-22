import {
  createStyles,
  UnstyledButton,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  getStylesRef,
  Stack,
  rem,
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
  changeLayerOpacity,
} from "../model/slice";
import { ILayer } from "./types";
import { EditableText } from "shared/EditableText";
import { useFirebaseDb } from "shared/hooks";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from "react-beautiful-dnd";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },
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
  const { layers } = useAppSelector((state) => state.layers);
  const [state, handlers] = useListState(layers);
  const active = useAppSelector((state) => state.layers.activeLayer);
  const projectId = useAppSelector((state) => state.projects.openProjectId);
  const { updateProjectLayer, deleteProjectLayer } = useFirebaseDb();

  const handleEditableTextChange = (layer: ILayer, event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.currentTarget.value;
    const layerProps = { ...layer };
    dispatch(
      changeLayerLabel({
        id: event.currentTarget.id,
        newLabel,
      })
    );
    layerProps.label = newLabel;
    updateProjectLayer({
      projectId,
      layer: layerProps,
    });
  };

  const toggleVisibilityHandler = (layer: ILayer) => {
    const layerProps = { ...layer };
    layerProps.isVisible = !layer.isVisible;
    dispatch(toggleVisibility(layerProps));
    updateProjectLayer({
      projectId,
      layer: layerProps,
    });
  };

  const deleteLayerHandler = (layer: ILayer) => {
    dispatch(deleteLayer(layer.id));
    deleteProjectLayer({
      projectId,
      layer,
    });
  };

  const onChangeOpacityLayerHandler = (value: number) => {
    if (active?.id) {
      dispatch(setActiveLayer({ ...active, opacity: value }));

      const layer = layers.find((item) => item.id === active.id);
      if (layer) {
        dispatch(changeLayerOpacity({ id: layer.id, opacity: value }));
        updateProjectLayer({
          projectId,
          layer: { ...layer, opacity: value },
        });
      }
    }
  };

  const onDragEndHandler: OnDragEndResponder = ({ destination, source }) => {
    handlers.reorder({
      from: source.index,
      to: destination?.index || 0,
    });
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
      layer: newLayer,
    });
    dispatch(setActiveLayer(newLayer));
  };

  const mainLayers = state.map((layer, index) => (
    <Draggable key={layer.id} index={index} draggableId={layer.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
            onClick={() => {
              dispatch(setActiveLayer(layer));
            }}
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
                <UnstyledButton
                  mr="xs"
                  data-testid="toggle-visibility-button"
                  onClick={(e) => {
                    toggleVisibilityHandler(layer);
                    e.stopPropagation();
                  }}
                >
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
        </div>
      )}
    </Draggable>
  ));

  useEffect(() => {
    handlers.setState([...layers]);
  }, [layers]);

  useEffect(() => {
    state.forEach((stateLayer, index) => {
      const layer = layers.find((item) => item.id === stateLayer.id);
      if (layer && layer.sortOrder !== index) {
        updateProjectLayer({
          projectId,
          layer: { ...layer, sortOrder: index },
        });
      }
    })
  }, [state]);

  return (
    <>
      <Group pl="md" pr="xl" my="sm" position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Слои
        </Text>
        <Tooltip label="Создать слой" withArrow position="bottom">
          <ActionIcon variant="default" size={18}>
            <IconPlus data-testid="add-new-layer" size="0.8rem" stroke={1.5} onClick={addHandler} />
          </ActionIcon>
        </Tooltip>
      </Group>
      {active && (
        <Stack my="sm" pl="md" pr="xl">
          <SliderHover value={active.opacity} onChange={onChangeOpacityLayerHandler} />
        </Stack>
      )}
      <ScrollArea m="xs" h={400} type="auto" offsetScrollbars scrollbarSize={8}>
        <Stack px="xs" mb="xs">
          <DragDropContext
            onDragEnd={onDragEndHandler}
          >
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <div
                  className="layers_droppable_wrapper"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {mainLayers}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      </ScrollArea>
    </>
  );
}
