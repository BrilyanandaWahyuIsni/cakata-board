import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

export function RectConfigMouseDownOrMove(
  event: KonvaEventObject<MouseEvent>,
  id: string,
  rectRef: React.RefObject<Konva.Rect>,
) {
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
export function RectConfigMouseMove(event: KonvaEventObject<MouseEvent>) {
  const stage = event.target.getStage();
  if (stage) {
    const transform = event.target.getTransform().copy();
    transform.invert();

    const posPointer = stage.getPointerPosition();
    if (posPointer) {
      const pos = transform.point(posPointer);
      return pos;
    }
  }
}
export function RectConfigMouseUp() {}
