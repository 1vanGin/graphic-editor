import { useLayoutEffect, useState } from "react";
import { Container } from "@mantine/core";
import { useAppSelector } from "app/store/hooks.ts";
import { ProjectCardListEmpty } from "widgets";
import { ProjectCardList } from "widgets";
import { useFirebaseDb } from "shared/hooks";
import { Loader } from "shared/ui";
import { CreateProjectModal } from "features/CreateProjectModal";

const MainPage = () => {
  const [opened, setOpened] = useState(false);
  const { fetchProjects, loading } = useFirebaseDb();
  const { projects } = useAppSelector((state) => state.projects);

  const openModalHandler = () => {
    setOpened(true);
  };

  useLayoutEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      {projects.length > 0 ? (
        <ProjectCardList open={openModalHandler} />
      ) : (
        <ProjectCardListEmpty open={openModalHandler} />
      )}
      <CreateProjectModal opened={opened} onClose={() => setOpened(false)} />
    </Container>
  );
};

export default MainPage;
