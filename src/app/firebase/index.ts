import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../../../firebase.config.ts";

const app = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(app);
export const firebaseStorage = getStorage(app);
