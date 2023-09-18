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
import { useInterval } from 'usehooks-ts'

type CanvasProps = {
    project: IProjectCard;
};

type virtualLayerType = {
    id: string;
    opacity: number;
    canvas: HTMLCanvasElement;
    sort: number;
    isVisible: boolean;
    initialImage: HTMLImageElement;
    url: string;
}

type queueItemType = {
    file: File;
    projectId: string;
    layerId: string;
    needToUpdateUrl: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ project }) => {
    const { uploadFile } = useFirebaseStorage();
    const dispatch = useAppDispatch();
    const { updateProjectPreview, updateProjectLayerImageUrl } = useFirebaseDb();
    const { color, typeTool: currentInstrument } = useAppSelector((state) => state.toolbar);
    const layers = useAppSelector((state) => state.layers.layers);
    const activeLayer = useAppSelector((state) => state.layers.activeLayer);
    const zoomValue = useAppSelector((state) => state.zoom.zoomValue);
    const history = useAppSelector((state) => state.history.history);
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
    const projectId = useAppSelector((state) => state.projects.openProjectId);

    const queue = useRef<queueItemType[]>([]);

    useInterval(
        () => {
            console.log('checkInterval');
            console.log(queue);

            while (queue.current.length > 0) {
                const item = queue.current.pop();
                if (item) {
                    uploadFile(item.projectId, item.file)?.then((url: string) => {
                        if (item.needToUpdateUrl) {
                            if (item.layerId === 'preview.png') {
                                const data = {
                                    ...project, preview: url,
                                    layers: layers.reduce((acc: { [key: string]: ILayer }, item) => {
                                        acc[item.id] = item;
                                        return acc;
                                    }, {})
                                };
                                dispatch(updateProject({ id: item.projectId, data }));
                                updateProjectPreview(item.projectId, url);
                            } else {
                                dispatch(changeLayerImageUrl({ id: item.projectId, url }));
                                updateProjectLayerImageUrl({ projectId: item.projectId, layerId: item.layerId, url: url });

                            }
                        }
                    });
                }
            }
        },
        5000
    )

    const addFileToQueue = (file: File, projectId: string, layerId: string, needToUpdateUrl: boolean) => {
        const index = queue.current.findIndex(item => (item.projectId === projectId && item.layerId === layerId));
        if (index !== -1) {
            queue.current[index].file = file;
        } else {
            queue.current.push({
                file,
                projectId,
                layerId,
                needToUpdateUrl
            });
        }
    }

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

    const restoreLayerFromHistory = (layer: virtualLayerType) => {
        const supportCtx = supportLayer.current?.getContext('2d');
        if (supportLayer.current && supportCtx) {
            clear(supportCtx, supportLayer.current.width, supportLayer.current.height);
        }

        const ctx = layer.canvas.getContext('2d');
        if (ctx !== null) {
            const records = history.filter((item) => (item.layerId === layer.id && !item.isCancel));
            clear(ctx, project.width, project.height);
            ctx.drawImage(layer.initialImage, 0, 0);
            records.reverse().forEach((record) => {
                const instrumentData: drawFunctionPropsType = {
                    ctx,
                    startPoint: record.startPoint,
                    endPoint: record.endPoint,
                    color: record.color,
                    flashingPoints: record.flashingPoints,
                };
                draw(record.instrument, instrumentData);


            });
        }
        renderLayers();

        // Сохранение файла слоя в Firebase
        layer.canvas.toBlob((blob) => {
            if (blob) {
                let file = new File([blob], layer.id + ".png", { type: "image/png" });
                addFileToQueue(file, project.id, layer.id, !Boolean(layer.url));
            }
        }, 'image/png');

        savePreview();
    };


    const savePreview = () => {
        // Сохранение файла preview в Firebase
        canvasRef.current?.toBlob((blob) => {
            if (blob) {
                let file = new File([blob], "preview.png", { type: "image/png" });
                addFileToQueue(file, project.id, "preview.png", !Boolean(project.preview))
                // uploadFile(project.id, file)?.then((url: string) => {
                //     if (!project.preview) {
                //         const data = {
                //             ...project, preview: url,
                //             layers: layers.reduce((acc: { [key: string]: ILayer }, item) => {
                //                 acc[item.id] = item;
                //                 return acc;
                //             }, {})
                //         };
                //         dispatch(updateProject({ id: project.id, data }));
                //         updateProjectPreview(project.id, url);
                //     }
                // });
            }
        }, 'image/png');
    };

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

        if (activeLayer) {
            const action = {
                id: crypto.randomUUID() as string,
                label: getInstrumentName(currentInstrument),
                layerId: activeLayer.id,
                instrument: currentInstrument,
                isCancel: false,
                startPoint: { ...startPoint.current },
                flashingPoints: [...flashingPoints.current],
                endPoint: { ...endPoint.current },
                color: color,
            };
            dispatch(addAction(action));
        }


        // const virtualCanvas = virtualLayers.current.find(layer => layer.id === activeLayer?.id)
        // if (virtualCanvas) {
        //     const ctx = virtualCanvas.canvas.getContext('2d');
        //     const supportCtx = supportLayer.current?.getContext('2d');

        //     if (ctx && supportCtx) {
        //         // const instrumentData: drawFunctionPropsType = {
        //         //     ctx: ctx,
        //         //     startPoint: startPoint.current,
        //         //     endPoint: endPoint.current,
        //         //     color: color,
        //         //     flashingPoints: flashingPoints.current,
        //         // };

        //         // draw(currentInstrument, instrumentData);
        //         // requestAnimationFrame(() => renderLayers());



        //     }
        // }
        // requestAnimationFrame(() => renderLayers());
    };

    useEffect(() => {
        // Слои которые нужно перерендерить после изменения истории
        const layers = history.reduce<string[]>((acc, item) => {
            if (!acc.includes(item.layerId)) {
                acc.push(item.layerId);
            }
            return acc;
        }, []);

        layers.forEach(layerId => {
            const virtualCanvas = virtualLayers.current.find(layer => layer.id === layerId)
            if (virtualCanvas) {
                restoreLayerFromHistory(virtualCanvas);
            }
        });

        savePreview();
    }, [history]);

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
            // document.body.append(supportLayer.current);
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
                virtualLayers.current[index].url = layer.url;
            } else {
                const canvas = document.createElement('canvas');
                canvas.width = project.width;
                canvas.height = project.height;
                // document.body.append(canvas);
                let img = new Image();
                virtualLayers.current.push({ canvas, id: layer.id, opacity: layer.opacity, sort, isVisible: layer.isVisible, initialImage: img, url: layer.url });

                // Отрисовка первоначальных состояний слоёв
                const layerCtx = canvas.getContext('2d');
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
        Promise.all(promises).then(() => requestAnimationFrame(() => {
            renderLayers();
            savePreview();
        }));
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
