import { Modal } from "@mantine/core";
import { NewProjectForm } from "shared/ui";
import { createProject } from "widgets/ProjectCardList/model/slice";
import { FormValues } from "shared/ui/NewProjectForm/interfaces";
import { useFirebaseDb } from "shared/hooks";
import { useAppDispatch } from "app/store/hooks.ts";
import { IProjectCard } from "entities/ProjectCard/interfaces";

type CreateProjectType = {
  // children: ReactElement | ReactElement[] | string;
  opened: boolean;
  onClose: () => void;
};

export const CreateProjectModal: React.FC<CreateProjectType> = ({
  opened,
  onClose,
}) => {
  // const [opened, setOpened] = useState(false);
  const { addProject } = useFirebaseDb();
  const dispatch = useAppDispatch();

  const onCreateHandler = (values: FormValues) => {
    const firstLayerId = crypto.randomUUID();
    const payload: IProjectCard = {
      id: crypto.randomUUID(),
      name: values.name,
      width: values.width,
      height: values.height,
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      preview: "",
      layers: {
        [firstLayerId]: {
          id: firstLayerId,
          isVisible: true,
          label: "Новый слой",
          opacity: 100,
          sortOrder: 1,
          url: "",
        },
      },
    };

    dispatch(createProject(payload));
    addProject(payload);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Добавить новый проект"
      centered
      data-testid='create-project-modal'
    >
      <NewProjectForm onCreate={onCreateHandler} />
    </Modal>
  );
};
