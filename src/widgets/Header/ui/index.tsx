import { Card } from "@mantine/core";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="btns">
        <div className="btn btn-file">
          <span className="btn-text btn-file-text">Файл</span>
          <Card shadow="sm" padding="sm" radius="md" className="menu menu-file">
            <span className="menu-item">Новый проект</span>
            <span className="menu-item">Сохронить</span>
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
          onClick={() => navigate("/")}
        >
          Все проекты
        </span>
      </div>
    </div>
  );
};
