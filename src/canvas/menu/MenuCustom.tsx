import { ChangeEvent, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { DataComponentProps } from '../canvas/freeBrushCanvasConfig';
import { IoColorFill } from 'react-icons/io5';
import { MdBorderColor } from 'react-icons/md';
import { BsBorderWidth, BsLayerBackward, BsLayerForward } from 'react-icons/bs';

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
  const [modeMenu, setModeMenu] = useState<ModeMenuProps | null>(null);

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
    <div className="absolute  rounded-3xl p-1 z-20 right-1/2 translate-x-1/2 bottom-5 flex">
      <div className="flex  gap-5 items-center overflow-y-scroll overflow-x-hidden  scrollbar-none text-white ">
        {/* bagian 1 */}
        <div className="flex gap-2 bg-slate-700 p-2 rounded-full">
          {/* menu fill section  */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                handleModeMenu('FILL');
              }}
              className="p-2 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
            >
              <IoColorFill size={20} />
            </button>
            {modeMenu === 'FILL' && (
              <div className='className="text-black absolute p-1 bg-blue-500 -top-[600%] text-black'>
                <div className="w-0 h-0 border-t-[15px] border-x-[30px] border-x-transparent border-t-blue-900 absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30"></div>
                <SketchPicker
                  width="15rem"
                  color={componentData.fill}
                  onChange={e => handleChangeColor(e, 'fill')}
                />
              </div>
            )}
          </div>
          {/* menu stroke section */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => handleModeMenu('STROKE')}
              className="p-2 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
            >
              <MdBorderColor size={20} />
            </button>
            {modeMenu === 'STROKE' && (
              <div className='className="text-black absolute p-1 bg-blue-500 -top-[600%] text-black'>
                <div className="w-0 h-0 border-t-[15px] border-x-[30px] border-x-transparent border-t-blue-900 absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30"></div>
                <SketchPicker
                  width="15rem"
                  color={componentData.stroke}
                  onChange={e => handleChangeColor(e, 'stroke')}
                  // onChangeComplete={e => handleChangeColor(e, 'stroke')}
                  className="text-black"
                />
              </div>
            )}
          </div>
          {/* menu stroke width section */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => handleModeMenu('STROKE WIDTH')}
              className="p-2 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
            >
              <BsBorderWidth size={20} />
            </button>
            {modeMenu === 'STROKE WIDTH' && (
              <div className='className="text-black absolute p-1 bg-blue-500 -top-[90%] rounded-xl text-black'>
                <div className="w-0 h-0 border-t-[15px] border-x-[30px] border-x-transparent border-t-blue-900 absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30"></div>
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
              </div>
            )}
          </div>
        </div>
        {/* bagian 2 */}
        <div className="w-full flex items-center gap-2 bg-slate-500 p-2 rounded-full">
          <button
            type="button"
            onClick={handleUpComponent}
            className="rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center p-2"
          >
            <BsLayerForward size={20} />
          </button>
          <button
            type="button"
            onClick={handleDownComponent}
            className="rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center p-2"
          >
            <BsLayerBackward size={20} />
          </button>
        </div>
        {/* menu pos section */}
        {/* <div className="w-full flex flex-col items-center">
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
        </div> */}
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
      </div>
    </div>
  );
}
