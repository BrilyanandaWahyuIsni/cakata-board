import { useEffect, useRef } from 'react';
import {
  ComponenCanvasProps,
  DataStarProps,
} from '../../freeBrushCanvasConfig';
import { Star, Transformer } from 'react-konva';
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
export default function StarTransform({
  cmp,
  draggable,
  handleClick,
  isSelected,
  sendTransformData,
}: RectTransformProps) {
  const dispactch = useDispatch();

  const starRef = useRef<Konva.Star>(null);
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
      pos: { x: cmp.data.x, y: cmp.data.y },
      scale: evt.target.scale() as Vector2d,
    });
  };

  useEffect(() => {
    if (isSelected && starRef.current) {
      transformerRef.current?.nodes([starRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
      dispactch(setShowCmp({ value: true }));
    }
  }, [cmp, dispactch, isSelected]);

  return (
    <>
      <Star
        key={cmp.data.id}
        id={cmp.data.id}
        x={cmp.data.x}
        y={cmp.data.y}
        numPoints={(cmp.data as DataStarProps).numPoints}
        innerRadius={(cmp.data as DataStarProps).innerRadius}
        outerRadius={(cmp.data as DataStarProps).outerRadius}
        rotation={(cmp.data as DataStarProps).rotation}
        scaleX={cmp.data.scaleX}
        scaleY={cmp.data.scaleY}
        fill={cmp.data.fill}
        stroke={cmp.data.stroke}
        strokeWidth={cmp.data.strokeWidth}
        ref={starRef}
        draggable={draggable}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformENd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={false}
          borderStrokeWidth={1}
          anchorFill="#ffffff"
          borderDash={[2, 2]}
          borderStroke="#00ffff"
          // rotateEnabled={false}
          rotateAnchorOffset={10}
        />
      )}
    </>
  );
}
