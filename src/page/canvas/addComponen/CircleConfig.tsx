import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject } from 'react';
import { DataCircleProps } from '../freeBrushCanvasConfig';

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
      };
      return dataCircle;
    }
  }
}
