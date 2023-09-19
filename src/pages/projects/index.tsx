import { useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "widgets/Header/ui";
import Toolbar from "widgets/Toolbar/ui";
import { Canvas } from "widgets/Canvas/ui";
import { Sidebar } from "widgets/Sidebar/ui";
import { BottomBar } from "widgets/BottomBar";
import { Loader } from "shared/ui";
import { useFirebaseDb } from "shared/hooks";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { IProjectCard } from "entities/ProjectCard/interfaces";
import { setOpenProjectId } from "widgets/ProjectCardList/model/slice";
import { setProjectLayers } from "features/Layers/model/layersThunk";
import { clear as clearHistory } from "features/History/model/slice";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const project = useAppSelector((state) => state.projects.projects).find(
    (item: IProjectCard) => item.id === id,
  );
  const { fetchProjects, loading } = useFirebaseDb();

  useEffect(() => {
    dispatch(clearHistory());
  }, [project?.id]);

  useEffect(() => {
    if (!project) {
      fetchProjects();
    } else {
      dispatch(setOpenProjectId(project.id));
      dispatch(setProjectLayers(project.id))
    }
  }, [project]);

  if (!project || loading) return <Loader />;

  return (
    <>
      <Header />
      <Toolbar />
      <Canvas project={project}></Canvas>
      <Sidebar />
      <BottomBar />
    </>
  );
};

export default ProjectPage;
