type ShortPressProps = {
  name: string;
  saveMode: string[];
  showKeyDown: (name: string) => void;
};
export function ShortPress({ name, saveMode, showKeyDown }: ShortPressProps) {
  return (
    <>
      <li className="flex justify-between items-center border-b-2 border-t-2 px-2 py-1">
        {name[0].toUpperCase() + name.slice(1)}
        <div className="flex">
          {saveMode.map((e, index) => {
            return index > 0 ? <h3>{'+' + e}</h3> : <h3>{e}</h3>;
          })}
        </div>
        <button
          type="button"
          className="p-1 px-3 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
          onClick={() => showKeyDown(name)}
        >
          tukar
        </button>
      </li>
    </>
  );
}
