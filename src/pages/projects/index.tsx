import { useParams } from "react-router";
import Toolbar from "widgets/Toolbar/ui";

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <>
      <Toolbar />
      <div>Project {id}</div>
    </>
  );
};

export default ProjectPage;
