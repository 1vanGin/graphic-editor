import React from "react";

export interface PropsButton {
  variant?:
    | "transparent"
    | "subtle"
    | "default"
    | "outline"
    | "filled"
    | "light";
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
