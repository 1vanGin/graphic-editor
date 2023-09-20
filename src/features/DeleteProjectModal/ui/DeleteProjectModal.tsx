import { Modal } from "@mantine/core";

interface DeleteProjectModalProps {
  opened: boolean;
  onClose: () => void;
}
export const DeleteProjectModal = ({
  opened,
  onClose,
}: DeleteProjectModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Вы действительно хотите удалить проект?"
      centered
    ></Modal>
  );
};
