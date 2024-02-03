import { useRef, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { modeCanvas } from '../config/GlobalVariabel';
import Konva from 'konva';
import {
  DataCircleProps,
  DataRectProps,
  FreeBrushCanvasProps,
  LineProps,
} from './freeBrushCanvasConfig';
import { LineMouseDown, LineMouseMove } from './addComponen/LineConfig';

function FreeBrushCanvas(props: FreeBrushCanvasProps) {
  const [lines, setLines] = useState<Array<LineProps> | []>([]);
  const [componenCanvas, setComponeCanvas] = useState<
    Array<ComponenCanvasProps> | []
  >([]);
  const stageRef = useRef<Konva.Stage>(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (
      props.drag === modeCanvas[modeCanvas.BRUSH] ||
      props.drag === modeCanvas[modeCanvas.ERASER]
    ) {
      isDrawing.current = true;
      const addPointLine = LineMouseDown(
        event,
        modeCanvas[modeCanvas.BRUSH],
        props.colorBrush,
        props.sizeBrush,
      );
      if (addPointLine) setLines(prev => [...prev, addPointLine]);
    } else {
      isDrawing.current = false;
    }

    // const stage = event.target.getStage();
    // if (stage) {
    //   const transform = event.target.getAbsoluteTransform().copy();
    //   transform.invert();

    //   const posPointer = stage.getPointerPosition();
    //   if (posPointer) {
    //     const pos = transform.point(posPointer);
    //     let typeBrush: GlobalCompositeOperation = 'source-over';
    //     if (props.drag === modeCanvas[modeCanvas.ERASER])
    //       typeBrush = 'destination-out';
    //     setLines(prev => [
    //       ...prev,
    //       {
    //         points: [pos.x, pos.y],
    //         stroke: props.colorBrush,
    //         strokeWidth: props.sizeBrush,
    //         modeCanvas: typeBrush,
    //       },
    //     ]);
    //   }
    // }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    if (
      props.drag === modeCanvas[modeCanvas.BRUSH] ||
      props.drag === modeCanvas[modeCanvas.ERASER]
    ) {
      const addLinePoint = LineMouseMove(event);
      if (addLinePoint) {
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat(addLinePoint);
        setLines([...lines.slice(0, -1), lastLine]);
      }
    }

    // const stage = event.target.getStage();
    // if (stage) {
    //   const transform = event.target.getAbsoluteTransform().copy();
    //   transform.invert();

    //   const posPointer = stage.getPointerPosition();

    //   const lastLine = lines[lines.length - 1];

    //   if (posPointer) {
    //     const pos = transform.point(posPointer);
    //     lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    //     // Mengganti state untuk memicu render ulang
    //     setLines([...lines.slice(0, -1), lastLine]);
    //   }
    // }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault(); // Menghentikan perilaku standar scroll

    const stage = event.target.getStage();
    if (stage) {
      const oldScale = stage.scaleX();

      const posPointer = stage.getPointerPosition();

      if (posPointer) {
        const pos = posPointer;
        const newScale = event.evt.deltaY < 0 ? oldScale * 1.1 : oldScale / 1.1;

        const mousePointTo = {
          x: (pos.x - stage.x()) / oldScale,
          y: (pos.y - stage.y()) / oldScale,
        };

        stage.scale({ x: newScale, y: newScale });
        props.handleSendScale(newScale);

        const newPos = {
          x: pos.x - mousePointTo.x * newScale,
          y: pos.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onWheel={handleWheel}
      draggable={props.drag === modeCanvas[modeCanvas.PAN]}
      ref={stageRef}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.modeCanvas}
          />
        ))}
        {componenCanvas.map(cmp => {
          if (cmp.type === 'CIRCLE')
            return (
              <Circle
                id={cmp.data.id}
                radius={(cmp.data as DataCircleProps).radius}
                x={cmp.data.x}
                y={cmp.data.y}
                fill={cmp.data.fill}
                stroke={cmp.data.stroke}
                strokeWidth={cmp.data.strokeWidth}
                draggable
              />
            );
          else if (cmp.type === 'RECT')
            return (
              <Rect
                id={cmp.data.id}
                width={(cmp.data as DataRectProps).width}
                height={(cmp.data as DataRectProps).height}
                x={cmp.data.x}
                y={cmp.data.y}
                fill={cmp.data.fill}
                stroke={cmp.data.stroke}
                strokeWidth={cmp.data.strokeWidth}
                draggable
              />
            );
        })}
      </Layer>
    </Stage>
  );
}

export default FreeBrushCanvas;
