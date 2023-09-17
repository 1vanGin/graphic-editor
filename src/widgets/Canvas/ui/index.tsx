import { Box } from "@mantine/core";
import "./index.css";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { addAction } from "features/History/model/slice";
import { Instrument } from "features/History/ui/types";
import { drawEllipse, drawLine, drawRect, clear, drawBrush, eraser } from "../utils";
import { Point, drawFunctionPropsType } from "../interfaces";
import { useFirebaseDb, useFirebaseStorage } from "shared/hooks";
import { IProjectCard } from "entities/ProjectCard/interfaces";
import { changeLayerImageUrl } from "features/Layers/model/slice";
import { updateProject } from "widgets/ProjectCardList/model/slice";
import { ILayer } from "features/Layers/ui/types";

type CanvasProps = {
    project: IProjectCard;
};

type virtualLayerType = {
    id: string;
    opacity: number;
    canvas: HTMLCanvasElement;
    sort: number;
    isVisible: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ project }) => {
    const { uploadFile } = useFirebaseStorage();
    const dispatch = useAppDispatch();
    const { updateProjectPreview, updateProjectLayerImageUrl } = useFirebaseDb();
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
    const initialProjectId = useRef<string>();
    const projectId = useAppSelector((state) => state.projects.openProjectId)


    const renderLayers = () => {
        console.log('render');

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            clear(ctx, canvas.width, canvas.height);
            virtualLayers.current.slice().sort((a, b) => a.sort - b.sort).forEach(layer => {
                if (layer.isVisible) {
                    ctx.globalAlpha = layer.opacity / 100;
                    if (layer.id === activeLayer?.id && supportLayer.current) {
                        const supportCtx = supportLayer.current.getContext('2d');
                        if (supportCtx) {
                            supportCtx.drawImage(layer.canvas, 0, 0);
                            ctx.drawImage(supportLayer.current, 0, 0);
                        }

                    } else {
                        ctx.drawImage(layer.canvas, 0, 0);
                    }
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
                virtualCanvas.canvas.toBlob((blob) => {
                    if (blob) {
                        let file = new File([blob], virtualCanvas.id + ".png", { type: "image/png" });
                        uploadFile(project.id, file)?.then((url: string) => {
                            dispatch(changeLayerImageUrl({ id: project.id, url }));
                            updateProjectLayerImageUrl({ projectId: project.id, layerId: virtualCanvas.id, url: url });
                        });
                    }
                }, 'image/png');

                // Сохранение файла preview в Firebase
                canvasRef.current?.toBlob((blob) => {
                    if (blob) {
                        let file = new File([blob], "preview.png", { type: "image/png" });
                        uploadFile(project.id, file)?.then((url: string) => {
                            const data = {
                                ...project, preview: url,
                                layers: layers.reduce((acc: { [key: string]: ILayer }, item) => {
                                    acc[item.id] = item;
                                    return acc;
                                }, {})
                            };
                            dispatch(updateProject({ id: project.id, data }));
                            updateProjectPreview(project.id, url);
                        });
                    }
                }, 'image/png');

            }
        }
        requestAnimationFrame(() => renderLayers());
    };

    useEffect(() => {
        const supportCtx = supportLayer.current?.getContext('2d');
        if (supportCtx) {
            clear(supportCtx, project.width, project.height);
        }
    }, [activeLayer]);

    useEffect(() => {

        if (initialProjectId.current !== projectId) {
            initialProjectId.current = projectId;
            virtualLayers.current.forEach(item => item.canvas.remove());
            virtualLayers.current = [];
        }

        // Вспомогающий слой для построения фигур
        if (!supportLayer.current) {
            supportLayer.current = document.createElement('canvas');
            supportLayer.current.width = project.width;
            supportLayer.current.height = project.height;
            const supportCtx = supportLayer.current.getContext('2d');
            if (supportCtx) {
                supportCtx.globalCompositeOperation = "destination-over";
            }
            document.body.append(supportLayer.current);
        }
        let sort = 0;
        const promises = layers.map(async (layer) => {
            const index = virtualLayers.current.findIndex(item => item.id === layer.id);
            // Сортировка слоёв, если не задан sortOrder
            sort = layer.sortOrder || sort + 1;
            if (index !== -1) {
                virtualLayers.current[index].opacity = layer.opacity;
                virtualLayers.current[index].sort = sort;
                virtualLayers.current[index].isVisible = layer.isVisible;
            } else {
                const canvas = document.createElement('canvas');
                canvas.width = project.width;
                canvas.height = project.height;
                document.body.append(canvas);
                virtualLayers.current.push({ canvas, id: layer.id, opacity: layer.opacity, sort, isVisible: layer.isVisible });

                // Отрисовка первоначальных состояний слоёв
                const layerCtx = canvas.getContext('2d');
                let img = new Image();
                if (layer.url) {
                    await new Promise(resolve => {
                        img.onload = resolve;
                        img.crossOrigin = "anonymous";
                        img.src = layer.url
                    });
                    layerCtx?.drawImage(img, 0, 0);
                }
            }
        });
        // Ререндер после загрузки всех картинок
        Promise.all(promises).then(() => requestAnimationFrame(() => renderLayers()));
    }, [layers, projectId]);

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
