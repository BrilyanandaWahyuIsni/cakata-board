import { KonvaEventObject } from 'konva/lib/Node';
import { modeCanvas } from '../../config/GlobalVariabel';
import Konva from 'konva';
import React from 'react';

type LineMouseDownProps = {
  id: string;
  eventStage: KonvaEventObject<MouseEvent>;
  eventLine: React.RefObject<Konva.Line>;
  brushType: modeCanvas;
  colorBrush: string;
  sizeBrush: number;
};
export function LineMouseDown({
  id,
  eventStage,
  eventLine,
  brushType,
  colorBrush,
  sizeBrush,
}: LineMouseDownProps) {
  const stage = eventStage.target.getStage();
  if (stage) {
    if (eventLine.current) {
      // const transform = eventStage.target.getAbsoluteTransform().copy();
      const transform = eventLine.current.getAbsoluteTransform().copy();
      transform.invert();

      const posPointer = stage.getPointerPosition();
      if (posPointer) {
        const pos = transform.point(posPointer);
        let typeBrush: GlobalCompositeOperation = 'source-over';
        if (brushType === 'ERASER') {
          typeBrush = 'destination-out';
        }

        return {
          points: [pos.x, pos.y],
          stroke: colorBrush,
          strokeWidth: sizeBrush,
          modeCanvas: typeBrush,
          id: id,
        };
      }
    }
  }
}

export function LineMouseMove(
  eventStage: KonvaEventObject<MouseEvent>,
  eventLine: React.RefObject<Konva.Line>,
) {
  const stage = eventStage.target.getStage();
  if (stage) {
    if (eventLine.current) {
      // const transform = eventStage.target.getAbsoluteTransform().copy();
      const transform = eventLine.current.getAbsoluteTransform().copy();
      transform.invert();

      const posPointer = stage.getPointerPosition();
      if (posPointer) {
        const pos = transform.point(posPointer);
        return [pos.x, pos.y];
      }
    }
  }
}
