import { Card } from "@mantine/core";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useFirebaseDb } from "shared/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { fetchProjects } = useFirebaseDb();
  const toAllProjectHandler = () => {
    navigate("/")
    fetchProjects()
  }
  return (
    <div className="header">
      <div className="btns">
        <div className="btn btn-file">
          <span className="btn-text btn-file-text">Файл</span>
          <Card shadow="sm" padding="sm" radius="md" className="menu menu-file">
            <span className="menu-item">Новый проект</span>
            <span className="menu-item">Сохранить</span>
            <span className="menu-item">Экспортировать PNG</span>
          </Card>
        </div>
        <div className="btn btn-correction ">
          <span className="btn-text btn-text-correction">Правка</span>
          <Card
            shadow="sm"
            padding="sm"
            radius="md"
            className="menu menu-correction"
          >
            <span className="menu-item">Отменить</span>
            <span className="menu-item">Вернуть</span>
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
  );
};
