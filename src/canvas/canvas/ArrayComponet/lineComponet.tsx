import { Line } from 'react-konva';
import { LineProps } from '../freeBrushCanvasConfig';

export default function LineComponet({
  lines,
}: {
  lines: Array<LineProps> | [];
}) {
  return (
    <>
      {lines.map((line, i) => (
        <Line
          key={i}
          id={line.id}
          points={line.points}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={line.modeCanvas}
        />
      ))}
    </>
  );
}
