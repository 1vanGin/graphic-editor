import "./index.css";
import {
  ActionIcon,
  Card as MantineCard,
  Group as MantineGroup,
  Image,
  Menu,
  Modal,
  rem,
  Text as MantineText,
} from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconFileTypePng,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { IProjectCard } from "../interfaces";
import {
  deleteProject,
  updateProject,
} from "widgets/ProjectCardList/model/slice";
import { Link, useNavigate } from "react-router-dom";
import { EditProjectForm } from "shared/EditProjectForm";
import { useState } from "react";
import { useFirebaseDb } from "shared/hooks";
import { useAppDispatch } from "app/store/hooks.ts";

type ProjectCardType = {
  project: IProjectCard;
};

export const ProjectCard: React.FC<ProjectCardType> = ({ project }) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { deleteProjectFromDB, updateProjectValues } = useFirebaseDb();
  const dispatch = useAppDispatch();

  const onSaveHandler = (values: IProjectCard) => {
    dispatch(updateProject({ id: project.id, data: values }));
    updateProjectValues(values).finally(() => {
      setOpened(false);
    });
  };

  const deleteProjectHandle = () => {
    dispatch(deleteProject(project.id));
    deleteProjectFromDB(project.id);
  };

  return (
    <MantineCard withBorder shadow="sm" radius="md">
      <MantineCard.Section withBorder inheritPadding py="xs">
        <MantineGroup position="apart">
          <Link to={`/projects/${project.id}`}>
            <MantineText weight={500}>{project.name}</MantineText>
          </Link>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconEye size={rem(14)} />}
                color="green"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Open
              </Menu.Item>
              <Menu.Item icon={<IconFileTypePng size={rem(14)} />}>
                Download
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={rem(14)} />}
                onClick={() => setOpened(true)}
              >
                Rename
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={rem(14)} />}
                color="red"
                onClick={deleteProjectHandle}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </MantineGroup>
      </MantineCard.Section>
      <Link to={`/projects/${project.id}`}>
        <MantineCard.Section mih={300}>
          {project.preview && <Image src={project.preview} height={300} />}
        </MantineCard.Section>
      </Link>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update project"
        centered
      >
        <EditProjectForm onSave={onSaveHandler} project={project} />
      </Modal>
    </MantineCard>
  );
};
