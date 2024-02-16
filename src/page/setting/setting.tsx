import { useState } from 'react';
import { ShortPress } from './config/mode';
import KeydownDiv from './config/keydown';
import uuid4 from 'uuid4';
import { shortcutApp, shortcutAppProps } from '../config/Shortcut';

export default function HomeSetting() {
  const [saveModeCanvas, setSaveModeCanvas] = useState<shortcutAppProps>({
    move: shortcutApp.move,
    brush: shortcutApp.brush,
    erasser: shortcutApp.erasser,
    select: shortcutApp.select,
    rectangle: shortcutApp.rectangle,
    circle: shortcutApp.circle,
    star: shortcutApp.star,
    triangle: shortcutApp.triangle,
    image: shortcutApp.image,
    text: shortcutApp.text,
    black: shortcutApp.black,
    blue: shortcutApp.blue,
    red: shortcutApp.red,
    yellow: shortcutApp.yellow,
    green: shortcutApp.green,
  });

  const [showKeyDown, setShowKeyDown] = useState<boolean>(false);
  const [nameMode, setNameMode] = useState<string>('');

  const handleShowKeyDown = (name: string) => {
    setShowKeyDown(true);
    setNameMode(name);
  };

  const handleDataMode = (value: string[]) => {
    setSaveModeCanvas(prev => ({ ...prev, [nameMode]: value }));
    localStorage.setItem(
      'shortcut',
      JSON.stringify({ ...saveModeCanvas, [nameMode]: value }),
    );
    setShowKeyDown(false);
  };

  return (
    <>
      {showKeyDown && <KeydownDiv sendData={handleDataMode} />}
      <div className="w-3/4 h-3/4 absolute bg-orange-400 rounded-2xl z-30 top-[12.5%] left-[12.5%] shadow-2xl overflow-hidden">
        <div className="w-full text-center p-3 text-3xl text-white">
          <h1 className="underline underline-offset-8">Pengaturan</h1>
        </div>
        <div className="w-full mt-5 relative h-[calc(100%-100px)]">
          <div className="flex flex-col w-1/4 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-neutral-800 shadow-xl absolute">
            <button className="p-3 py-5 bg-green-600 hover:bg-green-800">
              Mode Canvas
            </button>
            <button className="p-3 py-5 bg-green-600 hover:bg-green-800">
              Color Canvas
            </button>
          </div>
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
        </div>
      </div>
    </>
  );
}
