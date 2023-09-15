import { Box } from "@mantine/core";
import "./index.css";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { addAction } from "features/History/model/slice";
import { Instrument } from "features/History/ui/types";
import { drawEllipse, drawLine, drawRect, clear, drawBrush, eraser } from "../utils";
import { Point, drawFunctionPropsType } from "../interfaces";
import { useFirebaseDb, useFirebaseStorage } from "shared/hooks";
import { updateProject } from "widgets/ProjectCardList/model/slice";
import { IProjectCard } from "entities/ProjectCard/interfaces";

type CanvasProps = {
    project: IProjectCard;
};

type virtualLayerType = {
    id: string;
    opacity: number;
    canvas: HTMLCanvasElement;
}

export const Canvas: React.FC<CanvasProps> = ({ project }) => {
    const { uploadFile } = useFirebaseStorage();
    const dispatch = useAppDispatch();
    const { updateProjectName } = useFirebaseDb();
    const { color, typeTool: currentInstrument } = useAppSelector((state) => state.toolbar);
    const layers = useAppSelector((state) => state.layers.layers);
    const activeLayer = useAppSelector((state) => state.layers.activeLayer);
    const zoomValue = useAppSelector((state) => state.zoom.zoomValue);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef<Boolean>(false);
    const startPoint = useRef<Point>({ x: 0, y: 0 });
    const currestPoint = useRef<Point>({ x: 0, y: 0 });
    const flashingPoints = useRef<Point[]>([]);
    const endPoint = useRef<Point>({ x: 0, y: 0 });
    const virtualLayers = useRef<virtualLayerType[]>([]);
    const supportLayer = useRef<HTMLCanvasElement>();
    const scale = zoomValue / 100;


    const renderLayers = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            clear(ctx, canvas.width, canvas.height);
            virtualLayers.current.slice().reverse().forEach(layer => {
                ctx.globalAlpha = layer.opacity / 100;
                if (layer.id === activeLayer?.id && supportLayer.current) {
                    const supportCtx = supportLayer.current.getContext('2d');
                    supportCtx?.drawImage(layer.canvas, 0, 0);
                    ctx.drawImage(supportLayer.current, 0, 0);
                } else {
                    ctx.drawImage(layer.canvas, 0, 0);
                }
            });
        }
    }

    const draw = (instrument: Instrument, instrumentData: drawFunctionPropsType) => {
        switch (instrument) {
            case Instrument.brush:
                drawBrush(instrumentData);
                break;
            case Instrument.line:
                drawLine(instrumentData);
                break;
            case Instrument.eraser:
                eraser(instrumentData);
                break;
            case Instrument.ellipse:
                drawEllipse(instrumentData);
                break;
            case Instrument.rectangle:
                drawRect(instrumentData);
                break;
        }
    };

    const mouseMoveHandler: React.MouseEventHandler<HTMLCanvasElement> = (
        event
    ) => {
        if (drawing.current) {
            currestPoint.current.x = event.nativeEvent.offsetX / scale;
            currestPoint.current.y = event.nativeEvent.offsetY / scale;
            flashingPoints.current.push({ ...currestPoint.current });
            const virtualCanvas = virtualLayers.current.find(layer => layer.id === activeLayer?.id)
            if (virtualCanvas) {
                const ctx = virtualCanvas.canvas.getContext('2d');
                const supportCtx = supportLayer.current?.getContext('2d');
                if (ctx && supportCtx) {
                    clear(supportCtx, project.width, project.height);

                    const instrumentData: drawFunctionPropsType = {
                        ctx: currentInstrument === Instrument.eraser ? ctx : supportCtx,
                        startPoint: { ...startPoint.current },
                        endPoint: { ...currestPoint.current },
                        color: color,
                        flashingPoints: [...flashingPoints.current],
                    };

                    draw(currentInstrument, instrumentData);
                    requestAnimationFrame(() => renderLayers());
                }
            }
        }
    };

    const mouseDownHandler: React.MouseEventHandler<HTMLCanvasElement> = (
        event
    ) => {
        flashingPoints.current = [];
        startPoint.current.x = event.nativeEvent.offsetX / scale;
        startPoint.current.y = event.nativeEvent.offsetY / scale;
        drawing.current = true;
    };

    const getInstrumentName = (instrument: Instrument) => {
        switch (instrument) {
            case Instrument.line:
                return "Линия";
            case Instrument.rectangle:
                return "Прямоугольник";
            case Instrument.ellipse:
                return "Эллипс";
            case Instrument.brush:
                return "Кисть";
            case Instrument.eraser:
                return "Ластик";
        }
    };

    const mouseUpHandler: React.MouseEventHandler<HTMLCanvasElement> = (
        event
    ) => {
        endPoint.current.x = event.nativeEvent.offsetX / scale;
        endPoint.current.y = event.nativeEvent.offsetY / scale;
        drawing.current = false;

        const action = {
            id: crypto.randomUUID() as string,
            label: getInstrumentName(currentInstrument),
            layerId: "l1",
            instrument: currentInstrument,
            isCancel: false,
            startPoint: { x: 0, y: 0 },
            flashingPoints: [...flashingPoints.current],
            endPoint: { x: 0, y: 0 },
        };
        dispatch(addAction(action));

        const virtualCanvas = virtualLayers.current.find(layer => layer.id === activeLayer?.id)
        if (virtualCanvas) {
            const ctx = virtualCanvas.canvas.getContext('2d');
            const supportCtx = supportLayer.current?.getContext('2d');

            if (ctx && supportCtx) {
                clear(supportCtx, project.width, project.height);
                const instrumentData: drawFunctionPropsType = {
                    ctx: ctx,
                    startPoint: startPoint.current,
                    endPoint: endPoint.current,
                    color: color,
                    flashingPoints: flashingPoints.current,
                };

                draw(currentInstrument, instrumentData);
                requestAnimationFrame(() => renderLayers());

                // Сохранение файла слоя в Firebase
                // TODO сейчас стои не хрантся в БД
                // virtualCanvas.canvas.toBlob((blob) => {
                //     if (blob) {
                //         let file = new File([blob], virtualCanvas.id + ".png", { type: "image/png" });
                //         uploadFile(project.id, file)?.then((url: string) => {
                //             const data = { ...project, preview: url };
                //             dispatch(updateProject({ id: project.id, data }));
                //             updateProjectName(data);
                //         });
                //     }
                // }, 'image/png');

                // Сохранение файла preview в Firebase
                canvasRef.current?.toBlob((blob) => {
                    if (blob) {
                        let file = new File([blob], "preview.png", { type: "image/png" });
                        uploadFile(project.id, file)?.then((url: string) => {
                            const data = { ...project, preview: url };
                            dispatch(updateProject({ id: project.id, data }));
                            updateProjectName(data);
                        });
                    }
                }, 'image/png');

            }
        }
        renderLayers();
    };

    useEffect(() => {
        // Вспомогающий стой для построения фигур
        supportLayer.current = document.createElement('canvas');
        supportLayer.current.width = project.width;
        supportLayer.current.height = project.height;
        const supportCtx = supportLayer.current.getContext('2d');
        if (supportCtx) {
            supportCtx.globalCompositeOperation = "destination-over";
        }

        virtualLayers.current = [];
        layers.forEach((layer) => {
            const canvas = document.createElement('canvas');
            canvas.width = project.width;
            canvas.height = project.height;
            virtualLayers.current.push({ canvas, id: layer.id, opacity: layer.opacity });
        });
    }, [layers]);

    return (
        <Box className="canvas-container" pr={{ sm: 300 }}>
            <Box style={{ overflow: 'auto', maxHeight: 'calc(100% - 40px)', maxWidth: 'calc(100% - 340px)' }}>
                <Box style={{ zoom: zoomValue + '%' }}>
                    <canvas
                        width={project.width}
                        height={project.height}
                        ref={canvasRef}
                        onMouseDown={mouseDownHandler}
                        onMouseUp={mouseUpHandler}
                        onMouseMove={mouseMoveHandler}
                    ></canvas>
                </Box>
            </Box>
        </Box >
    );
};
