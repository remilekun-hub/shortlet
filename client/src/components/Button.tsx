interface ButtonProps {
  label: string;
  onSubmit?: () => void;
}

function Button({ label, onSubmit }: ButtonProps) {
  return (
    <button
      className="w-full p-3 text-center bg-green-400 text-white rounded-md font-bold"
      onClick={onSubmit}
    >
      {label}
    </button>
  );
}

export default Button;
