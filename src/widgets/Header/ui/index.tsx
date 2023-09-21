import "./index.css";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Card } from "@mantine/core";
import { useAppDispatch } from "app/store/hooks.ts";
import { CreateProjectModal } from "features/CreateProjectModal";
import { redo, undo } from "features/History";
import { Notification } from "shared/ui";
import { useFirebaseDb, useFirebaseStorage } from "shared/hooks";
import { DeleteProjectModal } from "features";

export const Header = () => {
  const [openedCreatedModal, setOpenedCreateModal] = useState(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [openedNotification, setOpenedNotification] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchProjects } = useFirebaseDb();
  const { downloadFile } = useFirebaseStorage();

  const handleUndoClick = () => {
    dispatch(undo());
  };

  const handleRedoClick = () => {
    dispatch(redo());
  };
  const downloadHandler = () => {
    if (id) downloadFile(id, "preview.png");
  };
  const toAllProjectHandler = () => {
    navigate("/");
    fetchProjects();
  };

  const saveProjectHandler = () => {
    setOpenedNotification(true);
    setTimeout(() => {
      setOpenedNotification(false);
    }, 3000);
  };

  return (
    <>
      <div className="header">
        <div className="btns">
          <div className="btn btn-file">
            <span className="btn-text btn-file-text">Файл</span>
            <Card
              shadow="sm"
              padding="sm"
              radius="md"
              className="menu menu-file"
            >
              <span
                className="menu-item"
                onClick={() => setOpenedCreateModal(true)}
              >
                Новый проект
              </span>
              <span className="menu-item" onClick={saveProjectHandler}>
                Сохранить
              </span>
              <span className="menu-item" onClick={downloadHandler}>
                Экспортировать PNG
              </span>
              <span
                className="menu-item"
                onClick={() => setOpenedDeleteModal(true)}
              >
                Удалить проект
              </span>
            </Card>
          </div>
          <div className="btn btn-correction">
            <span className="btn-text btn-text-correction">Правка</span>
            <Card
              shadow="sm"
              padding="sm"
              radius="md"
              className="menu menu-correction"
            >
              <span className="menu-item" onClick={handleUndoClick}>
                Отменить
              </span>
              <span className="menu-item" onClick={handleRedoClick}>
                Вернуть
              </span>
            </Card>
          </div>
          <span
            className="btn-text btn-text-project"
            onClick={toAllProjectHandler}
          >
            Все проекты
          </span>
        </div>
      </div>

      <CreateProjectModal
        opened={openedCreatedModal}
        onClose={() => setOpenedCreateModal(false)}
      />

      {id && (
        <DeleteProjectModal
          projectId={id}
          opened={openedDeleteModal}
          onClose={() => setOpenedDeleteModal(false)}
        />
      )}

      {openedNotification && (
        <Notification color="teal" title={"Сохранено"}>
          Все изменения сохранены
        </Notification>
      )}
    </>
  );
};
