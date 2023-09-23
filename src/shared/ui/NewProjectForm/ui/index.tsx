import { Box, Button, Group, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValues } from "../interfaces";

type NewProjectFormType = {
  onCreate?: (values: FormValues) => void;
};

export const NewProjectForm: React.FC<NewProjectFormType> = ({ onCreate }) => {
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      height: 500,
      width: 500,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Неверное имя"),
      height: (value) => (value > 0 ? null : "Неверная высота"),
      width: (value) => (value > 0 ? null : "Неверная ширина"),
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
          label="Название"
          placeholder="Название"
          {...form.getInputProps("name")}
        />
        <NumberInput
          label="Ширина"
          placeholder="0"
          min={1}
          {...form.getInputProps("width")}
        />
        <NumberInput
          label="Высота"
          placeholder="0"
          min={1}
          {...form.getInputProps("height")}
        />

        <Group position="center" mt="xl">
          <Button variant="outline" type="submit">
            Создать
          </Button>
        </Group>
      </form>
    </Box>
  );
};
