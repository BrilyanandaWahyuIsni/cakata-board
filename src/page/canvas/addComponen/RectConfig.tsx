import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Rect } from 'react-konva';
import { ComponenCanvasProps, DataRectProps } from '../freeBrushCanvasConfig';
import uuid4 from 'uuid4';
import { Vector2d } from 'konva/lib/types';

type RectConfigMouseDownOrMoveProps = {
  event: KonvaEventObject<MouseEvent>;
  id: string;
  rectRef: React.RefObject<Konva.Rect>;
};
export function RectConfigMouseDownOrMove({
  event,
  id,
  rectRef,
}: RectConfigMouseDownOrMoveProps) {
  const stage = event.target.getStage();
  if (stage) {
    if (rectRef.current) {
      const transform = stage.getAbsoluteTransform().copy().invert();
      const posPointer = rectRef.current.getStage()?.getPointerPosition();

      if (posPointer) {
        const pos = transform.point(posPointer);
        return {
          id: id,
          fill: 'white',
          height: 0,
          width: 0,
          x: pos.x,
          y: pos.y,
          stroke: 'black',
          strokeWidth: 5,
        };
      }
    }
  }
}

type RectConfigProps = {
  stageRef: RefObject<Konva.Stage>;
  sendDataRect: (value: ComponenCanvasProps) => void;
};
export function AddRect({ stageRef, sendDataRect }: RectConfigProps) {
  const [addRect, setAddRect] = useState<DataRectProps | null>(null);
  const [firstPoint, setFirstPoint] = useState<Vector2d | null>(null);

  const rectRef = useRef<Konva.Rect>(null);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
      isDrawing.current = true;
      const addPoint = RectConfigMouseDownOrMove({
        id: uuid4(),
        event: event,
        rectRef: rectRef,
      });
      if (addPoint) {
        setAddRect(addPoint);
        setFirstPoint({ x: addPoint.x, y: addPoint.y });
      }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing) {
        return;
      }

      if (addRect) {
        const changePoint = RectConfigMouseDownOrMove({
          id: addRect?.id,
          event: event,
          rectRef: rectRef,
        });

        if (changePoint && firstPoint) {
          const other = addRect;
          const newWidth = changePoint.x - firstPoint?.x;
          const newHeight = changePoint.y - firstPoint.y;
          setAddRect({ ...other, width: newWidth, height: newHeight });
        }
      }
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
      if (firstPoint) {
        setFirstPoint(null);
      }
      if (addRect) {
        sendDataRect({ type: 'RECT', data: addRect });
      }
    };

    if (stageRef.current) {
      stageRef.current.on('mousedown', handleMouseDown);
      stageRef.current.on('mousemove', handleMouseMove);
      stageRef.current.on('mouseup', handleMouseUp);
    }
    return () => {
      if (stageRef.current) {
        stageRef.current.off('mousedown', handleMouseDown);
        stageRef.current.off('mousemove', handleMouseMove);
        stageRef.current.off('mouseup', handleMouseUp);
      }
    };
  }, [addRect, firstPoint, sendDataRect, stageRef]);

  return (
    <Rect
      key={addRect?.id}
      id={addRect?.id}
      width={addRect?.width}
      height={addRect?.height}
      x={addRect?.x}
      y={addRect?.y}
      fill={'white'}
      stroke={'black'}
      strokeWidth={1}
      ref={rectRef}
    />
  );
}
