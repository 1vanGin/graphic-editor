import { Button, Center, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

interface ProjectCardListEmptyProps {
  open: () => void;
}

export const ProjectCardListEmpty = ({ open }: ProjectCardListEmptyProps) => {
  const { height } = useViewportSize();

  return (
    <Center maw={400} h={height} mx="auto">
      <Flex
        py="md"
        gap="md"
        justify="flex-end"
        align="center"
        direction="column"
        wrap="nowrap"
      >
        <div>Нет проектов</div>
        <div>
          <Button onClick={open}>Добавить первый проект</Button>
        </div>
      </Flex>
    </Center>
  );
};
