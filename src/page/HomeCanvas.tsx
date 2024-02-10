import { useEffect, useState } from 'react';
import FreeBrushCanvas from './canvas/FreeBrushCanvas';
import MainMenu from './menu/MainMenu';
import { defaultBrushAdd, modeCanvas } from './config/GlobalVariabel';
import { modePointerWindows } from './config/AppConfig';
import MainColor from './menu/MainColor';
import MenuCustom from './menu/MenuCustom';

export default function HomeCanvas() {
  const [modeTypeCanvas, setModeTypeCanvas] = useState<modeCanvas>('BRUSH');
  const [scaleCanvas, setScaleCanvas] = useState<number>(1);
  const [sizeBrush, setSizeBrush] = useState<number>(4);
  const [colorBrush, setColorBrush] = useState<string>('black');

  const handleValue = (value: modeCanvas) => {
    setModeTypeCanvas(value);
  };

  const handleReceiveScale = (e: number) => {
    setScaleCanvas(e);
  };

  const handleChangeColor = (e: string) => {
    setColorBrush(e);
  };
  useEffect(() => {
    const changeCanvasWithWindows = (e: KeyboardEvent) => {
      if (modeTypeCanvas !== 'TEXT') {
        if (e.code === 'Digit1') {
          setColorBrush('black');
        }
        if (e.code === 'Digit2') {
          setColorBrush('red');
        }
        if (e.code === 'Digit3') {
          setColorBrush('green');
        }
        if (e.code === 'Digit4') {
          setColorBrush('blue');
        }
        if (e.code === 'Digit5') {
          setColorBrush('yellow');
        }

        if (e.code === 'BracketLeft') {
          setSizeBrush(prev => prev - defaultBrushAdd);
        }
        if (e.code === 'BracketRight') {
          setSizeBrush(prev => prev + defaultBrushAdd);
        }

        if (e.code === 'KeyP') {
          setModeTypeCanvas('PAN');
        }
        if (e.code === 'KeyB') {
          setModeTypeCanvas('BRUSH');
        }
        if (e.code === 'KeyE') {
          setModeTypeCanvas('ERASER');
        }
      }
    };
    window.addEventListener('keydown', changeCanvasWithWindows);

    return () => {
      window.removeEventListener('keydown', changeCanvasWithWindows);
    };
  }, [modeTypeCanvas]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      id="nanda"
      style={{
        cursor: modePointerWindows(modeTypeCanvas, sizeBrush * scaleCanvas),
      }}
    >
      <MainMenu
        handleValue={e => handleValue(e)}
        modeTypeCanvas={modeTypeCanvas}
      />
      {modeTypeCanvas === 'BRUSH' && (
        <MainColor handleSendColor={handleChangeColor} />
      )}
      <MenuCustom />
      <FreeBrushCanvas
        drag={modeTypeCanvas}
        sizeBrush={sizeBrush}
        colorBrush={colorBrush}
        handleSendScale={handleReceiveScale}
      />
    </div>
  );
}
