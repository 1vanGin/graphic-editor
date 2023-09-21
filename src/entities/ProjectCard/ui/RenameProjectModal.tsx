import { Modal } from "@mantine/core";
import { EditProjectForm } from "shared/EditProjectForm";
import { useFirebaseDb } from "shared/hooks";
import { useAppDispatch, useAppSelector } from "app/store/hooks.ts";
import { updateProject } from "widgets/ProjectCardList/model/slice.ts";

import { IProjectCard } from "../interfaces";

interface RenameProjectModalProps {
  projectId: string;
  opened: boolean;
  onClose: () => void;
}

export const RenameProjectModal = ({
  projectId,
  opened,
  onClose,
}: RenameProjectModalProps) => {
  const { updateProjectName } = useFirebaseDb();
  const dispatch = useAppDispatch();

  const onSaveHandler = (values: IProjectCard) => {
    dispatch(updateProject({ id: values.id, data: values }));
    updateProjectName(values).finally(() => {
      onClose();
    });
  };

  const project = useAppSelector((state) => state.projects.projects).find(
    (item: IProjectCard) => item.id === projectId,
  );

  return (
    <Modal opened={opened} onClose={onClose} title="Обновить проект" centered>
      {project && <EditProjectForm onSave={onSaveHandler} project={project} />}
    </Modal>
  );
};
