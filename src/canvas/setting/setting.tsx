import { useState } from 'react';
import { ShortPress } from './config/mode';
import KeydownDiv from './config/keydown';
import uuid4 from 'uuid4';
import { shortcutAppProps } from '../config/Shortcut';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setModeCanvas } from '../store/mode-canvas';

type ModePengaturanProps = 'CANVAS' | 'COLOR';

export default function HomeSetting() {
  const dispatch = useDispatch();
  const parseJsonShortcut: shortcutAppProps = JSON.parse(
    localStorage.getItem('shortcut') as never,
  );
  const [saveModeCanvas, setSaveModeCanvas] = useState<shortcutAppProps>({
    move:
      parseJsonShortcut && parseJsonShortcut.move.length > 0
        ? parseJsonShortcut.move
        : ['m'],
    brush:
      parseJsonShortcut && parseJsonShortcut.brush.length > 0
        ? parseJsonShortcut.brush
        : ['b'],
    erasser:
      parseJsonShortcut && parseJsonShortcut.erasser.length > 0
        ? parseJsonShortcut.erasser
        : ['e'],
    select:
      parseJsonShortcut && parseJsonShortcut.select.length > 0
        ? parseJsonShortcut.select
        : ['s'],
    rectangle:
      parseJsonShortcut && parseJsonShortcut.rectangle.length > 0
        ? parseJsonShortcut.rectangle
        : [],
    circle:
      parseJsonShortcut && parseJsonShortcut.circle.length > 0
        ? parseJsonShortcut.circle
        : [],
    star:
      parseJsonShortcut && parseJsonShortcut.star.length > 0
        ? parseJsonShortcut.star
        : [],
    triangle:
      parseJsonShortcut && parseJsonShortcut.star.length > 0
        ? parseJsonShortcut.star
        : [],
    image:
      parseJsonShortcut && parseJsonShortcut.image.length > 0
        ? parseJsonShortcut.image
        : ['i'],
    text:
      parseJsonShortcut && parseJsonShortcut.text.length > 0
        ? parseJsonShortcut.text
        : ['t'],
    red:
      parseJsonShortcut && parseJsonShortcut.red.length > 0
        ? parseJsonShortcut.red
        : ['2'],
    green:
      parseJsonShortcut && parseJsonShortcut.green.length > 0
        ? parseJsonShortcut.green
        : ['3'],
    blue:
      parseJsonShortcut && parseJsonShortcut.blue.length > 0
        ? parseJsonShortcut.blue
        : ['4'],
    black:
      parseJsonShortcut && parseJsonShortcut.black.length > 0
        ? parseJsonShortcut.black
        : ['1'],
    yellow:
      parseJsonShortcut && parseJsonShortcut.yellow.length > 0
        ? parseJsonShortcut.yellow
        : ['5'],
  });

  const [showKeyDown, setShowKeyDown] = useState<boolean>(false);
  const [nameMode, setNameMode] = useState<string>('');
  const [modePengaturan, setModePengaturan] =
    useState<ModePengaturanProps>('CANVAS');

  const handleShowKeyDown = (name: string) => {
    setShowKeyDown(true);
    setNameMode(name);
  };

  const handleDataMode = (value: string[]) => {
    // setSaveModeCanvas(prev => ({ ...prev, [nameMode]: value }));
    const copy = saveModeCanvas;
    for (const kenanda in copy) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (copy[kenanda].join('') === value.join('') && kenanda !== nameMode) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        copy[kenanda] = [''];
      }
    }
    setSaveModeCanvas({ ...copy, [nameMode]: value });

    // console.log({ ...copy, [nameMode]: value });

    localStorage.setItem(
      'shortcut',
      // JSON.stringify({ ...saveModeCanvas, [nameMode]: value }),
      JSON.stringify({ ...copy, [nameMode]: value }),
    );
    setShowKeyDown(false);
  };

  const handleChangeModePengaturang = (value: ModePengaturanProps) => {
    setModePengaturan(value);
  };

  const handleSetShowKeyDown = (value: boolean) => {
    setShowKeyDown(value);
  };

  return (
    <>
      {showKeyDown && (
        <KeydownDiv
          sendData={handleDataMode}
          handleKeyDow={handleSetShowKeyDown}
        />
      )}
      <div className="w-full absolute h-full bg-slate-800 opacity-80 z-[25]"></div>
      <div className="w-3/4 h-3/4 absolute bg-orange-950 rounded-2xl z-30 top-[12.5%] left-[12.5%] shadow-2xl overflow-hidden text-white">
        <button
          type="button"
          className="absolute top-2 right-2 bg-slate-700 rounded-full p-2 text-gray-200 hover:bg-slate-900 hover:text-gray-100"
          onClick={() => {
            dispatch(setModeCanvas({ value: 'BRUSH' }));
          }}
        >
          <IoClose size={32} />
        </button>
        <div className="w-full text-center p-3 text-3xl text-white">
          <h1 className="underline underline-offset-8">Pengaturan</h1>
        </div>
        <div className="w-full mt-5 relative h-[calc(100%-100px)]">
          <div className="flex flex-col w-1/4 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-neutral-800 shadow-xl absolute">
            <button
              type="button"
              onClick={() => handleChangeModePengaturang('CANVAS')}
              className={`p-3 py-5 ${modePengaturan !== 'CANVAS' ? 'bg-green-950 hover:bg-green-700' : 'bg-green-600 '}  text-white font-extrabold`}
            >
              Mode Canvas
            </button>
            <button
              type="button"
              onClick={() => handleChangeModePengaturang('COLOR')}
              className={`p-3 py-5 ${modePengaturan !== 'COLOR' ? 'bg-green-950 hover:bg-green-700' : 'bg-green-600 '}  text-white font-extrabold`}
            >
              Color Canvas
            </button>
          </div>
          {modePengaturan === 'CANVAS' && (
            <div className="w-3/4 h-full relative left-1/4 px-5 overflow-x-hidden overflow-y-scroll scroll-m-1">
              <div>
                <h2>Keyboard Shortcut</h2>
                <ul>
                  {/* move */}
                  <ShortPress
                    key={uuid4()}
                    name="move"
                    saveMode={saveModeCanvas.move}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* brush */}
                  <ShortPress
                    key={uuid4()}
                    name="brush"
                    saveMode={saveModeCanvas.brush}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* erasser */}
                  <ShortPress
                    key={uuid4()}
                    name="erasser"
                    saveMode={saveModeCanvas.erasser}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* select */}
                  <ShortPress
                    key={uuid4()}
                    name="select"
                    saveMode={saveModeCanvas.select}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* rectangle */}
                  <ShortPress
                    key={uuid4()}
                    name="rectangle"
                    saveMode={saveModeCanvas.rectangle}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* circle */}
                  <ShortPress
                    key={uuid4()}
                    name="circle"
                    saveMode={saveModeCanvas.circle}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* star */}
                  <ShortPress
                    key={uuid4()}
                    name="star"
                    saveMode={saveModeCanvas.star}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* triangle */}
                  <ShortPress
                    key={uuid4()}
                    name="triangle"
                    saveMode={saveModeCanvas.triangle}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* image */}
                  <ShortPress
                    key={uuid4()}
                    name="image"
                    saveMode={saveModeCanvas.image}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* text */}
                  <ShortPress
                    key={uuid4()}
                    name="text"
                    saveMode={saveModeCanvas.text}
                    showKeyDown={handleShowKeyDown}
                  />
                </ul>
              </div>
            </div>
          )}
          {modePengaturan === 'COLOR' && (
            <div className="w-3/4 h-full relative left-1/4 px-5 overflow-x-hidden overflow-y-scroll scroll-m-1">
              <div>
                <h2>Keyboard Shortcut</h2>
                <ul>
                  {/* black */}
                  <ShortPress
                    key={uuid4()}
                    name="black"
                    saveMode={saveModeCanvas.black}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* red */}
                  <ShortPress
                    key={uuid4()}
                    name="red"
                    saveMode={saveModeCanvas.red}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* yellow */}
                  <ShortPress
                    key={uuid4()}
                    name="yellow"
                    saveMode={saveModeCanvas.yellow}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* blue */}
                  <ShortPress
                    key={uuid4()}
                    name="blue"
                    saveMode={saveModeCanvas.blue}
                    showKeyDown={handleShowKeyDown}
                  />
                  {/* green */}
                  <ShortPress
                    key={uuid4()}
                    name="green"
                    saveMode={saveModeCanvas.green}
                    showKeyDown={handleShowKeyDown}
                  />
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
