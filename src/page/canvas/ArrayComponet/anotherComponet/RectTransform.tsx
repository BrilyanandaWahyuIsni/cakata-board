import { useEffect, useRef } from 'react';
import {
  ComponenCanvasProps,
  DataRectProps,
} from '../../freeBrushCanvasConfig';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';

export type SendNewPosProps = {
  pos: Vector2d;
  index: string;
};

export type RectTransformProps = {
  cmp: ComponenCanvasProps;
  draggable: boolean;
  isSelected: boolean;
  handleClick: () => void;
  sendNewPos: ({ pos, index }: SendNewPosProps) => void;
};
export default function RectTransform({
  cmp,
  draggable,
  handleClick,
  isSelected,
  sendNewPos,
}: RectTransformProps) {
  const rectRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    sendNewPos({
      pos: { x: evt.target.x(), y: evt.target.y() },
      index: cmp.data.id,
    });
  };

  useEffect(() => {
    if (isSelected && rectRef.current) {
      transformerRef.current?.nodes([rectRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        key={cmp.data.id}
        id={cmp.data.id}
        width={(cmp.data as DataRectProps).width}
        height={(cmp.data as DataRectProps).height}
        x={cmp.data.x}
        y={cmp.data.y}
        fill={cmp.data.fill}
        stroke={cmp.data.stroke}
        strokeWidth={cmp.data.strokeWidth}
        ref={rectRef}
        draggable={draggable}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={false}
          borderStrokeWidth={0} // Menonaktifkan border untuk Transformer
          anchorFill="#ffffff" // Warna fill untuk anchor point
          borderDash={[2, 2]} // Garis putus-putus untuk garis yang mengelilingi bentuk
          borderStroke="#00ffff" // Warna stroke untuk garis yang mengelilingi bentuk
        />
      )}
    </>
  );
}
