import { Modal } from "@mantine/core";
import { EditProjectForm } from "shared/EditProjectForm";
import { useFirebaseDb } from "shared/hooks";
import { useAppDispatch } from "app/store/hooks.ts";
import { updateProject } from "widgets/ProjectCardList/model/slice.ts";

import { IProjectCard } from "../interfaces";
import { useState } from "react";

interface RenameProjectModalProps {
  project: IProjectCard;
}

export const RenameProjectModal = ({ project }: RenameProjectModalProps) => {
  const [opened, setOpened] = useState(false);
  const { updateProjectName } = useFirebaseDb();
  const dispatch = useAppDispatch();

  const onSaveHandler = (values: IProjectCard) => {
    dispatch(updateProject({ id: values.id, data: values }));
    updateProjectName(values).finally(() => {
      setOpened(false);
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Обновить проект"
      centered
    >
      <EditProjectForm onSave={onSaveHandler} project={project} />
    </Modal>
  );
};
