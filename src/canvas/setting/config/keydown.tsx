import { useEffect, useState } from 'react';

type KeydownDivProps = {
  sendData: (value: string[]) => void;
  handleKeyDow: (value: boolean) => void;
};

export default function KeydownDiv({
  sendData,
  handleKeyDow,
}: KeydownDivProps) {
  const [keyValue, setKeyValue] = useState<string[]>([]);

  const handleClick = () => {
    sendData(keyValue);
  };

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        setKeyValue(event.key === 'Shift' ? [''] : ['Shift', event.key]);
      } else if (event.ctrlKey) {
        setKeyValue(event.key === 'Control' ? [''] : ['Ctrl', event.key]);
      } else if (event.altKey) {
        setKeyValue(event.key === 'Alt' ? [''] : ['Alt', event.key]);
      } else {
        setKeyValue([event.key]);
      }
    };

    window.addEventListener('keydown', keydown);

    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <div className="w-full h-full absolute z-40 flex justify-center items-center text-white">
      <div className="w-full text-center z-40 flex flex-col items-center justify-center">
        <h1 className="mb-3 text-3xl w-1/2 font-bold p-2 bg-stone-900 rounded-lg">
          Ketikan Shortcut
        </h1>
        <div className="w-full flex items-center justify-center">
          {keyValue.map((e, index) => {
            return index > 0 ? (
              <div className="text-2xl">{'+' + e}</div>
            ) : (
              <div className="text-2xl">{e}</div>
            );
          })}
        </div>
        <div className="flex gap-3 w-full items-center justify-center">
          <button
            onClick={handleClick}
            type="button"
            className="p-2 mb-3 px-5 bg-green-900 hover:bg-green-600 rounded-xl"
          >
            Save
          </button>
          <button
            onClick={() => handleKeyDow(false)}
            type="button"
            className="p-2 mb-3 px-5 bg-red-900 hover:bg-red-600 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="w-full h-full absolute opacity-80 bg-slate-800"></div>
    </div>
  );
}
