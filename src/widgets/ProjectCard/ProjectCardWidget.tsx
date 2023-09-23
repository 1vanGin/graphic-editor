import React from "react";
import { IProjectCard } from "entities/ProjectCard/interfaces";
import { ContextMenuFeature } from "features";
import { ProjectCardComponent } from "entities/ProjectCard";

type ProjectCardType = {
  project: IProjectCard;
};

export const ProjectCardWidget: React.FC<ProjectCardType> = ({ project }) => {
  return (
    <>
      <ProjectCardComponent
        contextMenu={<ContextMenuFeature projectId={project.id} />}
        project={project}
      />
    </>
  );
};
