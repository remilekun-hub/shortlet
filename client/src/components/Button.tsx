interface ButtonProps {
  label: string;
  disabled?: boolean;
  onSubmit?: () => void;
}

function Button({ label, onSubmit, disabled }: ButtonProps) {
  return (
    <button
      className={`w-full p-3 py-2 sm:py-3 text-center bg-[#412db3] text-white rounded-md font-medium disabled:bg-rose-300`}
      onClick={onSubmit}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
