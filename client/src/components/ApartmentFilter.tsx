import { useCallback } from "react";

interface Props {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

function ApartmentFilter({ title, value, onChange }: Props) {
  const reduce = useCallback(() => {
    if (value == 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  const Add = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex flex-col">
        <p className="font-light text-gray-600">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="w-6 h-6 rounded-full border-[1px] border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={reduce}
        >
          -
        </div>
        <div className="font-light text-md text-neutral-600 cursor-default">
          {value}
        </div>
        <div
          className="w-6 h-6 rounded-full border-[1px] border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={Add}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default ApartmentFilter;
