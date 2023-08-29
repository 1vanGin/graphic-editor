import { useParams } from "react-router";
import { Sidebar } from "widgets/Sidebar/ui";

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <>
      <div>Project {id}</div>
      <Sidebar />
    </>
  );
};

export default ProjectPage;
