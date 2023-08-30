import { Box, Button, Group, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues } from "../interfaces";

type NewProjectFormType = {
    onCreate?: Function;
};

export const NewProjectForm: React.FC<NewProjectFormType> = ({ onCreate }) => {
    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            height: 500,
            width: 500,
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : "Invalid name"),
            height: (value) => (value > 0 ? null : "Invalid height"),
            width: (value) => (value > 0 ? null : "Invalid width"),
        },
    });

    const onSubmitHandler = (values: FormValues) => {
        if (typeof onCreate === "function") {
            onCreate(values);
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
                <NumberInput
                    label="Width"
                    placeholder="0"
                    min={1}
                    {...form.getInputProps("height")}
                />
                <NumberInput
                    label="Height"
                    placeholder="0"
                    min={1}
                    {...form.getInputProps("width")}
                />

                <Group position="center" mt="xl">
                    <Button variant="outline" type="submit">
                        Create
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
