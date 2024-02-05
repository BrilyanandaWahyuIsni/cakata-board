import { useRef, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Star, Shape } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import {
  ComponenCanvasProps,
  DataCircleProps,
  DataRectProps,
  FreeBrushCanvasProps,
  LineProps,
} from './freeBrushCanvasConfig';
import { LineMouseDown, LineMouseMove } from './addComponen/LineConfig';
import { RectConfigMouseDownOrMove } from './addComponen/RectConfig';
import uuid4 from 'uuid4';
import LineComponet from './ArrayComponet/lineComponet';
import AnotherComponent from './ArrayComponet/anotherComponent';
import { zoomInOut } from './addComponen/UniversalConfig';
import { CircleConfigMouseDown } from './addComponen/CircleConfig';

function FreeBrushCanvas(props: FreeBrushCanvasProps) {
  const [componenCanvas, setComponeCanvas] = useState<
    Array<ComponenCanvasProps> | []
  >([]);

  // line setting
  const [lines, setLines] = useState<Array<LineProps> | []>([]);
  const [addLine, setAddLine] = useState<LineProps | null>(null);
  const lineRef = useRef<Konva.Line>(null);

  // rect setting
  const [addRect, setAddRect] = useState<DataRectProps | null>();
  const rectRef = useRef<Konva.Rect>(null);

  // circle setting
  const [addCircle, setAddCircle] = useState<DataCircleProps | null>();
  const circleRef = useRef<Konva.Circle>(null);

  // stage setting
  const stageRef = useRef<Konva.Stage>(null);
  const [lastId, setLastId] = useState<string>('');
  const isDrawing = useRef(false);

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    setLastId(uuid4());

    if (props.drag === 'BRUSH' || props.drag === 'ERASER') {
      isDrawing.current = true;
      const { drag, colorBrush, sizeBrush } = props;
      const addPointLine = LineMouseDown(
        lastId,
        event,
        lineRef,
        drag,
        colorBrush,
        sizeBrush,
      );
      if (addPointLine) {
        setAddLine(addPointLine);
      }
    }

    if (props.drag === 'RECT') {
      isDrawing.current = true;
      const addPoint = RectConfigMouseDownOrMove(event, lastId, rectRef);
      if (addPoint) {
        setComponeCanvas(prev => [...prev, { type: 'RECT', data: addPoint }]);
        setAddRect(addPoint);
      }
    }

    if (props.drag === 'CIRCLE') {
      isDrawing.current = true;
      const dataCircle = CircleConfigMouseDown(lastId, event, circleRef);
      if (dataCircle) {
        setComponeCanvas(prev => [
          ...prev,
          { type: 'CIRCLE', data: dataCircle },
        ]);
        setAddCircle(dataCircle);
      }
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    if (props.drag === 'BRUSH' || props.drag === 'ERASER') {
      const addLinePoint = LineMouseMove(event, lineRef);
      if (addLinePoint) {
        if (addLine) {
          setAddLine(() => ({
            ...addLine,
            points: addLine.points.concat(addLinePoint),
          }));
        }
      }
    }

    if (props.drag === 'RECT') {
      const changePoint = RectConfigMouseDownOrMove(event, lastId, rectRef);
      if (changePoint) {
        const getLastComponent = componenCanvas[componenCanvas.length - 1];
        const firstPointX = getLastComponent.data.x;
        const firstPointY = getLastComponent.data.y;
        (getLastComponent.data as DataRectProps).width =
          changePoint.x - firstPointX;
        (getLastComponent.data as DataRectProps).height =
          changePoint.y - firstPointY;
        setComponeCanvas(prev => [...prev.slice(0, -1), getLastComponent]);
        setAddRect(getLastComponent.data as DataRectProps);
      }
    }

    if (props.drag === 'CIRCLE') {
      const changePoinCircle = CircleConfigMouseDown(lastId, event, circleRef);
      if (changePoinCircle) {
        const getLastComponent = componenCanvas[componenCanvas.length - 1];
        const firstPointX = getLastComponent.data.x;
        const firstPointY = getLastComponent.data.y;

        const lenghtX = changePoinCircle.x - firstPointX;
        const lenghtY = changePoinCircle.y - firstPointY;

        const radius = Math.sqrt(Math.pow(lenghtX, 2) + Math.pow(lenghtY, 2));

        (getLastComponent.data as DataCircleProps).radius = radius;

        setComponeCanvas(prev => [...prev.slice(0, -1), getLastComponent]);
        setAddCircle(getLastComponent.data as DataCircleProps);
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (addLine) {
      setLines(prev => [...prev, addLine]);
      setAddLine(null);
    }
    if (addRect) {
      setAddRect(null);
    }
    if (addCircle) {
      setAddCircle(null);
    }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    const newScale = zoomInOut(event);
    if (newScale) {
      props.handleSendScale(newScale);
    }
  };

  const trianglePoints = [100, 50, 200, 150, 0, 150];

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onWheel={handleWheel}
      draggable={props.drag === 'PAN'}
      ref={stageRef}
    >
      <Layer>
        <AnotherComponent
          componenCanvas={componenCanvas}
          draggable={props.drag === 'SELECT'}
        />
        <Rect
          key={lastId}
          id={lastId}
          width={addRect?.width}
          height={addRect?.height}
          x={addRect?.x}
          y={addRect?.y}
          fill={'white'}
          stroke={'black'}
          strokeWidth={5}
          ref={rectRef}
        />
        <Circle
          key={addCircle?.id}
          id={addCircle?.id}
          radius={addCircle?.radius}
          x={addCircle?.x}
          y={addCircle?.y}
          fill={addCircle?.fill}
          stroke={addCircle?.stroke}
          strokeWidth={addCircle?.strokeWidth}
          ref={circleRef}
        />
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(trianglePoints[0], trianglePoints[1]);
            for (let index = 2; index < trianglePoints.length; index += 2) {
              context.lineTo(trianglePoints[index], trianglePoints[index + 1]);
            }
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill="#FFC107"
          stroke="#FF9800"
          strokeWidth={4}
          draggable
        />
      </Layer>
      <Layer>
        <LineComponet lines={lines} />
        <Line
          key={'ini_spesial'}
          points={addLine?.points}
          stroke={addLine?.stroke}
          strokeWidth={addLine?.strokeWidth}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={addLine?.modeCanvas}
          ref={lineRef}
        />
      </Layer>
    </Stage>
  );
}

export default FreeBrushCanvas;
