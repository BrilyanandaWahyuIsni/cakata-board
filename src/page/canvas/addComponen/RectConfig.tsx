import { KonvaEventObject } from 'konva/lib/Node';

export function RectConfigMouseDownOrMove(event: KonvaEventObject<MouseEvent>) {
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
