import { ChangeEvent, useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';
import { ColorResult, HSLColor, RGBColor, SketchPicker } from 'react-color';
import { BsBorderWidth } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { StoreStateProps } from '../store';

type MainColorProps = {
  handleSendColor: (e: string) => void;
  sizeBrush: number;
  handleSizeBrush: (e: ChangeEvent<HTMLInputElement>) => void;
};

type IsShowProps = 'COLOR' | 'CURSOR';

export default function MainColor({
  handleSendColor,
  sizeBrush,
  handleSizeBrush,
}: MainColorProps) {
  const modeCanvas = useSelector(
    (state: StoreStateProps) => state.modeCanvas.value,
  );

  const [isShow, setIsShow] = useState<IsShowProps | null>(null);

  const [colorDiv, setColorDiv] = useState<HSLColor | RGBColor | string>(
    '#fff',
  );

  const handleChangeColorRealtime = (color: ColorResult) => {
    setColorDiv(color.hex);
    handleSendColor(color.hex);
  };

  return (
    <div
      className="absolute right-1/2 bottom-5 z-20 flex items-end gap-2 text-white p-2 bg-slate-700 rounded-full"
      style={{ cursor: 'default' }}
    >
      {/*  */}
      {modeCanvas === 'BRUSH' && (
        <div className="relative">
          <button
            className="p-2 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
            type="button"
            style={{ cursor: 'default' }}
            onClick={() => {
              setIsShow(prev => {
                if (prev === 'COLOR') {
                  return null;
                }
                return 'COLOR';
              });
            }}
          >
            <IoColorPalette size={20} />
          </button>
          {isShow === 'COLOR' && (
            <div className="text-black absolute -right-[7.2rem] p-1 bg-blue-500 -top-[1030%] ">
              <div className="w-0 h-0 border-t-[15px] border-x-[30px] border-x-transparent border-t-blue-900 absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30"></div>
              <SketchPicker
                color={colorDiv}
                width="15rem"
                onChange={handleChangeColorRealtime}
              />
            </div>
          )}
        </div>
      )}
      {/*  */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            setIsShow(prev => {
              if (prev === 'CURSOR') {
                return null;
              }
              return 'CURSOR';
            });
          }}
          className="p-2 rounded-full bg-red-400 hover:bg-red-300 flex gap-2 items-center justify-center"
        >
          <BsBorderWidth size={20} />
        </button>
        {isShow === 'CURSOR' && (
          <div className='className="text-black absolute p-1 bg-blue-500 -top-[110%] rounded-xl text-black'>
            <div className="w-0 h-0 border-t-[15px] border-x-[30px] border-x-transparent border-t-blue-900 absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30"></div>
            <div className="w-60 flex gap-2 px-2">
              <input
                type="range"
                min={0}
                max={100}
                value={sizeBrush}
                className="w-full text-black"
                name="strokeWidth"
                onChange={handleSizeBrush}
              />
              <input
                type="number"
                className="w-20 text-black p-1 rounded-xl text-right"
                value={sizeBrush}
                name="strokeWidth"
                min={0}
                max={100}
                onChange={handleSizeBrush}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
