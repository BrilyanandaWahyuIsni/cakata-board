import { useEffect, useRef } from 'react';
import {
  ComponenCanvasProps,
  DataRectProps,
} from '../../freeBrushCanvasConfig';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatch } from 'react-redux';
import { setShowCmp } from '../../../store/show-clickComponent';

export type RectTransformProps = {
  cmp: ComponenCanvasProps;
  draggable: boolean;
  isSelected: boolean;
  handleClick: () => void;
};
export default function RectTransform({
  cmp,
  draggable,
  handleClick,
  isSelected,
}: RectTransformProps) {
  const dispactch = useDispatch();

  const rectRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleDragEnd = (evt: KonvaEventObject<DragEvent>) => {
    // sendNewPos({
    //   pos: {
    //     x: isSelected ? dataReact.posX : cmp.data.x,
    //     y: isSelected ? dataReact.posY : cmp.data.y,
    //   },
    //   index: cmp.data.id,
    // });
  };

  useEffect(() => {
    if (isSelected && rectRef.current) {
      transformerRef.current?.nodes([rectRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
      dispactch(setShowCmp({ value: true }));
    }
  }, [cmp, dispactch, isSelected]);

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
