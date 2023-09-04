import { Container } from "@mantine/core";
import { ProjectCardList } from "../../widgets/ProjectCardList/ui";
import { UploadFile } from "../../shared/UploadFileForTest/ui";

const MainPage = () => {
  return (
    <Container>
      <ProjectCardList />
      <UploadFile />
    </Container>
  );
};

export default MainPage;
