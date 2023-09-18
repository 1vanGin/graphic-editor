import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import {
  DeleteItemMenuComponent,
  DownloadItemMenuComponent,
  OpenItemMenuComponent,
  RenameItemMenuComponent,
} from "entities/ContextMenu";
import { useNavigate } from "react-router-dom";
import { deleteProject, setOpenProjectId } from "widgets/ProjectCardList/model/slice.ts";
import { useAppDispatch } from "app/store/hooks.ts";
import { useFirebaseDb } from "shared/hooks";
import { setProjectLayers } from "features/Layers/model/layersThunk";

interface ContextMenuFeatureProps {
  projectId: string;
}

export const ContextMenuFeature = ({ projectId }: ContextMenuFeatureProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteProjectFromDB } = useFirebaseDb();

  const downloadHandler = () => { };
  const renameHandler = () => { };

  const deleteProjectHandle = () => {
    dispatch(deleteProject(projectId));
    deleteProjectFromDB(projectId);
  };

  const openProjectHandler = () => {
    navigate(`/projects/${projectId}`)
    dispatch(setOpenProjectId(projectId))
    dispatch(setProjectLayers(projectId))
  }

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <OpenItemMenuComponent
          onClick={openProjectHandler}
        />
        <DownloadItemMenuComponent onClick={downloadHandler} />
        <RenameItemMenuComponent onClick={renameHandler} />
        <DeleteItemMenuComponent onClick={deleteProjectHandle} />
      </Menu.Dropdown>
    </Menu>
  );
};
