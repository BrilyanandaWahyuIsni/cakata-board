import { Circle, Image, Shape, Star, Text } from 'react-konva';
import {
  ComponenCanvasProps,
  DataCircleProps,
  DataImageProps,
  DataShapeProps,
  DataStarProps,
  DataTextProps,
} from '../freeBrushCanvasConfig';
import RectTransform, {
  SendNewPosProps,
} from './anotherComponet/RectTransform';
import { useState } from 'react';

export default function AnotherComponent({
  componenCanvas,
  draggable,
  sendDataPos,
}: {
  componenCanvas: Array<ComponenCanvasProps> | [];
  draggable: boolean;
  sendDataPos: ({ pos, index }: SendNewPosProps) => void;
}) {
  const [selectedCmp, setSelectedCmp] = useState<string | null>(null);
  const handleClickComponent = (id: string) => {
    setSelectedCmp(id);
  };

  const handleSendNewPos = ({ pos, index }: SendNewPosProps) => {
    sendDataPos({ pos, index });
  };

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
            <RectTransform
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
              sendNewPos={handleSendNewPos}
            />
          );
        } else if (cmp.type === 'TRIAGLE') {
          return (
            <Shape
              id={cmp.data.id}
              key={cmp.data.id}
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
              draggable={draggable}
            />
          );
        } else if (cmp.type === 'STAR') {
          return (
            <Star
              id={cmp.data?.id}
              key={cmp.data?.id}
              numPoints={cmp.data ? (cmp.data as DataStarProps).numPoints : 0}
              x={cmp.data?.x}
              y={cmp.data?.y}
              rotation={(cmp.data as DataStarProps).rotation}
              innerRadius={
                cmp.data ? (cmp.data as DataStarProps).innerRadius : 0
              }
              outerRadius={
                cmp.data ? (cmp.data as DataStarProps).outerRadius : 0
              }
              fill={cmp.data?.fill}
              stroke={cmp.data?.stroke}
              strokeWidth={cmp.data?.strokeWidth}
              draggable={draggable}
            />
          );
        } else if (cmp.type === 'TEXT') {
          return (
            <Text
              id={cmp.data.id}
              key={cmp.data.id}
              text={(cmp.data as DataTextProps).text}
              x={cmp.data.x}
              y={
                cmp ? cmp.data.y - (cmp.data as DataTextProps).fontSize + 2 : 0
              }
              fontSize={(cmp.data as DataTextProps).fontSize}
              fontFamily={(cmp.data as DataTextProps).fontFamily}
              fill={cmp.data.fill}
              draggable={draggable}
            />
          );
        } else if (cmp.type === 'IMAGE') {
          return (
            <Image
              key={cmp.data.id}
              id={cmp.data.id}
              image={(cmp.data as DataImageProps).image}
              draggable={draggable}
            />
          );
        }
      })}
    </>
  );
}
