import { useEffect, useState } from 'react';

type KeydownDivProps = {
  sendData: (value: string[]) => void;
};

export default function KeydownDiv({ sendData }: KeydownDivProps) {
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
    <div className="w-full h-full absolute z-40 flex justify-center items-center">
      <div className="w-full text-center z-40">
        <div className="mb-3">Ketikan Shortcut</div>
        <div className="w-full flex items-center justify-center">
          {keyValue.map((e, index) => {
            return index > 0 ? (
              <div className="text-2xl">{'+' + e}</div>
            ) : (
              <div className="text-2xl">{e}</div>
            );
          })}
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="p-2 mb-3 px-5 bg-green-600 hover:bg-green-800 rounded-xl"
        >
          Save
        </button>
      </div>
      <div className="w-full h-full absolute opacity-80 bg-orange-500"></div>
    </div>
  );
}
