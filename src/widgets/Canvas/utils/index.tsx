import { Instrument } from "entities/ActionItem";
import { Point, drawCursorProps, drawFunction, drawFunctionPropsType } from "../interfaces";

const drawLine: drawFunction = ({ ctx, startPoint, endPoint, color }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
};

const drawBrush: drawFunction = ({
    ctx,
    startPoint,
    endPoint,
    color,
    flashingPoints,
}) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);

    flashingPoints.forEach((point) => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
};
const eraser: drawFunction = (data) => {
    data.ctx.globalCompositeOperation = "destination-out";
    drawBrush(data);
    data.ctx.globalCompositeOperation = "source-over";
};

const drawRect: drawFunction = ({ ctx, startPoint, endPoint, color }) => {
    const rectHeight = endPoint.y - startPoint.y;
    const rectWidth = endPoint.x - startPoint.x;

    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(startPoint.x, startPoint.y, rectWidth, rectHeight);
    ctx.stroke();
};

const drawEllipse: drawFunction = ({ ctx, startPoint, endPoint, color }) => {
    const rectHeight = endPoint.y - startPoint.y;
    const rectWidth = endPoint.x - startPoint.x;
    const radiusX = rectWidth / 2;
    const radiusY = rectHeight / 2;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(
        startPoint.x + radiusX,
        startPoint.y + radiusY,
        Math.abs(radiusX),
        Math.abs(radiusY),
        0,
        0,
        2 * Math.PI
    );
    ctx.stroke();
};

const clear = (
    ctx: CanvasRenderingContext2D,
    height: number,
    width: number
) => {
    ctx.clearRect(0, 0, height, width);
};

const getCursorPoint = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, scale: number): Point => {
    return {
        x: event.nativeEvent.offsetX / scale,
        y: event.nativeEvent.offsetY / scale
    }
}

const drawCursor = ({ ctx, point, size, instument }: drawCursorProps) => {
    if (instument === Instrument.brush || instument === Instrument.eraser) {
        const data: drawFunctionPropsType = {
            ctx: ctx,
            startPoint: { x: point.x - size / 2, y: point.y - size / 2 },
            endPoint: { x: point.x + size / 2, y: point.y + size / 2 },
            color: '#000000',
            flashingPoints: [],
        }
        drawEllipse(data);
    } else {
        const data: drawFunctionPropsType = {
            ctx: ctx,
            startPoint: { x: point.x - size / 2, y: point.y },
            endPoint: { x: point.x - 2, y: point.y },
            color: '#000000',
            flashingPoints: [],
        }
        drawLine(data);
        drawLine({ ...data, startPoint: { x: point.x, y: point.y - size / 2 }, endPoint: { x: point.x, y: point.y - 2 } });
        drawLine({ ...data, startPoint: { x: point.x + size / 2, y: point.y }, endPoint: { x: point.x + 2, y: point.y } });
        drawLine({ ...data, startPoint: { x: point.x, y: point.y + size / 2 }, endPoint: { x: point.x, y: point.y + 2 } });
    }
};

export { clear, drawLine, drawRect, drawEllipse, drawBrush, eraser, getCursorPoint, drawCursor };
