import { onValue, ref, remove, set, update } from "@firebase/database";
import { firebaseDB } from "app/firebase";
import { useState } from "react";
import { Database } from "../enums";
import {
  IUpdateProjectLayerImageUrl,
  IUpdateProjectLayers,
} from "shared/ui/NewProjectForm/interfaces";
import { useAppDispatch } from "app/store/hooks.ts";
import { setProjectsFromServer } from "widgets/ProjectCardList/model/slice.ts";
import { ILayer } from "entities/LayersItem";
import { IProjectCard } from "entities/ProjectCard/interfaces";

export const useFirebaseDb = () => {
  const dbRef = ref(firebaseDB, Database.projects);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addProject = (payload: IProjectCard) => {
    setLoading(true);
    set(ref(firebaseDB, `${Database.projects}/` + payload.id), {
      id: payload.id,
      name: payload.name,
      height: payload.height,
      width: payload.width,
      createdDate: payload.createdDate,
      updatedDate: payload.updatedDate,
      preview: "",
      layers: payload.layers,
    })
      .then(() => {
        console.log("New Project add to FB");
        setLoading(false);
      })
      .catch((error) => {
        console.log("addProject: Something in database went wrong...", error);
      });
  };

  const deleteProjectFromDB = (projectId: IProjectCard["id"]) => {
    remove(ref(firebaseDB, `${Database.projects}/` + projectId))
      .then(() => {
        console.log("Project Deleted");
      })
      .catch((error) => {
        console.log(
          "deleteProjectFromDB: Something in database went wrong...",
          error,
        );
      });
  };

  const updateProjectName = async (project: IProjectCard) => {
    const updates: {
      [key: string]: string;
    } = {};
    updates[`/${Database.projects}/${project.id}/name`] = project.name;
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Project Name was updated");
        updateProjectDate(project.id);
      })
      .catch((error) => {
        console.log(
          "updateProjectName: Something in database went wrong...",
          error,
        );
      });
  };

  const updateProjectPreview = async (projectId: string, preview: string) => {
    const updates: {
      [key: string]: string | number;
    } = {};
    updates[`/${Database.projects}/${projectId}/preview`] = preview;
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Project preview was updated");
        updateProjectDate(projectId);
      })
      .catch((error) => {
        console.log(
          "updateProjectPreview: Something in database went wrong...",
          error,
        );
      });
  };

  const updateProjectLayer = async ({
    projectId,
    layer,
  }: IUpdateProjectLayers) => {
    const updates: {
      [key: string]: ILayer;
    } = {};
    updates[layer.id] = layer;
    return update(
      ref(firebaseDB, `/${Database.projects}/${projectId}/layers/`),
      updates,
    )
      .then(() => {
        console.log("Layer was updated");
        updateProjectDate(projectId);
      })
      .catch((error) => {
        console.log(
          "updateProjectLayer: Something in database went wrong...",
          error,
        );
      });
  };

  const updateProjectDate = async (projectId: string) => {
    const updates: {
      [key: string]: number;
    } = {};
    updates[`/${Database.projects}/${projectId}/updatedDate`] =
      new Date().getTime();
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Project props updatedDate was updated");
      })
      .catch((error) => {
        console.log(
          "updateProjectDate: Something in database went wrong...",
          error,
        );
      });
  };

  const updateProjectLayerImageUrl = async ({
    projectId,
    layerId,
    url,
  }: IUpdateProjectLayerImageUrl) => {
    const updates: {
      [key: string]: string;
    } = {};
    updates[`/${Database.projects}/${projectId}/layers/${layerId}/url`] = url;
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Layer image url was updated");
        updateProjectDate(projectId);
      })
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };

  const deleteProjectLayer = async ({
    projectId,
    layer,
  }: IUpdateProjectLayers) => {
    return remove(
      ref(firebaseDB, `/${Database.projects}/${projectId}/layers/${layer.id}`),
    )
      .then(() => {
        console.log("Layer was deleted");
      })
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };

  const fetchProjects = () => {
    setLoading(true);

    // reading data from database
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const projects: IProjectCard[] = Object.values(data);
          const sortedProjects: IProjectCard[] = projects.sort(
            (a, b) => b.updatedDate - a.updatedDate,
          );
          console.log("!!!!!sortedProjects!!!!", sortedProjects);
          dispatch(setProjectsFromServer(sortedProjects));
        }
        setLoading(false);
      },
      (error) => {
        console.log("Something in database went wrong...", error);
      },
    );
  };

  return {
    addProject,
    updateProjectName,
    deleteProjectFromDB,
    fetchProjects,
    updateProjectLayer,
    updateProjectLayerImageUrl,
    deleteProjectLayer,
    updateProjectPreview,
    loading,
  };
};
