import { useParams } from "react-router";
import { Header } from "widgets/Header/ui";
import Toolbar from "widgets/Toolbar/ui";
import { Sidebar } from "widgets/Sidebar/ui";
import { Canvas } from "widgets/Canvas/ui";
import { IProjectCard } from "entities/ProjectCard";
import { useAppSelector } from "app/store/hooks";
import { BottomBar } from "widgets/BottomBar";

const ProjectPage = () => {
  const { id } = useParams();
  const project = useAppSelector((state) =>
    state.projects.projects.find((item: IProjectCard) => item.id === id)
  );

  if (!project) return <>Loading...</>;
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
