import { ComponenCanvasProps } from '../freeBrushCanvasConfig';
import RectTransform, {
  ExportTransformProps,
} from './anotherComponet/RectTransform';
import { Fragment } from 'react';
import CircleTransform from './anotherComponet/CircleTransform';
import ShapeTransform from './anotherComponet/ShapeTransform';
import StarTransform from './anotherComponet/StarTransform';
import ImageTransform from './anotherComponet/ImageTransform';
import TextTransform from './anotherComponet/TextTransform';

export default function AnotherComponent({
  componenCanvas,
  draggable,
  selectedCmp,
  sendIdSelectedCmp,
  sendTransformData,
}: {
  componenCanvas: Array<ComponenCanvasProps> | [];
  draggable: boolean;
  selectedCmp: string | null | undefined;
  sendIdSelectedCmp: (value: string) => void;
  sendTransformData: ({
    id,
    pos,
    scale,
    rotation,
  }: ExportTransformProps) => void;
}) {
  const handleClickComponent = (value: string) => {
    sendIdSelectedCmp(value);
  };

  return (
    <Fragment>
      {componenCanvas.map(cmp => {
        if (cmp.type === 'CIRCLE') {
          return (
            <CircleTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        } else if (cmp.type === 'RECT') {
          return (
            <RectTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        } else if (cmp.type === 'TRIAGLE') {
          return (
            <ShapeTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        } else if (cmp.type === 'STAR') {
          return (
            <StarTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        } else if (cmp.type === 'TEXT') {
          return (
            <TextTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        } else if (cmp.type === 'IMAGE') {
          return (
            <ImageTransform
              sendTransformData={sendTransformData}
              cmp={cmp}
              draggable={draggable}
              handleClick={() => handleClickComponent(cmp.data.id)}
              isSelected={draggable && cmp.data.id === selectedCmp}
            />
          );
        }
      })}
    </Fragment>
  );
}
