import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import {
  DeleteItemMenuComponent,
  DownloadItemMenuComponent,
  OpenItemMenuComponent,
  RenameItemMenuComponent,
} from "entities/ContextMenu";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "widgets/ProjectCardList/model/slice.ts";
import { useAppDispatch } from "app/store/hooks.ts";
import { useFirebaseDb } from "shared/hooks";

interface ContextMenuFeatureProps {
  projectId: string;
}

export const ContextMenuFeature = ({ projectId }: ContextMenuFeatureProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteProjectFromDB } = useFirebaseDb();

  const downloadHandler = () => {};
  const renameHandler = () => {};

  const deleteProjectHandle = () => {
    dispatch(deleteProject(projectId));
    deleteProjectFromDB(projectId);
  };

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <OpenItemMenuComponent
          onClick={() => navigate(`/projects/${projectId}`)}
        />
        <DownloadItemMenuComponent onClick={downloadHandler} />
        <RenameItemMenuComponent onClick={renameHandler} />
        <DeleteItemMenuComponent onClick={deleteProjectHandle} />
      </Menu.Dropdown>
    </Menu>
  );
};
