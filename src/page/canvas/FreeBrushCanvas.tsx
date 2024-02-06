import { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import {
  ComponenCanvasProps,
  DataRectProps,
  FreeBrushCanvasProps,
  LineProps,
} from './freeBrushCanvasConfig';
import { LineMouseDown, LineMouseMove } from './addComponen/LineConfig';
import uuid4 from 'uuid4';
import LineComponet from './ArrayComponet/lineComponet';
import AnotherComponent from './ArrayComponet/anotherComponent';
import { zoomInOut } from './addComponen/UniversalConfig';
import { AddCircle } from './addComponen/CircleConfig';
import { AddRect } from './addComponen/RectConfig';
import { AddShapeTriagle } from './addComponen/ShapeConfig';
import { AddStar } from './addComponen/StarConfig';

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
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    const newScale = zoomInOut(event);
    if (newScale) {
      props.handleSendScale(newScale);
    }
  };

  const handleDataComponent = (value: ComponenCanvasProps) => {
    setComponeCanvas(prev => [...prev, value]);
  };

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

        {props.drag === 'CIRCLE' && (
          <AddCircle stageRef={stageRef} sendDataCircle={handleDataComponent} />
        )}
        {props.drag === 'RECT' && (
          <AddRect stageRef={stageRef} sendDataRect={handleDataComponent} />
        )}
        {props.drag === 'TRIAGLE' && (
          <AddShapeTriagle
            stageRef={stageRef}
            sendDataShape={handleDataComponent}
          />
        )}
        {props.drag === 'STAR' && (
          <AddStar stageRef={stageRef} sendDataStar={handleDataComponent} />
        )}
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
