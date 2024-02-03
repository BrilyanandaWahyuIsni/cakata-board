import { KonvaEventObject } from 'konva/lib/Node';
import { modeCanvas } from '../../config/GlobalVariabel';

export function LineMouseDown(
  eventStage: KonvaEventObject<MouseEvent>,
  brushType: string,
  colorBrush: string,
  sizeBrush: number,
) {
  const stage = eventStage.target.getStage();
  if (stage) {
    const transform = eventStage.target.getAbsoluteTransform().copy();
    transform.invert();

    const posPointer = stage.getPointerPosition();
    if (posPointer) {
      const pos = transform.point(posPointer);
      let typeBrush: GlobalCompositeOperation = 'source-over';
      if (brushType === modeCanvas[modeCanvas.ERASER])
        typeBrush = 'destination-out';

      return {
        points: [pos.x, pos.y],
        stroke: colorBrush,
        strokeWidth: sizeBrush,
        modeCanvas: typeBrush,
      };
    }
  }
}

export function LineMouseMove(eventStage: KonvaEventObject<MouseEvent>) {
  const stage = eventStage.target.getStage();
  if (stage) {
    const transform = eventStage.target.getAbsoluteTransform().copy();
    transform.invert();

    const posPointer = stage.getPointerPosition();
    if (posPointer) {
      const pos = transform.point(posPointer);
      return [pos.x, pos.y];
    }
  }
}
