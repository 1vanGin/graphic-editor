import { Button, Modal } from "@mantine/core";
import { ReactElement, useState } from "react";
import { NewProjectForm } from "shared/NewProjectForm";
import { createProject } from "widgets/ProjectCardList/model/slice";
import { FormValues, ProjectProp } from "shared/NewProjectForm/interfaces";
import { useFirebaseDb } from "../../../shared/hooks";
import { useAppDispatch } from "../../../app/store/hooks.ts";

type CreateProjectType = {
  children: ReactElement | ReactElement[] | string;
};

export const CreateProject: React.FC<CreateProjectType> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const { addProject } = useFirebaseDb();
  const dispatch = useAppDispatch();

  const onCreateHandler = (values: FormValues) => {
    const payload: ProjectProp = {
      id: crypto.randomUUID(),
      name: values.name,
      width: values.width,
      height: values.height,
      preview: "",
    };

    dispatch(createProject(payload));
    addProject(payload);
    setOpened(false);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>{children}</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add new project"
        centered
      >
        <NewProjectForm onCreate={onCreateHandler} />
      </Modal>
    </>
  );
};
