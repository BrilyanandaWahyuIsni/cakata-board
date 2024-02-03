import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

export const zoomInOut = (event: KonvaEventObject<WheelEvent>) => {
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

      const newPos = {
        x: pos.x - mousePointTo.x * newScale,
        y: pos.y - mousePointTo.y * newScale,
      };

      stage.position(newPos);
      stage.batchDraw();
      return newScale;
    }
  }
};
