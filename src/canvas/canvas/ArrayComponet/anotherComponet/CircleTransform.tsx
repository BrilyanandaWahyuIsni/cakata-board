import { useEffect, useRef } from 'react';
import {
  ComponenCanvasProps,
  DataCircleProps,
} from '../../freeBrushCanvasConfig';
import { Circle, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatch } from 'react-redux';
import { setShowCmp } from '../../../store/show-clickComponent';
import { Vector2d } from 'konva/lib/types';

export type ExportTransformProps = {
  id: string;
  pos: Vector2d;
  scale: Vector2d;
  rotation: number;
};

export type RectTransformProps = {
  cmp: ComponenCanvasProps;
  draggable: boolean;
  isSelected: boolean;
  handleClick: () => void;
  sendTransformData: ({
    id,
    pos,
    scale,
    rotation,
  }: ExportTransformProps) => void;
};
export default function CircleTransform({
  cmp,
  draggable,
  handleClick,
  isSelected,
  sendTransformData,
}: RectTransformProps) {
  const dispactch = useDispatch();

  const circleRef = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    sendTransformData({
      id: cmp.data.id,
      pos: evt.target.position(),
      scale: { x: cmp.data.scaleX, y: cmp.data.scaleY },
      rotation: cmp.data.rotation,
    });
  };

  const handleTransformENd = (evt: KonvaEventObject<Event>) => {
    sendTransformData({
      id: cmp.data.id,
      pos: evt.target.position(),
      scale: evt.target.scale() as Vector2d,
      rotation: evt.target.rotation(),
    });
  };

  useEffect(() => {
    if (isSelected && circleRef.current) {
      transformerRef.current?.nodes([circleRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
      dispactch(setShowCmp({ value: true }));
    }
  }, [cmp, dispactch, isSelected]);

  return (
    <>
      <Circle
        key={cmp.data.id}
        id={cmp.data.id}
        radius={(cmp.data as DataCircleProps).radius}
        x={cmp.data.x}
        y={cmp.data.y}
        scaleX={cmp.data.scaleX}
        scaleY={cmp.data.scaleY}
        rotation={cmp.data.rotation}
        fill={cmp.data.fill}
        stroke={cmp.data.stroke}
        strokeWidth={cmp.data.strokeWidth}
        ref={circleRef}
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
