import { createContext } from "react";
import { IActiveCardContext } from "./interface.ts";

export const ActiveCardContext = createContext<IActiveCardContext | null>(null);
