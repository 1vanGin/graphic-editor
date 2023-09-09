import { useAppSelector } from "app/store/hooks.ts";
import { CreateProject } from "features/CreateProject";
import { ProjectCardWidget } from "widgets/ProjectCard/ProjectCardWidget.tsx";
import { Center, Flex, SimpleGrid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useFirebaseDb } from "shared/hooks";
import { Loader } from "shared/ui";
import { useLayoutEffect } from "react";

export const ProjectCardList = () => {
  const { fetchProjects, loading } = useFirebaseDb();
  const { projects } = useAppSelector((state) => state.projects);
  const { height } = useViewportSize();

  useLayoutEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {projects.length > 0 && (
        <>
          <Flex
            py="md"
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="nowrap"
          >
            <CreateProject>Добавить проект</CreateProject>
          </Flex>
          <SimpleGrid cols={3}>
            {projects.map((card) => (
              <ProjectCardWidget key={card.id as React.Key} project={card} />
            ))}
          </SimpleGrid>
        </>
      )}

      {projects.length === 0 && (
        <>
          <Center maw={400} h={height} mx="auto">
            <Flex
              py="md"
              gap="md"
              justify="flex-end"
              align="center"
              direction="column"
              wrap="nowrap"
            >
              <div>No projects</div>
              <div>
                <CreateProject>Добавить первый проект</CreateProject>
              </div>
            </Flex>
          </Center>
        </>
      )}
    </>
  );
};
