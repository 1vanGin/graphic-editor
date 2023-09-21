import { useContext } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import {
  DeleteItemMenuComponent,
  DownloadItemMenuComponent,
  OpenItemMenuComponent,
  RenameItemMenuComponent,
} from "entities/ContextMenu";
import { useNavigate } from "react-router-dom";
import { setOpenProjectId } from "widgets/ProjectCardList/model/slice.ts";
import { useAppDispatch } from "app/store/hooks.ts";
import { useFirebaseStorage } from "shared/hooks";
import { setProjectLayers } from "features/Layers/model/layersThunk";
import { ActiveCardContext, IActiveCardContext } from "app/context";

interface ContextMenuFeatureProps {
  projectId: string;
}

export const ContextMenuFeature = ({ projectId }: ContextMenuFeatureProps) => {
  const navigate = useNavigate();

  const { setActiveCardId, setOpenedRenameModal, setOpenedDeleteModal } =
    useContext(ActiveCardContext) as IActiveCardContext;

  const dispatch = useAppDispatch();
  const { downloadFile } = useFirebaseStorage();

  const downloadHandler = () => {
    downloadFile(projectId, "preview.png");
  };

  const openProjectHandler = () => {
    navigate(`/projects/${projectId}`);
    dispatch(setOpenProjectId(projectId));
    dispatch(setProjectLayers(projectId));
  };

  return (
    <>
      <Menu withinPortal position="bottom-end" shadow="sm">
        <Menu.Target>
          <ActionIcon onClick={() => setActiveCardId(projectId)}>
            <IconDots size="1rem" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <OpenItemMenuComponent onClick={openProjectHandler} />
          <DownloadItemMenuComponent onClick={downloadHandler} />
          <RenameItemMenuComponent onClick={() => setOpenedRenameModal(true)} />
          <DeleteItemMenuComponent onClick={() => setOpenedDeleteModal(true)} />
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
