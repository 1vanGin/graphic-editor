import { createStyles, UnstyledButton, Group, Tooltip, getStylesRef, rem } from "@mantine/core";
import { ILayer, ILayersItemProps } from "../interface";
import { EditableText } from "shared/EditableText";
import { IconTrash, IconLayersSubtract, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
  changeLayerLabel,
  deleteLayer,
  setActiveLayer,
  toggleVisibility,
} from "features/Layers/model/slice";
import { useFirebaseDb, useFirebaseStorage } from "shared/hooks";

const useStyles = createStyles((theme) => ({
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

export function LayersItem({ layer }: ILayersItemProps) {
  const { classes, cx } = useStyles();
  const active = useAppSelector((state) => state.layers.activeLayer);
  const projectId = useAppSelector((state) => state.projects.openProjectId);
  const dispatch = useAppDispatch();
  const { updateProjectLayer, deleteProjectLayer } = useFirebaseDb();
  const { deleteFile } = useFirebaseStorage();

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
    deleteFile(
      projectId,
      layer.id,
    );
  };

  return (
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
  );
}
