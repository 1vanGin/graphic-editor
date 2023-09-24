import { useLayoutEffect, useState } from "react";
import { Container } from "@mantine/core";
import { useAppSelector } from "app/store/hooks.ts";
import { ProjectCardList, ProjectCardListEmpty } from "widgets";
import { useFirebaseDb } from "shared/hooks";
import { Loader } from "shared/ui";
import { CreateProjectModal, DeleteProjectModal } from "features";
import { RenameProjectModal } from "entities/ProjectCard";
import { ActiveCardContext } from "app/context";

const MainPage = () => {
  const [activeCardId, setActiveCardId] = useState("");
  const [openedCreateModal, setOpenedCreateModal] = useState(false);
  const [openedRenameModal, setOpenedRenameModal] = useState(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);

  const { fetchProjects, loading } = useFirebaseDb();
  const { projects } = useAppSelector((state) => state.projects);

  useLayoutEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container>
      {projects.length > 0 ? (
        <ActiveCardContext.Provider
          value={{
            setActiveCardId,
            setOpenedRenameModal,
            setOpenedDeleteModal,
          }}
        >
          <ProjectCardList open={() => setOpenedCreateModal(true)} />
          {activeCardId && (
            <>
              <RenameProjectModal
                projectId={activeCardId}
                opened={openedRenameModal}
                onClose={() => setOpenedRenameModal(false)}
              />
              <DeleteProjectModal
                projectId={activeCardId}
                opened={openedDeleteModal}
                onClose={() => setOpenedDeleteModal(false)}
              />
            </>
          )}
        </ActiveCardContext.Provider>
      ) : (
        <ProjectCardListEmpty open={() => setOpenedCreateModal(true)} />
      )}
      <CreateProjectModal
        opened={openedCreateModal}
        onClose={() => setOpenedCreateModal(false)}
      />
    </Container>
  );
};

export default MainPage;
