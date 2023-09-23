import {
  deleteObject,
  getBlob,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { firebaseStorage } from "../../app/firebase";
import { useState } from "react";
import { saveBlob } from "../helpers";
import { getStorage } from "firebase/storage";
import { useFirebaseDb } from ".";
import { ILayer } from "entities/LayersItem";

export const useFirebaseStorage = () => {
  const storage = getStorage();
  const { updateProjectLayer } = useFirebaseDb();

  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLink, setImageLink] = useState("");

  const getImageLink = (projectId: string, imageName: string) => {
    getDownloadURL(ref(storage, `${projectId}/${imageName}.png`))
      .then((url) => {
        setImageLink(url);
      })
      .catch((error) => {
        console.log("Something in storage went wrong...", error);
      });
  };

  const uploadFile = (projectId: string, file: File) => {
    if (!file) return;
    setIsUploading(true);
    const storageRef = ref(storage, `/${projectId}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
        },
        (err) => {
          if (err) {
            console.log("Something in storage went wrong...", err);
          }
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
            setIsUploading(false);
          })
      );
    });
  };

  const uploadLayerFile = async (projectId: string, layer: ILayer, file: File) => {
    if (!file) return;
    setIsUploading(true);
    const storageRef = ref(storage, `/${projectId}/${layer.id}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const layerUrl = await new Promise<string>((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploaded layer file!", snapshot);
        },
        (err) => {
          if (err) {
            console.log("Something in storage went wrong...", err);
          }
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
            setIsUploading(false);
          })
      );
      const layerProps = { ...layer };
      layerProps.url = layerUrl;
      updateProjectLayer({ projectId, layer: layerProps });
    });
  };

  const downloadFile = (projectId: string, imageName: string) => {
    const imageRef = ref(firebaseStorage, `${projectId}/${imageName}`);
    setIsDownloading(true);
    getBlob(imageRef)
      .then((blob) => {
        saveBlob(blob, imageName);
      })
      .catch((error) => {
        console.log("error downloading file: ", error);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  const deleteFile = (projectId: string, imageName: string) => {
    const imageRef = ref(firebaseStorage, `${projectId}/${imageName}.png`);
    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Something in storage went wrong...", error);
      });
  };

  return {
    uploadFile,
    uploadLayerFile,
    isUploading,
    downloadFile,
    isDownloading,
    deleteFile,
    getImageLink,
    imageLink,
  };
};
