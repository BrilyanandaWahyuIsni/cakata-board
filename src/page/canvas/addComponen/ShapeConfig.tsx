import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Shape } from 'react-konva';
import uuid4 from 'uuid4';
import { ComponenCanvasProps, DataShapeProps } from '../freeBrushCanvasConfig';

type ShapeConfigProps = {
  event: KonvaEventObject<MouseEvent>;
  shapeRef: RefObject<Konva.Shape>;
};
export function ShapeConfig({ event, shapeRef }: ShapeConfigProps) {
  const stage = event.target.getStage();
  if (stage) {
    if (shapeRef.current) {
      const transform = stage.getAbsoluteTransform().copy().invert();
      const posPointer = shapeRef.current.getStage()?.getPointerPosition();
      if (posPointer) {
        return transform.point(posPointer);
      }
    }
  }
}

type AddShapeTriagleProps = {
  stageRef: RefObject<Konva.Stage>;
  sendDataShape: (value: ComponenCanvasProps) => void;
};

export function AddShapeTriagle({
  stageRef,
  sendDataShape,
}: AddShapeTriagleProps) {
  const [addShape, setAddShape] = useState<DataShapeProps | null>(null);
  const [firstPoint, setFirstPoint] = useState<Vector2d | null>(null);
  const shapeRef = useRef<Konva.Shape>(null);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
      isDrawing.current = true;
      const pos = ShapeConfig({ event, shapeRef });
      if (pos) {
        setFirstPoint(pos);
        setAddShape({
          id: uuid4(),
          x: pos?.x,
          y: pos?.y,
          fill: 'transparent',
          stroke: 'black',
          strokeWidth: 4,
          customPoint: [0, 0, 0, 0, 0, 0],
        });
      }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing) {
        return;
      }

      const newPoint = ShapeConfig({ event, shapeRef });
      if (newPoint && addShape && firstPoint) {
        const copyShape = addShape;
        const dx = newPoint.x - firstPoint.x;
        const dy = newPoint.y - firstPoint.y;
        setAddShape({ ...copyShape, customPoint: [0, 0, dx, 0, 0.5 * dx, dy] });
      }
    };

    const handleMouseUp = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        setFirstPoint(null);
      }
      if (addShape) {
        sendDataShape({ type: 'TRIAGLE', data: addShape });
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
  }, [addShape, firstPoint, sendDataShape, stageRef]);

  return (
    <Shape
      sceneFunc={(context, shape) => {
        if (addShape) {
          context.beginPath();
          context.moveTo(addShape?.customPoint[0], addShape?.customPoint[1]);
          for (let i = 2; i < addShape.customPoint.length; i += 2) {
            context.lineTo(
              addShape.customPoint[i],
              addShape.customPoint[i + 1],
            );
          }
          context.closePath();
          context.fillStrokeShape(shape);
        }
      }}
      x={addShape?.x}
      y={addShape?.y}
      fill={addShape?.fill}
      stroke={addShape?.stroke}
      strokeWidth={4}
      ref={shapeRef}
    />
  );
}
