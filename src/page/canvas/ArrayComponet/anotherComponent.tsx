import { Circle, Rect } from 'react-konva';
import {
  ComponenCanvasProps,
  DataCircleProps,
  DataRectProps,
} from '../freeBrushCanvasConfig';

export default function AnotherComponent({
  componenCanvas,
  draggable,
}: {
  componenCanvas: Array<ComponenCanvasProps> | [];
  draggable: boolean;
}) {
  return (
    <>
      {componenCanvas.map(cmp => {
        if (cmp.type === 'CIRCLE') {
          return (
            <Circle
              id={cmp.data.id}
              key={cmp.data.id}
              radius={(cmp.data as DataCircleProps).radius}
              rotation={(cmp.data as DataCircleProps).rotation}
              x={cmp.data.x}
              y={cmp.data.y}
              fill={cmp.data.fill}
              stroke={cmp.data.stroke}
              strokeWidth={cmp.data.strokeWidth}
              draggable={draggable}
            />
          );
        } else if (cmp.type === 'RECT') {
          return (
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
              draggable={draggable}
            />
          );
        }
      })}
    </>
  );
}
