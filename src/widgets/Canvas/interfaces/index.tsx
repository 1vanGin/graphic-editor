export type Point = { x: number; y: number };

export type drawFunctionPropsType = {
    ctx: CanvasRenderingContext2D;
    startPoint: Point;
    flashingPoints: Point[];
    endPoint: Point;
    color: string;
};

export type drawFunction = (data: drawFunctionPropsType) => void;
