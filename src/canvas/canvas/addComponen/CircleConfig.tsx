import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject, useEffect, useRef, useState } from 'react';
import { ComponenCanvasProps, DataCircleProps } from '../freeBrushCanvasConfig';
import { Circle } from 'react-konva';
import uuid4 from 'uuid4';
import { Vector2d } from 'konva/lib/types';

export function CircleConfigMouseDown(
  id: string,
  event: KonvaEventObject<MouseEvent>,
  circleRef: RefObject<Konva.Circle>,
) {
  const stage = event.target.getStage();
  if (stage) {
    const transform = stage.getAbsoluteTransform().copy().invert();
    const posPointer = circleRef.current?.getStage()?.getPointerPosition();
    if (posPointer) {
      const pos = transform.point(posPointer);
      const dataCircle: DataCircleProps = {
        id: id,
        radius: 0,
        rotation: 0,
        x: pos.x * Math.cos(0),
        y: pos.y * Math.cos(0),
        stroke: 'black',
        strokeWidth: 5,
        fill: 'white',
        scaleX: 1,
        scaleY: 1,
      };
      return dataCircle;
    }
  }
}

type CircleConfigProps = {
  stageRef: RefObject<Konva.Stage>;
  sendDataCircle: (value: ComponenCanvasProps) => void;
};
export function AddCircle({ stageRef, sendDataCircle }: CircleConfigProps) {
  const circleRef = useRef<Konva.Circle>(null);
  const [firstPoint, setFirstPoint] = useState<Vector2d | null>(null);
  const [addCircle, setAddCircle] = useState<DataCircleProps | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
      isDrawing.current = true;
      const changePoinCircle = CircleConfigMouseDown(uuid4(), e, circleRef);
      if (changePoinCircle) {
        setFirstPoint({ x: changePoinCircle.x, y: changePoinCircle.y });
        setAddCircle(changePoinCircle);
      }
    };
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing) {
        return;
      }

      if (addCircle) {
        const changePoinCircle = CircleConfigMouseDown(
          addCircle?.id,
          e,
          circleRef,
        );
        if (changePoinCircle) {
          if (addCircle && firstPoint) {
            const dx = changePoinCircle.x - firstPoint?.x;
            const dy = changePoinCircle.y - firstPoint?.y;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { radius, ...other } = addCircle;
            const newRadius = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            setAddCircle({ ...other, radius: newRadius });
          }
        }
      }
    };
    const handleMouseUp = () => {
      isDrawing.current = false;
      if (firstPoint) {
        setFirstPoint(null);
      }
      if (addCircle) {
        sendDataCircle({ type: 'CIRCLE', data: addCircle });
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
  }, [addCircle, firstPoint, sendDataCircle, stageRef]);

  return (
    <Circle
      key={addCircle?.id}
      id={addCircle?.id}
      radius={addCircle?.radius}
      x={addCircle?.x}
      y={addCircle?.y}
      fill={addCircle?.fill}
      stroke={addCircle?.stroke}
      strokeWidth={addCircle?.strokeWidth}
      scaleX={addCircle?.scaleX}
      scaleY={addCircle?.scaleY}
      ref={circleRef}
    />
  );
}
