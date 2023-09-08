import { Box } from "@mantine/core";
import "./index.css";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { addAction } from "features/History/model/slice";
import { Instrument } from "features/History/ui/types";
import { drawEllipse, drawLine, drawRect, clear, drawBrush, eraser } from "../utils";
import { Point, drawFunctionPropsType } from "../interfaces";

type CanvasProps = {
    width: number;
    height: number;
};

export const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
    const dispatch = useAppDispatch();
    const { color, typeTool } = useAppSelector((state) => state.toolbar);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawing = useRef<Boolean>(false);
    const startPoint = useRef<Point>({ x: 0, y: 0 });
    const currestPoint = useRef<Point>({ x: 0, y: 0 });
    const flashingPoints = useRef<Point[]>([]);
    const endPoint = useRef<Point>({ x: 0, y: 0 });

    const mouseMoveHandler: React.MouseEventHandler<HTMLCanvasElement> = (
        event
    ) => {
        flashingPoints.current.push();
        currestPoint.current.x = event.nativeEvent.offsetX;
        currestPoint.current.y = event.nativeEvent.offsetY;
        flashingPoints.current.push({...currestPoint.current});
        if (ctxRef.current && drawing.current) {
            clear(ctxRef.current, width, height);
            const instrumentData: drawFunctionPropsType = {
                ctx: ctxRef.current,
                startPoint: startPoint.current,
                endPoint: currestPoint.current,
                color: color,
                flashingPoints: flashingPoints.current,
            };

            switch (typeTool) {
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
        }
    };
    const mouseDownHandler: React.MouseEventHandler<HTMLCanvasElement> = (
        event
    ) => {
        flashingPoints.current = [];
        startPoint.current.x = event.nativeEvent.offsetX;
        startPoint.current.y = event.nativeEvent.offsetY;
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
        endPoint.current.x = event.nativeEvent.offsetX;
        endPoint.current.y = event.nativeEvent.offsetY;
        drawing.current = false;

        const action = {
            id: crypto.randomUUID() as string,
            label: getInstrumentName(typeTool),
            layerId: "l1",
            instrument: typeTool,
            isCancel: false,
            startPoint: { x: 0, y: 0 },
            flashingPoints: [],
            endPoint: { x: 0, y: 0 },
        };
        dispatch(addAction(action));
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas !== null) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctxRef.current = ctx;
            }
        }
    }, [canvasRef, ctxRef]);

    return (
        <Box className="canvas-container" pr={{ sm: 300 }}>
            <canvas
                width={width}
                height={height}
                ref={canvasRef}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                onMouseMove={mouseMoveHandler}
            ></canvas>
        </Box>
    );
};
