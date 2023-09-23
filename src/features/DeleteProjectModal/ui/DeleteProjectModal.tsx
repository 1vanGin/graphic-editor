import { Group, Modal, Button } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { deleteProject } from "widgets/ProjectCardList/model/slice.ts";
import { useAppDispatch } from "app/store/hooks.ts";
import { useFirebaseDb } from "shared/hooks";
import { useNavigate } from "react-router-dom";

interface DeleteProjectModalProps {
  projectId: string;
  opened: boolean;
  onClose: () => void;
}
export const DeleteProjectModal = ({
  projectId,
  opened,
  onClose,
}: DeleteProjectModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { deleteProjectFromDB } = useFirebaseDb();
  const deleteProjectHandle = () => {
    if (projectId) {
      dispatch(deleteProject(projectId));
      deleteProjectFromDB(projectId);
      navigate(`/`)
      onClose()
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Вы действительно хотите удалить проект?"
      centered
    >
      <Group position="center">
        <Button
          size="md"
          variant="outline"
          color="teal"
          leftIcon={<IconCheck size="0.9rem" />}
          onClick={deleteProjectHandle}
        >
          Да
        </Button>
        <Button
          size="md"
          variant="outline"
          color="red"
          leftIcon={<IconX size="0.9rem" />}
          onClick={onClose}
        >
          Нет
        </Button>
      </Group>
    </Modal>
  );
};
