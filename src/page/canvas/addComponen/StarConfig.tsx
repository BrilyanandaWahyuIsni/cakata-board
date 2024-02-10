import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Star } from 'react-konva';
import uuid4 from 'uuid4';
import { ComponenCanvasProps, DataStarProps } from '../freeBrushCanvasConfig';

type StarConfigProps = {
  event: KonvaEventObject<MouseEvent>;
  starRef: RefObject<Konva.Star>;
};
export function StarConfig({ event, starRef }: StarConfigProps) {
  const stage = event.target.getStage();

  if (stage) {
    const transform = stage.getAbsoluteTransform().copy().invert();
    if (starRef.current) {
      const posPointer = starRef.current.getStage()?.getPointerPosition();
      if (posPointer) {
        return transform.point(posPointer);
      }
    }
  }
}

type AddStar = {
  stageRef: RefObject<Konva.Stage>;
  sendDataStar: (value: ComponenCanvasProps) => void;
};

export function AddStar({ stageRef, sendDataStar }: AddStar) {
  const [addStar, setAddStar] = useState<DataStarProps | null>(null);
  const [firstPoint, setFirstPoint] = useState<Vector2d | null>(null);
  const isDrawing = useRef<boolean>(false);
  const starRef = useRef<Konva.Star>(null);

  useEffect(() => {
    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
      isDrawing.current = true;
      const newPos = StarConfig({ event, starRef });
      if (newPos) {
        setFirstPoint(newPos);
        setAddStar({
          id: uuid4(),
          fill: 'white',
          stroke: 'black',
          strokeWidth: 3,
          numPoints: 5,
          innerRadius: 10,
          outerRadius: 20,
          x: newPos.x,
          y: newPos.y,
          rotation: 180,
        });
      }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current) {
        return;
      }
      const newPos = StarConfig({ event, starRef });
      if (newPos && firstPoint) {
        const dx = newPos.x - firstPoint?.x;
        const dy = newPos.y - firstPoint?.y;
        const newInner = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const newOuter = newInner / 2;
        if (addStar) {
          const copyStar = addStar;
          setAddStar({
            ...copyStar,
            innerRadius: newInner,
            outerRadius: newOuter,
          });
        }
      }
    };

    const handleMouseUp = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        setFirstPoint(null);
      }
      if (addStar) {
        sendDataStar({ type: 'STAR', data: addStar });
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
  }, [addStar, firstPoint, sendDataStar, stageRef]);

  return (
    <Star
      id={addStar?.id}
      key={addStar?.id}
      numPoints={addStar ? addStar?.numPoints : 0}
      x={addStar?.x}
      y={addStar?.y}
      rotation={addStar?.rotation}
      innerRadius={addStar ? addStar?.innerRadius : 0}
      outerRadius={addStar ? addStar?.outerRadius : 0}
      fill={addStar?.fill}
      stroke={addStar?.stroke}
      strokeWidth={addStar?.strokeWidth}
      ref={starRef}
    />
  );
}
