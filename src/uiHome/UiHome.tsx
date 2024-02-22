import { FaPlus } from 'react-icons/fa6';
import { IoReload } from 'react-icons/io5';
import BgUtama from './../assets/images/bg-utama.png';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import {
  decryptJSON,
  keyNandaBrilyanandaWahyuIsni,
} from '../canvas/config/EncripsiData';
import MiniCanvas from './miniCanvas/miniCanvas';
import { ReturnBaseStrukturProps } from '../saveData/baseStruktur';
import { DataImageProps } from '../canvas/canvas/freeBrushCanvasConfig';

export default function UiHome() {
  const filesRef = useRef<HTMLInputElement>(null);
  const [dataFile, setDataFile] = useState<ReturnBaseStrukturProps | null>(
    null,
  );
  const [dataMiniCanvas, setDataMiniCanvas] =
    useState<ReturnBaseStrukturProps | null>(null);

  const handleChangeFile = () => {
    if (filesRef.current?.files) {
      const file = filesRef.current.files[0];
      const reader = new FileReader();

      if (file instanceof Blob) {
        reader.onload = function (e) {
          const dataSend: ReturnBaseStrukturProps = decryptJSON(
            e.target?.result as string,
            keyNandaBrilyanandaWahyuIsni,
          );
          setDataFile(dataSend);
          const mnCanvas = dataSend.ComponentCanvas.map(e => {
            if (e.type === 'IMAGE') {
              const img = new window.Image();
              img.src = (e.data as DataImageProps).image as never;
              return { type: e.type, data: { ...e.data, image: img } };
            }
            return e;
          });
          setDataMiniCanvas({
            ...dataSend,
            ComponentCanvas: mnCanvas as never,
          });
        };
        reader.readAsText(filesRef.current.files[0]);
      }
    }
  };

  return (
    <div
      className="w-full h-screen  p-10 px-40"
      style={{ backgroundImage: `url(${BgUtama})` }}
    >
      <h1 className="w-full text-center text-3xl font-extrabold mb-10 text-slate-200 p-5 rounded-2xl bg-zinc-900 shadow-sm shadow-orange-200">
        Cakata Board
      </h1>
      <div className="flex justify-center gap-6">
        {/* create new canvas */}
        <Link
          to={'/canvas'}
          state={{ data: null }}
          className="w-32 p-3 flex flex-col items-center justify-center bg-slate-400 shadow-lg shadow-purple-200 hover:bg-slate-600 hover:shadow-purple-700 group rounded-lg"
        >
          <div className="p-5">
            <FaPlus size={64} className="group-hover:text-white" />
          </div>
          <p className="group-hover:text-purple-800 text-center">
            create new whiteboard
          </p>
        </Link>

        {/* reload canvas */}
        <label
          htmlFor="whiteBoard"
          className="w-32 p-3 flex flex-col items-center justify-center bg-slate-400 shadow-lg shadow-purple-200 hover:bg-slate-600 hover:shadow-purple-700 group rounded-lg"
        >
          <div className="p-5">
            <IoReload size={64} className="group-hover:text-white" />
          </div>
          <p className="group-hover:text-purple-800 text-center">
            reload whiteboard
          </p>
          <input
            ref={filesRef}
            type="file"
            name="whiteBoard"
            id="whiteBoard"
            className="hidden"
            onChange={handleChangeFile}
          />
        </label>
      </div>
      {dataFile && (
        <div className="w-full flex flex-col items-center justify-center">
          <MiniCanvas data={dataMiniCanvas} />
          <Link
            className="p-4 px-2 absolute bottom-8 bg-green-950 text-white rounded-2xl right-1/2 translate-x-1/2"
            to={{
              pathname: '/canvas',
            }}
            state={{ data: dataFile }}
          >
            Edit Board Anda Sekarang
          </Link>
        </div>
      )}
    </div>
  );
}
