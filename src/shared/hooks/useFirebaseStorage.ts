import {
  deleteObject,
  getBlob,
  // getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { firebaseStorage } from "../../app/firebase";
import { useState } from "react";
import { saveBlob } from "../helpers";

export const useFirebaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const uploadFile = (projectId: string, image: File) => {
    if (image) {
      setIsUploading(true);
      const imageRef = ref(firebaseStorage, `${projectId}/${image?.name}`);
      uploadBytes(imageRef, image)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
        })
        .catch((error) => {
          console.log("Something in storage went wrong...", error);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  // const getImageLink = (projectId: string, imageName: string) => {
  //   const imageRef = ref(firebaseStorage, `${projectId}/${imageName}`);
  //   getDownloadURL(ref(imageRef, `${projectId}/${imageName}`))
  //     .then((url) => {
  //       const img = document.getElementById("myimg");
  //       img.setAttribute("src", url);
  //     })
  //     .catch((error) => {
  //       console.log("Something in storage went wrong...", error);
  //     });
  // };

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
    const imageRef = ref(firebaseStorage, `${projectId}/${imageName}`);
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
    isUploading,
    downloadFile,
    isDownloading,
    deleteFile,
    // getImageLink
  };
};
