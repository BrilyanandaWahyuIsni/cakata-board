import { ChangeEvent, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type ModeMenuProps = 'FILL' | 'STROKE' | 'STROKE WIDTH' | 'POS' | 'SKALA';
type ChangeDataProps = {
  fill: string;
  stroke: string;
  strokeWidth: number;
  posX: number;
  posY: number;
  scaleX: number;
  scaleY: number;
};

export default function MenuCustom() {
  const [modeMenu, setModeMenu] = useState<ModeMenuProps | null>(null);
  const [changeData, setChangeData] = useState<ChangeDataProps>({
    fill: 'red',
    stroke: 'red',
    strokeWidth: 4,
    posX: 1,
    posY: 1,
    scaleX: 1,
    scaleY: 1,
  });

  const handleModeMenu = (value: ModeMenuProps) => {
    if (modeMenu === value) {
      setModeMenu(null);
    } else {
      setModeMenu(value);
    }
  };

  const handleChangeValueData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeColor = (e: ColorResult, name: string) => {
    setChangeData(prev => ({
      ...prev,
      [name]: e.hex,
    }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-64 absolute bg-slate-700 rounded-3xl p-3 z-20 right-3 top-8 overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] flex flex-col gap-3 items-center overflow-y-scroll overflow-x-hidden pb-10 scrollbar-none text-white">
        {/* menu fill section  */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => {
              handleModeMenu('FILL');
            }}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'FILL' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Fill
          </button>
          {modeMenu === 'FILL' && (
            <SketchPicker
              width="11rem"
              color={changeData.fill}
              onChange={e => handleChangeColor(e, 'fill')}
            />
          )}
        </div>
        {/* menu stroke section */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleModeMenu('STROKE')}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'STROKE' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Stroke
          </button>
          {modeMenu === 'STROKE' && (
            <SketchPicker
              width="11rem"
              color={changeData.stroke}
              onChange={e => handleChangeColor(e, 'stroke')}
            />
          )}
        </div>
        {/* menu stroke width section */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleModeMenu('STROKE WIDTH')}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'STROKE WIDTH' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Stroke Width
          </button>
          {modeMenu === 'STROKE WIDTH' && (
            <div className="w-full flex gap-2 px-2">
              <input
                type="range"
                min={0}
                max={100}
                value={changeData.strokeWidth}
                className="w-full text-black"
                name="strokeWidth"
                onChange={handleChangeValueData}
              />
              <input
                type="number"
                className="w-12 text-black p-1 rounded-xl"
                value={changeData.strokeWidth}
                name="strokeWidth"
                min={0}
                max={100}
                onChange={handleChangeValueData}
              />
            </div>
          )}
        </div>
        {/* menu pos section */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleModeMenu('POS')}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'POS' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Pos
          </button>
          {modeMenu === 'POS' && (
            <div className="w-full flex justify-center">
              <div className="w-1/2 flex justify-center gap-2">
                <>x :</>
                <input
                  type="number"
                  className="w-10 text-black p-2 rounded-xl"
                  value={changeData.posX}
                  name="posX"
                  onChange={handleChangeValueData}
                />
              </div>
              <div className="w-1/2 flex justify-center gap-2">
                <>y :</>
                <input
                  type="number"
                  className="w-10 text-black p-2 rounded-xl"
                  value={changeData.posY}
                  name="posY"
                  onChange={handleChangeValueData}
                />
              </div>
            </div>
          )}
        </div>
        {/* menu skala section */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleModeMenu('SKALA')}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'SKALA' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Skala
          </button>
          {modeMenu === 'SKALA' && (
            <div className="w-full flex justify-center">
              <div className="w-1/2 flex justify-center gap-2">
                <>x :</>
                <input
                  type="number"
                  className="w-10 text-black p-2 rounded-xl"
                  value={changeData.scaleX}
                  name="scaleX"
                  onChange={handleChangeValueData}
                />
              </div>
              <div className="w-1/2 flex justify-center gap-2">
                <>y :</>
                <input
                  type="number"
                  className="w-10 text-black p-2 rounded-xl"
                  value={changeData.scaleY}
                  name="scaleY"
                  onChange={handleChangeValueData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
