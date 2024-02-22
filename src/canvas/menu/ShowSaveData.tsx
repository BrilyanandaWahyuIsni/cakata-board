import { ChangeEvent, useState } from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

type ShowSaveDataProps = {
  handleSave: (v: string) => void;
  handleCancelSave: () => void;
};

export default function ShowSaveData({
  handleCancelSave,
  handleSave,
}: ShowSaveDataProps) {
  const [saveData, setSaveData] = useState<string>('');
  const [showWarnHome, setShowWarnHome] = useState<boolean>(false);

  const handleChangeSaveData = (e: ChangeEvent<HTMLInputElement>) => {
    setSaveData(e.target.value);
  };

  return (
    <div className="w-full h-full z-[35] absolute flex items-center justify-center">
      {showWarnHome && (
        <div className="w-full h-full absolute z-40 bg-slate-800 bg-opacity-90 flex flex-col justify-center items-center">
          <h1 className="p-3 md:w-1/2 text-center text-2xl font-bold text-white">
            Apakah anda yakin kembali ke halaman utama? semua data anda akan
            terhapus!.
          </h1>
          <div className="text-white flex gap-5 mt-4">
            <Link
              to={'/'}
              className="p-2 px-5 bg-red-900 hover:bg-opacity-35 rounded-lg"
            >
              YES
            </Link>
            <button
              type="button"
              onClick={() => setShowWarnHome(false)}
              className="p-2 px-5 bg-green-900 hover:bg-opacity-35 rounded-lg"
            >
              NO
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-full bg-slate-700 opacity-70 absolute"></div>
      <div className="z-10 sm:w-1/2 w-full sm:p-0 p-3 flex flex-col gap-3 items-center justify-center">
        <input
          type="text"
          value={saveData}
          onChange={handleChangeSaveData}
          name="nameFileSave"
          id="nameFileSave"
          className="w-full p-2 focus:outline-none rounded-xl"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSave(saveData)}
            className="p-3 px-5 rounded-2xl text-slate-50 font-bold bg-green-900 hover:bg-green-950"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelSave}
            className="p-3 rounded-2xl text-black font-bold bg-gray-300 hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
        <button
          type="button"
          className="p-2 px-4 bg-stone-800 hover:bg-stone-700 rounded-xl text-white"
          onClick={() => setShowWarnHome(true)}
        >
          <FaHouse size={25} />
        </button>
      </div>
    </div>
  );
}
