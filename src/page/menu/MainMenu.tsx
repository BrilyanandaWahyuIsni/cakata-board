import { MdOutlinePanTool } from 'react-icons/md';
import { FaEraser, FaImage, FaPencil, FaShapes } from 'react-icons/fa6';
import { GiArrowCursor } from 'react-icons/gi';
import { BsTextareaT } from 'react-icons/bs';
import {
  classIcon,
  colorIcon,
  modeCanvas,
  sizeIcon,
} from '../config/GlobalVariabel';
import ShapeMenu from './ShapeMenu';

type MainMenuProps = {
  modeTypeCanvas: string;
  handleValue: (value: string) => void;
};

export default function MainMenu({
  modeTypeCanvas,
  handleValue,
}: MainMenuProps) {
  return (
    <>
      <div className="flex absolute top-[50%] -translate-y-[50%] left-2 flex-col gap-3 z-20 p-1 py-3 bg-zinc-600 rounded-full">
        {/* pan */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => handleValue(modeCanvas[modeCanvas.PAN])}
        >
          <MdOutlinePanTool
            color={
              modeTypeCanvas === modeCanvas[modeCanvas.PAN]
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* pencil */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => handleValue(modeCanvas[modeCanvas.BRUSH])}
        >
          <FaPencil
            color={
              modeTypeCanvas === modeCanvas[modeCanvas.BRUSH]
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* pembersih */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => handleValue(modeCanvas[modeCanvas.ERASER])}
        >
          <FaEraser
            color={
              modeTypeCanvas === modeCanvas[modeCanvas.ERASER]
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* Seleksi */}
        <button className={classIcon.active} type="button" onClick={() => {}}>
          <GiArrowCursor color={colorIcon.nonActive} size={sizeIcon.size} />
        </button>
        {/* Add image */}
        <button className={classIcon.active} type="button" onClick={() => {}}>
          <FaImage color={colorIcon.nonActive} size={sizeIcon.size} />
        </button>
        {/* shapes */}
        <div className="relative">
          <button
            className={classIcon.active}
            type="button"
            onClick={() => {
              handleValue(modeCanvas[modeCanvas.SHAPES]);
            }}
          >
            <FaShapes color={colorIcon.nonActive} size={sizeIcon.size} />
          </button>
          {modeTypeCanvas === modeCanvas[modeCanvas.SHAPES] && (
            <ShapeMenu handleShapeSelect={handleValue} />
          )}
        </div>
        {/* add text */}
        <button className={classIcon.active} type="button" onClick={() => {}}>
          <BsTextareaT color={colorIcon.nonActive} size={sizeIcon.size} />
        </button>
      </div>
    </>
  );
}
