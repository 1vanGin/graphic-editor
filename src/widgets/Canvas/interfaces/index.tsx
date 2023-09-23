import { Instrument } from "entities/ActionItem";
import { IProjectCard } from "entities/ProjectCard/interfaces";

export type Point = { x: number; y: number };

export type CanvasProps = {
    project: IProjectCard;
    save?: () => void;
};

export type virtualLayerType = {
    id: string;
    opacity: number;
    canvas: HTMLCanvasElement;
    sort: number;
    isVisible: boolean;
    initialImage: HTMLImageElement;
    url: string;
};

export type queueItemType = {
    file: File;
    projectId: string;
    layerId: string;
    needToUpdateUrl: boolean;
};

export type drawFunctionPropsType = {
    ctx: CanvasRenderingContext2D;
    startPoint: Point;
    flashingPoints: Point[];
    endPoint: Point;
    color: string;
};

export type drawCursorProps = {
    ctx: CanvasRenderingContext2D;
    point: Point;
    size: number;
    instument: Instrument;
};

export type drawFunction = (data: drawFunctionPropsType) => void;
