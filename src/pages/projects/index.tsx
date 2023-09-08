import { useParams } from "react-router";
import Toolbar from "widgets/Toolbar/ui";
import { Sidebar } from "widgets/Sidebar/ui";
import { Header } from "widgets/Header/ui";

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Toolbar />
      <div>Project {id}</div>
      <Sidebar />
    </>
  );
};

export default ProjectPage;
