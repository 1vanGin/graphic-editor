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
  rem,
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
// import { ReactElement } from "react";

import { useListState } from "@mantine/hooks";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
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
  const handleEditableTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeLayerLabel({
        id: event.currentTarget.id,
        newLabel: event.currentTarget.value,
      })
    );
  };

  const addHandler = () => {
    const generatedId = String(new Date());
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
  // const dragStartHandler = (layer: ILayer) => {
  //   dispatch(dragLayer(layer));
  //   console.log("dragStartHandler");
  // };

  // const dragEndHandler = (event: any) => {
  //   event.target.style.border = "none";
  //   console.log("dragEndHandler");
  // };

  // const dragOverHandler = (event: any) => {
  //   event.preventDefault();
  //   event.target.style.border = "0.0625rem solid #dee2e6";
  //   console.log("dragOverHandler");
  // };

  // const dropHandler = (event: any, layer: ILayer) => {
  //   event.preventDefault();
  //   dispatch(setLayersOrder(layer));
  //   event.target.style.border = "none";
  //   dispatch(dragLayer(null));
  //   console.log("dropHandler");
  // };

  const sortLayers = (a: ILayer, b: ILayer) => {
    if (a.sortOrder > b.sortOrder) {
      return 1;
    } else {
      return -1;
    }
  };

  const mainLayers = state.map((layer, index) => (
    <Draggable key={layer.id} index={index} draggableId={layer.id}>
      {(provided, snapshot) => {
        console.log(provided);
        console.log(snapshot);
        debugger;
        return (
          <div
            className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Group
              position="apart"
              fz="xs"
              // fw="500"
              p="xs"
              w="100%"
              className={cx(classes.layer, {
                [classes.layerActive]: layer.id === active?.id,
              })}
              onClick={() => dispatch(setActiveLayer(layer))}
              // onDragStart={() => dragStartHandler(layer)}
              // onDragLeave={(event) => dragEndHandler(event)}
              // onDragEnd={(event) => dragEndHandler(event)}
              // onDragOver={(event) => dragOverHandler(event)}
              // onDrag={(event) => dropHandler(event, layer)}
            >
              <Group>
                <IconLayersSubtract size={20} stroke={1.5} />
                <EditableText
                  id={layer.id}
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
          </div>
          // <div
          //   className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          //   {...provided.draggableProps}
          //   {...provided.dragHandleProps}
          //   ref={provided.innerRef}
          // >
          //   {/* <Text className={classes.symbol}>{layer.symbol}</Text> */}
          //   <div>
          //     <Text>{layer.label}</Text>
          //   </div>
          // </div>
        );
      }}
    </Draggable>
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

      <Flex px="xs" mb="xs" justify="center" align="flex-start" direction="column" wrap="wrap">
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            handlers.reorder({ from: source.index, to: destination?.index || 0 })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {mainLayers}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
    </>
  );
}
