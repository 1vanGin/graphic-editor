import { useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "widgets/Header/ui";
import Toolbar from "widgets/Toolbar/ui";
import { Canvas } from "widgets/Canvas/ui";
import { Sidebar } from "widgets/Sidebar/ui";
import { BottomBar } from "widgets/BottomBar";
import { Loader } from "shared/ui";
import { useFirebaseDb } from "shared/hooks";
import { useAppSelector } from "app/store/hooks";
import { IProjectCard } from "entities/ProjectCard/interfaces";

const ProjectPage = () => {
  const { id } = useParams();
  const project = useAppSelector((state) => state.projects.projects).find(
    (item: IProjectCard) => item.id === id,
  );
  const { fetchProjects, loading } = useFirebaseDb();

  useEffect(() => {
    if (!project) fetchProjects();
  }, [project]);

  if (!project || loading) return <Loader />;

  return (
    <>
        <Header />
      <Toolbar />
      <Canvas width={project.width} height={project.height}></Canvas>
      <Sidebar />
        <BottomBar />
    </>
  );
};

export default ProjectPage;
