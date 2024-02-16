import { useEffect, useRef } from 'react';
import {
  ComponenCanvasProps,
  DataTextProps,
} from '../../freeBrushCanvasConfig';
import { Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatch } from 'react-redux';
import { setShowCmp } from '../../../store/show-clickComponent';
import { Vector2d } from 'konva/lib/types';

export type ExportTransformProps = {
  id: string;
  pos: Vector2d;
  scale: Vector2d;
};

export type RectTransformProps = {
  cmp: ComponenCanvasProps;
  draggable: boolean;
  isSelected: boolean;
  handleClick: () => void;
  sendTransformData: ({ id, pos, scale }: ExportTransformProps) => void;
};
export default function TextTransform({
  cmp,
  draggable,
  handleClick,
  isSelected,
  sendTransformData,
}: RectTransformProps) {
  const dispactch = useDispatch();

  const textRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    sendTransformData({
      id: cmp.data.id,
      pos: evt.target.position(),
      scale: { x: cmp.data.scaleX, y: cmp.data.scaleY },
    });
  };

  const handleTransformENd = (evt: KonvaEventObject<Event>) => {
    sendTransformData({
      id: cmp.data.id,
      pos: evt.target.position(),
      scale: evt.target.scale() as Vector2d,
    });
  };

  useEffect(() => {
    if (isSelected && textRef.current) {
      transformerRef.current?.nodes([textRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
      dispactch(setShowCmp({ value: true }));
    }
  }, [cmp, dispactch, isSelected]);

  return (
    <>
      <Text
        key={cmp.data.id}
        id={cmp.data.id}
        text={(cmp.data as DataTextProps).text}
        x={cmp.data.x}
        y={cmp.data.y - (cmp.data as DataTextProps).fontSize + 2}
        fontFamily={(cmp.data as DataTextProps).fontFamily}
        fontSize={(cmp.data as DataTextProps).fontSize}
        scaleX={cmp.data.scaleX}
        scaleY={cmp.data.scaleY}
        fill={cmp.data.fill}
        stroke={cmp.data.stroke}
        strokeWidth={cmp.data.strokeWidth}
        ref={textRef}
        draggable={draggable}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformENd}
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
