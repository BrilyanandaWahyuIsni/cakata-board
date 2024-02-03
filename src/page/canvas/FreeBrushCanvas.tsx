import { useRef, useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import {
  ComponenCanvasProps,
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

function FreeBrushCanvas(props: FreeBrushCanvasProps) {
  const [lines, setLines] = useState<Array<LineProps> | []>([]);
  const [componenCanvas, setComponeCanvas] = useState<
    Array<ComponenCanvasProps> | []
  >([]);
  const [poinSemetara, setPoinSementara] = useState<Array<number> | []>([]);
  const [modeBrushSementara, setModeBrushSementara] =
    useState<GlobalCompositeOperation>('source-over');

  const [lastId, setLastId] = useState<string>('');

  const stageRef = useRef<Konva.Stage>(null);
  const isDrawing = useRef(false);
  const lineRef = useRef<Konva.Line>(null);

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
        setPoinSementara(addPointLine.points);
        setModeBrushSementara(addPointLine.modeCanvas);
        setLines(prev => [...prev, addPointLine]);
      }
    }

    if (props.drag === 'RECT') {
      isDrawing.current = true;
      const addPoint = RectConfigMouseDownOrMove(event);
      if (addPoint) {
        const newRect: DataRectProps = {
          id: uuid4(),
          fill: 'white',
          height: 0,
          width: 0,
          x: addPoint.x,
          y: addPoint.y,
          stroke: 'black',
          strokeWidth: 5,
        };
        setComponeCanvas(prev => [...prev, { type: 'RECT', data: newRect }]);
      }
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    if (props.drag === 'BRUSH' || props.drag === 'ERASER') {
      const addLinePoint = LineMouseMove(event, lineRef);
      if (addLinePoint) {
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat(addLinePoint);
        setPoinSementara(prev => [...prev, ...addLinePoint]);
        setLines([...lines.slice(0, -1), lastLine]);
      }
    }

    if (props.drag === 'RECT') {
      const changePoint = RectConfigMouseDownOrMove(event);
      if (changePoint) {
        const getLastComponent = componenCanvas[componenCanvas.length - 1];
        const firstPointX = getLastComponent.data.x;
        const firstPointY = getLastComponent.data.y;
        (getLastComponent.data as DataRectProps).width =
          changePoint.x - firstPointX;
        (getLastComponent.data as DataRectProps).height =
          changePoint.y - firstPointY;
        setComponeCanvas(prev => [...prev.slice(0, -1), getLastComponent]);
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    const newScale = zoomInOut(event);
    if (newScale) props.handleSendScale(newScale);
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
        <AnotherComponent componenCanvas={componenCanvas} />
        {/* <Rect
          key={lastId}
          id={lastId}
          width={(cmp.data as DataRectProps).width}
          height={(cmp.data as DataRectProps).height}
          x={cmp.data.x}
          y={cmp.data.y}
          fill={cmp.data.fill}
          stroke={cmp.data.stroke}
          strokeWidth={cmp.data.strokeWidth}
        /> */}
      </Layer>
      <Layer>
        <LineComponet lines={lines} />
        <Line
          key={'ini_spesial'}
          points={poinSemetara}
          stroke={props.colorBrush}
          strokeWidth={props.sizeBrush}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={modeBrushSementara}
          ref={lineRef}
        />
      </Layer>
    </Stage>
  );
}

export default FreeBrushCanvas;
