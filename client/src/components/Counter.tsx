import { useCallback } from "react";

interface Props {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({ title, subtitle, value, onChange }: Props) {
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
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={reduce}
        >
          -
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={Add}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default Counter;
