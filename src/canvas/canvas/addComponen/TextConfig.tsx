import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Circle, Text } from 'react-konva';
import uuid4 from 'uuid4';
import { ComponenCanvasProps, DataTextProps } from '../freeBrushCanvasConfig';

type TextConfigProps = {
  event: KonvaEventObject<MouseEvent>;
  textRef: RefObject<Konva.Text>;
};
export function TextConfig({ event, textRef }: TextConfigProps) {
  const stage = event.target.getStage();

  if (stage) {
    const transform = stage.getAbsoluteTransform().copy().invert();
    if (textRef.current) {
      const posPointer = textRef.current.getStage()?.getPointerPosition();
      if (posPointer) {
        return transform.point(posPointer);
      }
    }
  }
}

type AddTextProps = {
  stageRef: RefObject<Konva.Stage>;
  sendDataText: (value: ComponenCanvasProps) => void;
};
export function AddText({ stageRef, sendDataText }: AddTextProps) {
  const [addText, setAddText] = useState<DataTextProps | null>(null);
  const [firstPoint, setFirstPoint] = useState<Vector2d | null>(null);
  const isDrawing = useRef<boolean>(false);
  const isEditing = useRef<boolean>(false);
  const textRef = useRef<Konva.Text>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event && isEditing.current) {
        if (event.key === 'Enter') {
          isEditing.current = false;
          if (addText) {
            sendDataText({ type: 'TEXT', data: addText });
          }
        } else if (
          event.key === 'Backspace' ||
          event.key === 'Delete' ||
          event.key === 'Shift'
        ) {
          if (event.key === 'Backspace' && addText) {
            const copyAddText = addText;
            setAddText({ ...copyAddText, text: copyAddText.text.slice(0, -1) });
          }
          event.preventDefault();
        } else {
          if (addText) {
            const copyAddText = addText;
            setAddText({ ...addText, text: copyAddText.text + event.key });
          }
        }
      }
    };

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current && addText && addText?.text !== '') {
        if (addText) {
          sendDataText({ type: 'TEXT', data: addText });
        }
      }

      if (isEditing.current) {
        isEditing.current = false;
      }
      isDrawing.current = true;
      const posText = TextConfig({ event, textRef });
      if (posText) {
        setAddText({
          id: uuid4(),
          text: '',
          x: posText.x,
          y: posText.y,
          fill: 'black',
          fontFamily: 'arial',
          fontSize: 20,
          stroke: '',
          strokeWidth: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        });
      }
    };

    // const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    //   if (!isDrawing.current) {
    //     return;
    //   }
    // };

    const handleMouseUp = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        setFirstPoint(null);
      }
      if (!isEditing.current) {
        isEditing.current = true;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (stageRef.current) {
      stageRef.current.on('mousedown', handleMouseDown);
      // stageRef.current.on('mousemove', handleMouseMove);
      stageRef.current.on('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (stageRef.current) {
        stageRef.current.off('mousedown', handleMouseDown);
        // stageRef.current.off('mousemove', handleMouseMove);
        stageRef.current.off('mouseup', handleMouseUp);
      }
    };
  }, [addText, firstPoint, stageRef, isDrawing, isEditing, sendDataText]);

  return (
    <>
      {isEditing && (
        <Circle x={addText?.x} y={addText?.y} fill="salmon" radius={2} />
      )}
      <Text
        id={addText?.id}
        key={addText?.id}
        text={addText?.text}
        x={addText?.x}
        y={addText ? addText?.y - addText.fontSize + 2 : 0}
        scaleX={addText?.scaleX}
        scaleY={addText?.scaleY}
        rotation={addText?.rotation}
        fontSize={addText?.fontSize}
        fontFamily={addText?.fontFamily}
        fill={addText?.fill}
        ref={textRef}
      />
    </>
  );
}
