import { MdOutlinePanTool, MdZoomIn, MdZoomOut } from 'react-icons/md';
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
import { IoSettings } from 'react-icons/io5';

type MainMenuProps = {
  modeTypeCanvas: modeCanvas;
  handleValue: (value: modeCanvas) => void;
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
          onClick={() => handleValue('PAN')}
        >
          <MdOutlinePanTool
            color={
              modeTypeCanvas === 'PAN' ? colorIcon.active : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* pencil */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => handleValue('BRUSH')}
        >
          <FaPencil
            color={
              modeTypeCanvas === 'BRUSH'
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
          onClick={() => handleValue('ERASER')}
        >
          <FaEraser
            color={
              modeTypeCanvas === 'ERASER'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* Seleksi */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('SELECT');
          }}
        >
          <GiArrowCursor
            color={
              modeTypeCanvas === 'SELECT'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* Add image */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('IMAGE');
          }}
        >
          <FaImage
            color={
              modeTypeCanvas === 'IMAGE'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* shapes */}
        <div className="relative">
          <button
            className={classIcon.active}
            type="button"
            onClick={() => {
              handleValue('SHAPES');
            }}
          >
            <FaShapes color={colorIcon.nonActive} size={sizeIcon.size} />
          </button>
          {modeTypeCanvas === 'SHAPES' && (
            <ShapeMenu handleShapeSelect={handleValue} />
          )}
        </div>
        {/* add text */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('TEXT');
          }}
        >
          <BsTextareaT
            color={
              modeTypeCanvas === 'TEXT' ? colorIcon.active : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* zoom in */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('ZOOMIN');
          }}
        >
          <MdZoomIn
            color={
              modeTypeCanvas === 'ZOOMIN'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* zoom out */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('ZOOMOUT');
          }}
        >
          <MdZoomOut
            color={
              modeTypeCanvas === 'ZOOMOUT'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
        {/* show setting */}
        <button
          className={classIcon.active}
          type="button"
          onClick={() => {
            handleValue('SETTING');
          }}
        >
          <IoSettings
            color={
              modeTypeCanvas === 'SETTING'
                ? colorIcon.active
                : colorIcon.nonActive
            }
            size={sizeIcon.size}
          />
        </button>
      </div>
    </>
  );
}
