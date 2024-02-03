import { useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';
import { ColorResult, HSLColor, RGBColor, SketchPicker } from 'react-color';

type MainColorProps = {
  handleSendColor: (e: string) => void;
};

export default function MainColor({ handleSendColor }: MainColorProps) {
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);

  const [colorDiv, setColorDiv] = useState<HSLColor | RGBColor | string>(
    '#fff',
  );

  const handleChangeColorRealtime = (color: ColorResult) => {
    setColorDiv(color.hex);
    handleSendColor(color.hex);
  };

  return (
    <div className="absolute right-2 top-2 z-20 flex flex-col items-end gap-2">
      <button
        className="p-3 rounded-full bg-yellow-700 hover:bg-yellow-500"
        type="button"
        onClick={() => {
          setIsShowColorPicker(prev => !prev);
        }}
      >
        <IoColorPalette size={28} color={'salmon'} />
      </button>
      {isShowColorPicker && (
        <SketchPicker color={colorDiv} onChange={handleChangeColorRealtime} />
      )}
    </div>
  );
}
