import React, { useState } from "react";
import { useFirebaseStorage, useFirebaseDb } from "../../hooks";

export const UploadFile = () => {
  const [image, setImage] = useState<File>();

  const { uploadFile, downloadFile, isUploading, deleteFile } =
    useFirebaseStorage();
  const { projects, loading } = useFirebaseDb();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = (e.target as HTMLInputElement).files;
    if (img && img.length > 0) {
      setImage(img[0]);
    }
  };
  const handleUpload = () => {
    if (image) uploadFile("qwerty", image);
  };

  const handleDownload = () => {
    downloadFile("qwerty", "test.png");
  };

  const handleDelete = () => {
    deleteFile("qwerty", "test.png");
  };

  console.log(loading, projects);

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button disabled={isUploading} onClick={handleUpload}>
        upload
      </button>

      <button onClick={handleDownload}>download</button>
      <button onClick={handleDelete}>delete</button>
    </>
  );
};
