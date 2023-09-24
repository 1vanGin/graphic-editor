import {
  Card as MantineCard,
  Group as MantineGroup,
  Text as MantineText,
  Center,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { IProjectCard } from "../interfaces";

interface ProjectCardComponentProps {
  contextMenu: ReactNode;
  project: IProjectCard;
}

export const ProjectCardComponent = ({
  contextMenu,
  project,
}: ProjectCardComponentProps) => {
  return (
    <MantineCard withBorder shadow="sm" radius="md" data-testid='project-card'>
      <MantineCard.Section withBorder inheritPadding py="xs">
        <MantineGroup position="apart">
          <Link to={`/projects/${project.id}`}>
            <MantineText weight={500}>{project.name}</MantineText>
          </Link>

          {contextMenu}
        </MantineGroup>
      </MantineCard.Section>

      <Link to={`/projects/${project.id}`}>
        <MantineCard.Section mih={300}>
          {project.preview ? (
            <Image src={project.preview} height={300} />
          ) : (
            <Center maw={400} h={300} mx="auto">
              <div>Начните рисовать для превью</div>
            </Center>
          )}
        </MantineCard.Section>
      </Link>
    </MantineCard>
  );
};
