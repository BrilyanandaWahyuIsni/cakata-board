import { Circle, Rect, Shape } from 'react-konva';
import {
  ComponenCanvasProps,
  DataCircleProps,
  DataRectProps,
  DataShapeProps,
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
        } else if (cmp.type === 'TRIAGLE') {
          return (
            <Shape
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(
                  (cmp.data as DataShapeProps).customPoint[0],
                  (cmp.data as DataShapeProps).customPoint[1],
                );
                for (
                  let i = 2;
                  i < (cmp.data as DataShapeProps).customPoint.length;
                  i += 2
                ) {
                  context.lineTo(
                    (cmp.data as DataShapeProps).customPoint[i],
                    (cmp.data as DataShapeProps).customPoint[i + 1],
                  );
                }
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              x={cmp.data.x}
              y={cmp.data.y}
              fill={cmp.data.fill}
              stroke={cmp.data.stroke}
              strokeWidth={4}
            />
          );
        }
      })}
    </>
  );
}
