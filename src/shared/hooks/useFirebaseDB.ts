import { onValue, ref, remove, set, update } from "@firebase/database";
import { firebaseDB } from "app/firebase";
import { useState } from "react";
import { Database } from "../enums";
import { IUpdateProjectLayers, ProjectProp } from "shared/ui/NewProjectForm/interfaces";
import { useAppDispatch } from "app/store/hooks.ts";
import { setProjectsFromServer } from "widgets/ProjectCardList/model/slice.ts";
import { ILayer } from "features/Layers/ui/types";

export const useFirebaseDb = () => {
  const dbRef = ref(firebaseDB, Database.projects);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // for example
  const addProject = (payload: ProjectProp) => {
    setLoading(true);
    // set data to database
    set(ref(firebaseDB, `${Database.projects}/` + payload.id), {
      id: payload.id,
      name: payload.name,
      height: payload.height,
      width: payload.width,
      createdDate: payload.createdDate,
      preview: "",
      layers: {},
    }).then(() => {
      setLoading(false);
    });
  };

  const deleteProjectFromDB = (id: ProjectProp["id"]) => {
    remove(ref(firebaseDB, `${Database.projects}/` + id))
      .then(() => console.log("Deleted"))
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };

  const updateProjectName = async (values: ProjectProp) => {
    const updates: {
      [key: string]: string;
    } = {};
    updates[`/${Database.projects}/${values.id}/name`] = values.name;
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Project was updated");
      })
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };


  const updateProjectLayer = async ({ projectId, layer }: IUpdateProjectLayers) => {
    const updates: {
      [key: string]: ILayer;
    } = {};
    updates[layer.id] = layer;
    return update(ref(firebaseDB, `/${Database.projects}/${projectId}/layers/`), updates)
      .then(() => {
        console.log("Layer was updated");
      })
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };


  const deleteProjectLayer = async ({ projectId, layer }: IUpdateProjectLayers) => {
    return remove(ref(firebaseDB, `/${Database.projects}/${projectId}/layers/${layer.id}`))
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
          const projects: ProjectProp[] = Object.values(data);
          const sortedProjects: ProjectProp[] = projects.sort((a, b) =>
            a.createdDate > b.createdDate ? 1 : -1,
          );
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
    updateProjectLayers,
    deleteProjectLayers,
    loading,
  };
};
