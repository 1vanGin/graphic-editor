import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues } from "../interfaces";
import { IProjectCard } from "entities/ProjectCard";

type EditProjectFormType = {
    project: IProjectCard;
    onSave?: Function;
};

export const EditProjectForm: React.FC<EditProjectFormType> = ({
    project,
    onSave,
}) => {
    const form = useForm<FormValues>({
        initialValues: {
            name: project.name,
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : "Invalid name"),
        },
    });

    const onSubmitHandler = (values: FormValues) => {
        if (typeof onSave === "function") {
            onSave({ ...project, ...values });
        }
    };
    return (
        <Box maw={320} mx="auto">
            <form onSubmit={form.onSubmit(onSubmitHandler)}>
                <TextInput
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps("name")}
                />
                <Group position="center" mt="xl">
                    <Button variant="outline" type="submit">
                        Save
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
