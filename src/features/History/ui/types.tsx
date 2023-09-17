type Point = { x: number; y: number };

export enum Instrument {
    line,
    brush,
    ellipse,
    rectangle,
    eraser
  }

export interface IHistoryAction {
    id: string;
    label: string;
    isCancel: boolean;
    instrument: Instrument;
    startPoint: Point;
    flashingPoints: Point[];
    endPoint: Point;
    layerId: string;
    color: string;
}
