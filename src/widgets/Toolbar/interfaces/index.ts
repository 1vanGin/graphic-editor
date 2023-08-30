export type typeButttonClick =
  | "brush"
  | "eraser"
  | "line"
  | "figure"
  | "color"
  | null;

export interface ToolbarState {
  color: string;
  typeTool: "brush" | "eraser" | "line" | "figure" | null;
}
