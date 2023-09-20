import React, { useEffect } from "react";
import { IProjectCard } from "entities/ProjectCard/interfaces";
import { useFirebaseStorage } from "shared/hooks";
import { ContextMenuFeature } from "features";
import { ProjectCardComponent, RenameProjectModal } from "entities/ProjectCard";

type ProjectCardType = {
  project: IProjectCard;
};

export const ProjectCardWidget: React.FC<ProjectCardType> = ({ project }) => {
  const { getImageLink, imageLink } = useFirebaseStorage();

  useEffect(() => {
    if (project?.id && project?.name && project?.preview)
      getImageLink(project.id, "preview");
  }, []);

  return (
    <>
      <ProjectCardComponent
        contextMenu={<ContextMenuFeature projectId={project.id} />}
        project={project}
        imageLink={imageLink}
      />
      <RenameProjectModal project={project} />
    </>
  );
};
