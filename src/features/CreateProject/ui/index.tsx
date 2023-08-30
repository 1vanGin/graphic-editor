import { Button, Modal } from "@mantine/core";
import { ReactElement, useState } from "react";
import { NewProjectForm } from "shared/NewProjectForm";
import { store } from "app/store/store";
import { createProject } from "widgets/ProjectCardList/model/slice";
import { FormValues } from "shared/NewProjectForm/interfaces";

type CreateProjectType = {
    children: ReactElement | ReactElement[] | string;
};

export const CreateProject: React.FC<CreateProjectType> = ({ children }) => {
    const [opened, setOpened] = useState(false);

    const onCreatehandler = (values: FormValues) => {
        store.dispatch(
            createProject({
                id: crypto.randomUUID(),
                name: values.name,
                width: values.width,
                height: values.height,
                preview: "",
            })
        );
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
                <NewProjectForm onCreate={onCreatehandler} />
            </Modal>
        </>
    );
};
