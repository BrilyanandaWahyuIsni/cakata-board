import { useEffect } from 'react';
import { Image } from 'react-konva';
import { ComponenCanvasProps } from '../freeBrushCanvasConfig';
import uuid4 from 'uuid4';

type DataImageConfig = {
  image: CanvasImageSource;
  sendDataImage: (value: ComponenCanvasProps) => void;
};
export function AddImage({ image, sendDataImage }: DataImageConfig) {
  useEffect(() => {
    if (image) {
      sendDataImage({
        type: 'IMAGE',
        data: {
          id: uuid4(),
          image: image,
          x: 0,
          y: 0,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 2,
        },
      });
    }
  }, []);
  return <Image image={image} />;
}
