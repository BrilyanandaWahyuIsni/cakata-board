import { ChangeEvent, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { DataComponentProps } from '../canvas/freeBrushCanvasConfig';

export type ModeMenuProps =
  | 'FILL'
  | 'STROKE'
  | 'STROKE WIDTH'
  | 'POS'
  | 'SKALA'
  | 'UP DOWN';

export type ChangeDataProps = {
  id: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  posX: number;
  posY: number;
  // scaleX: number;
  // scaleY: number;
};

type MenuCustomProps = {
  handleRalatData: (value: ChangeDataProps) => void;
  componentData: DataComponentProps;
  handleUpComponent: () => void;
  handleDownComponent: () => void;
};

export default function MenuCustom({
  handleRalatData,
  componentData,
  handleUpComponent,
  handleDownComponent,
}: MenuCustomProps) {
  const [modeMenu, setModeMenu] = useState<ModeMenuProps | null>(
    'STROKE WIDTH',
  );

  const handleModeMenu = (value: ModeMenuProps) => {
    if (modeMenu === value) {
      setModeMenu(null);
    } else {
      setModeMenu(value);
    }
  };

  const handleChangeValueData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = {
      id: componentData.id,
      fill: componentData.fill,
      stroke: componentData.stroke,
      strokeWidth: componentData.strokeWidth,
      posX: componentData.x,
      posY: componentData.y,
    };
    handleRalatData({ ...newData, [name]: value });
  };

  const handleChangeColor = (e: ColorResult, name: string) => {
    const newData = {
      id: componentData.id,
      fill: componentData.fill,
      stroke: componentData.stroke,
      strokeWidth: componentData.strokeWidth,
      posX: componentData.x,
      posY: componentData.y,
    };
    handleRalatData({ ...newData, [name]: e.hex });
  };

  return (
    <div className="w-72 absolute bg-slate-700 rounded-3xl p-3 z-20 right-3 top-8 overflow-hidden">
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
              width="15rem"
              color={componentData.fill}
              onChange={e => handleChangeColor(e, 'fill')}
              // onChangeComplete={e => handleChangeColor(e, 'fill')}
              className="text-black"
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
              width="15rem"
              color={componentData.stroke}
              onChange={e => handleChangeColor(e, 'stroke')}
              // onChangeComplete={e => handleChangeColor(e, 'stroke')}
              className="text-black"
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
                value={componentData.strokeWidth}
                className="w-full text-black"
                name="strokeWidth"
                onChange={handleChangeValueData}
              />
              <input
                type="number"
                className="w-20 text-black p-1 rounded-xl text-right"
                value={componentData.strokeWidth}
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
            <div className="w-full flex justify-center items-center">
              <div className="w-1/2 flex justify-center items-center gap-2">
                <>x :</>
                <input
                  type="number"
                  className="w-20 text-black p-2 rounded-xl"
                  value={componentData.x}
                  name="posX"
                  onChange={handleChangeValueData}
                />
              </div>
              <div className="w-1/2 flex justify-center items-center gap-2">
                <>y :</>
                <input
                  type="number"
                  className="w-20 text-black p-2 rounded-xl"
                  value={componentData.y}
                  name="posY"
                  onChange={handleChangeValueData}
                />
              </div>
            </div>
          )}
        </div>
        {/* menu skala section */}
        {/* <div className="w-full flex flex-col items-center">
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
              <div className="w-1/2 flex justify-center items-center gap-2">
                <>x :</>
                <input
                  type="number"
                  className="w-20 text-black p-2 text-right rounded-xl"
                  value={componentData.scaleX}
                  name="scaleX"
                  onChange={handleChangeValueData}
                  onBlur={rubahData}
                />
              </div>
              <div className="w-1/2 flex justify-center items-center gap-2">
                <>y :</>
                <input
                  type="number"
                  className="w-20 text-black p-2 text-right rounded-xl"
                  value={componentData.scaleY}
                  name="scaleY"
                  onChange={handleChangeValueData}
                />
              </div>
            </div>
          )}
        </div> */}
        {/* menu up atau down */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleModeMenu('UP DOWN')}
            className="py-1 mb-2  px-10 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
          >
            {modeMenu === 'UP DOWN' ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
            Diatas/Dibawah
          </button>
          {modeMenu === 'UP DOWN' && (
            <div className="w-full flex gap-2 px-2">
              <button type="button" onClick={handleUpComponent}>
                Diatas
              </button>
              <button type="button" onClick={handleDownComponent}>
                Dibawah
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
