import { useParams } from "react-router";
import Toolbar from "widgets/Toolbar/ui";
import { Sidebar } from "widgets/Sidebar";
import { BottomBar } from "widgets/BottomBar";

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <>
      <Toolbar />
      <div>Project {id}</div>
      <Sidebar />
      <BottomBar />
    </>
  );
};

export default ProjectPage;
