import { Circle, Rect } from 'react-konva';
import {
  ComponenCanvasProps,
  DataCircleProps,
  DataRectProps,
} from '../freeBrushCanvasConfig';

export default function AnotherComponent({
  componenCanvas,
}: {
  componenCanvas: Array<ComponenCanvasProps> | [];
}) {
  return (
    <>
      {componenCanvas.map(cmp => {
        if (cmp.type === 'CIRCLE')
          return (
            <Circle
              id={cmp.data.id}
              radius={(cmp.data as DataCircleProps).radius}
              x={cmp.data.x}
              y={cmp.data.y}
              fill={cmp.data.fill}
              stroke={cmp.data.stroke}
              strokeWidth={cmp.data.strokeWidth}
              draggable
            />
          );
        else if (cmp.type === 'RECT')
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
              draggable={false}
            />
          );
      })}
    </>
  );
}
