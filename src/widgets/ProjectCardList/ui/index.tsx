import { useState } from "react";
import { useAppSelector } from "app/store/hooks.ts";
import { CreateProjectModal } from "features/CreateProjectModal";
import { ProjectCardWidget } from "widgets/ProjectCard/ProjectCardWidget.tsx";
import { Button, Flex, SimpleGrid } from "@mantine/core";

interface ProjectCardListProps {
  open: () => void;
}

export const ProjectCardList = ({ open }: ProjectCardListProps) => {
  const { projects } = useAppSelector((state) => state.projects);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Flex
        py="md"
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <Button onClick={open}>Добавить проект</Button>
        <CreateProjectModal opened={opened} onClose={() => setOpened(false)} />
      </Flex>
      <SimpleGrid cols={3}>
        {projects.map((card) => (
          <ProjectCardWidget key={card.id} project={card} />
        ))}
      </SimpleGrid>
    </>
  );
};
