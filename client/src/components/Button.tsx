interface ButtonProps {
  label: string;
  disabled?: boolean;
  onSubmit?: () => void;
  secondary?: boolean;
}

function Button({ label, onSubmit, disabled, secondary }: ButtonProps) {
  return (
    <button
      className={`w-full p-3 py-2 sm:py-3 text-center bg-[#412db3] rounded-md font-medium disabled:bg-[$412db3/40] ${
        secondary ? "bg-white border border-black text-black" : "text-white"
      }`}
      onClick={onSubmit}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
