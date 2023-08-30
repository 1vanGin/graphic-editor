import { useAppSelector } from "app/store/hooks.ts";
import { CreateProject } from "features/CreateProject";
import { ProjectCard } from "entities/ProjectCard/ui";
import { Center, Flex, SimpleGrid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export const ProjectCardList = () => {
    const { projects } = useAppSelector((state) => state.projects);
    const { height } = useViewportSize();
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
                        <CreateProject>Add project</CreateProject>
                    </Flex>
                    <SimpleGrid cols={3}>
                        {projects.map((card) => (
                            <ProjectCard
                                key={card.id as React.Key}
                                project={card}
                            />
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
                                <CreateProject>Add first project</CreateProject>
                            </div>
                        </Flex>
                    </Center>
                </>
            )}
        </>
    );
};
