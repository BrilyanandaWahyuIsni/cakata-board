import {
  MdOutlineCircle,
  MdOutlineRectangle,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { IoTriangleOutline } from 'react-icons/io5';
import {
  classIcon,
  colorIcon,
  modeCanvas,
  sizeIcon,
} from '../config/GlobalVariabel';

type ShapeMenuProps = {
  handleShapeSelect: (value: string) => void;
};

export default function ShapeMenu({ handleShapeSelect }: ShapeMenuProps) {
  return (
    <div className="absolute w-52 top-0 left-[120%] grid grid-cols-4 gap-2 p-2 bg-slate-700">
      {/* persegi atau persegi panjang */}
      <button
        className={classIcon.active}
        type="button"
        onClick={() => {
          handleShapeSelect(modeCanvas[modeCanvas.RECT]);
        }}
      >
        <MdOutlineRectangle color={colorIcon.nonActive} size={sizeIcon.size} />
      </button>
      {/* lingkaran atau sejenisnya */}
      <button
        className={classIcon.active}
        type="button"
        onClick={() => {
          handleShapeSelect(modeCanvas[modeCanvas.CIRCLE]);
        }}
      >
        <MdOutlineCircle color={colorIcon.nonActive} size={sizeIcon.size} />
      </button>
      {/* segitiga */}
      <button
        className={classIcon.active}
        type="button"
        onClick={() => {
          handleShapeSelect(modeCanvas[modeCanvas.TRIAGLE]);
        }}
      >
        <IoTriangleOutline color={colorIcon.nonActive} size={sizeIcon.size} />
      </button>
      {/* star atau bintang */}
      <button
        className={classIcon.active}
        type="button"
        onClick={() => {
          handleShapeSelect(modeCanvas[modeCanvas.STAR]);
        }}
      >
        <MdOutlineStarBorder color={colorIcon.nonActive} size={sizeIcon.size} />
      </button>
    </div>
  );
}
