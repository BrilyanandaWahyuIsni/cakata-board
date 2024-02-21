import { useEffect, useState } from 'react';
import FreeBrushCanvas from './canvas/FreeBrushCanvas';
import MainMenu from './menu/MainMenu';
import { defaultBrushAdd, modeCanvas } from './config/GlobalVariabel';
import { modePointerWindows } from './config/AppConfig';
import MainColor from './menu/MainColor';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateProps } from './store';
import { setModeCanvas } from './store/mode-canvas';
import HomeSetting from './setting/setting';
import { shortcutApp, shortcutAppProps } from './config/Shortcut';
import { useLocation } from 'react-router-dom';
import {
  ComponenCanvasProps,
  DataImageProps,
} from './canvas/freeBrushCanvasConfig';
import { ReturnBaseStrukturProps } from '../saveData/baseStruktur';

export default function HomeCanvas() {
  const data = useLocation();
  const [dataMasukan, setDataMasukan] = useState<ReturnBaseStrukturProps>();

  const dispatch = useDispatch();
  const modeTypeCanvas = useSelector(
    (state: StoreStateProps) => state.modeCanvas.value,
  );

  const [scaleCanvas, setScaleCanvas] = useState<number>(1);
  const [sizeBrush, setSizeBrush] = useState<number>(4);
  const [colorBrush, setColorBrush] = useState<string>('black');

  const handleValue = (value: modeCanvas) => {
    dispatch(setModeCanvas({ value: value }));
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
        const parseJsonShortcut: shortcutAppProps = JSON.parse(
          localStorage.getItem('shortcut') as never,
        )
          ? JSON.parse(localStorage.getItem('shortcut') as never)
          : shortcutApp;

        let keyPress = [];
        if (e.shiftKey) {
          keyPress = e.key === 'Shift' ? [''] : ['Shift', e.key];
        } else if (e.ctrlKey) {
          keyPress = e.key === 'Control' ? [''] : ['Ctrl', e.key];
        } else if (e.altKey) {
          keyPress = e.key === 'Alt' ? [''] : ['Alt', e.key];
        } else {
          keyPress = [e.key];
        }

        if (keyPress.join().length > 0) {
          // size brush
          if (keyPress.join() === '[') {
            setSizeBrush(prev => prev - defaultBrushAdd);
          }
          if (keyPress.join() === ']') {
            setSizeBrush(prev => prev + defaultBrushAdd);
          }

          // color base
          if (keyPress.join() === parseJsonShortcut.black.join()) {
            setColorBrush('black');
          }
          if (keyPress.join() === parseJsonShortcut.red.join()) {
            setColorBrush('red');
          }
          if (keyPress.join() === parseJsonShortcut.green.join()) {
            setColorBrush('green');
          }
          if (keyPress.join() === parseJsonShortcut.blue.join()) {
            setColorBrush('blue');
          }
          if (keyPress.join() === parseJsonShortcut.yellow.join()) {
            setColorBrush('yellow');
          }

          // tools mode
          if (keyPress.join('') === parseJsonShortcut.move.join('')) {
            dispatch(setModeCanvas({ value: 'PAN' }));
          }
          if (keyPress.join() === parseJsonShortcut.brush.join()) {
            dispatch(setModeCanvas({ value: 'BRUSH' }));
          }
          if (keyPress.join() === parseJsonShortcut.erasser.join()) {
            dispatch(setModeCanvas({ value: 'ERASER' }));
          }
          if (keyPress.join() === parseJsonShortcut.select.join()) {
            dispatch(setModeCanvas({ value: 'SELECT' }));
          }
          if (keyPress.join() === parseJsonShortcut.rectangle.join()) {
            dispatch(setModeCanvas({ value: 'RECT' }));
          }
          if (keyPress.join() === parseJsonShortcut.circle.join()) {
            dispatch(setModeCanvas({ value: 'CIRCLE' }));
          }
          if (keyPress.join() === parseJsonShortcut.star.join()) {
            dispatch(setModeCanvas({ value: 'STAR' }));
          }
          if (keyPress.join() === parseJsonShortcut.triangle.join()) {
            dispatch(setModeCanvas({ value: 'TRIAGLE' }));
          }
          if (keyPress.join() === parseJsonShortcut.image.join()) {
            dispatch(setModeCanvas({ value: 'IMAGE' }));
          }
          if (keyPress.join() === parseJsonShortcut.text.join()) {
            dispatch(setModeCanvas({ value: 'TEXT' }));
          }
        }
      }
    };
    window.addEventListener('keydown', changeCanvasWithWindows);

    if (data.state.data) {
      const dataBaru = data.state.data.ComponentCanvas.map(
        (e: ComponenCanvasProps) => {
          if (e.type === 'IMAGE') {
            const urlImg = new window.Image();
            urlImg.src = (e.data as DataImageProps).image as never;
            return { type: e.type, data: { ...e.data, image: urlImg } };
          } else {
            return e;
          }
        },
      );

      setDataMasukan({ ...data.state.data, ComponentCanvas: dataBaru });
    } else {
      setDataMasukan({ ...data.state.data, ComponentCanvas: [], lines: [] });
    }

    return () => {
      window.removeEventListener('keydown', changeCanvasWithWindows);
    };
  }, [data.state.data, dispatch, modeTypeCanvas]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      id="nanda"
      style={{
        cursor: modePointerWindows(modeTypeCanvas, sizeBrush * scaleCanvas),
      }}
    >
      {modeTypeCanvas === 'SETTING' && <HomeSetting />}
      <MainMenu
        handleValue={e => handleValue(e)}
        modeTypeCanvas={modeTypeCanvas}
      />
      {modeTypeCanvas === 'BRUSH' && (
        <MainColor handleSendColor={handleChangeColor} />
      )}
      {dataMasukan && (
        <FreeBrushCanvas
          lines={dataMasukan.lines}
          componentCanvas={dataMasukan.ComponentCanvas}
          sizeBrush={sizeBrush}
          colorBrush={colorBrush}
          handleSendScale={handleReceiveScale}
        />
      )}
    </div>
  );
}
