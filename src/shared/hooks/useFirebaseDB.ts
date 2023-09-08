import { onValue, ref, remove, set, update } from "@firebase/database";
import { firebaseDB } from "../../app/firebase";
import { useEffect, useState } from "react";
import { Database } from "../enums";
import { ProjectProp } from "../NewProjectForm/interfaces";

export const useFirebaseDb = () => {
  const dbRef = ref(firebaseDB, Database.projects);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // for example
  const addProject = (payload: ProjectProp) => {
    setLoading(true);
    // set data to database
    set(ref(firebaseDB, `${Database.projects}/` + payload.id), {
      id: payload.id,
      name: payload.name,
      height: payload.height,
      width: payload.width,
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

  const updateProjectValues = (values: ProjectProp) => {
    const projectKeys = {
      id: values.id,
      name: values.name,
      height: values.height,
      width: values.width,
      preview: "",
      layers: {
        // for example
        // l1: {
        //   id: "l1",
        //   label: "",
        //   url: "",
        //   isVisible: false,
        //   sortOrder: 0,
        //   opacity: 0
        // },
      },
    };
    // const newPostKey = push(child(ref(firebaseDB), "projects")).key;

    const updates: {
      [key: string]: ProjectProp;
    } = {};
    updates[`/${Database.projects}/` + values.id] = projectKeys;
    return update(ref(firebaseDB), updates)
      .then(() => {
        console.log("Project was updated");
      })
      .catch((error) => {
        console.log("Something in database went wrong...", error);
      });
  };

  const updateLocalProjects = () => {
    setLoading(true);

    // reading data from database
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.log("Something in database went wrong...", error);
      },
    );
  };

  useEffect(() => {
    updateLocalProjects();
  }, []);

  return {
    addProject,
    updateProjectValues,
    deleteProjectFromDB,
    projects,
    loading,
  };
};
