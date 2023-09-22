import { createStyles, Text, Group, ActionIcon, Tooltip, Stack, ScrollArea } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { SliderHover } from "shared/SliderHover/ui";
import { addLayer, setActiveLayer, changeLayerOpacity } from "../model/slice";

import { useFirebaseDb } from "shared/hooks";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { LayersItem } from "entities/LayersItem";
import { ILayer } from "entities/LayersItem";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

export function Layers() {
  const { classes, cx } = useStyles();

  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((state) => state.layers);
  const [state, handlers] = useListState(layers);
  const active = useAppSelector((state) => state.layers.activeLayer);
  const projectId = useAppSelector((state) => state.projects.openProjectId);
  const { updateProjectLayer } = useFirebaseDb();

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
          <LayersItem layer={layer} />
        </div>
      )}
    </Draggable>
  ));

  useEffect(() => {
    handlers.setState([...layers]);
  }, [layers]);

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
            onDragEnd={({ destination, source }) =>
              handlers.reorder({
                from: source.index,
                to: destination?.index || 0,
              })
            }
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
