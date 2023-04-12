interface ButtonProps {
  label: string;
  onSubmit?: () => void;
}

function Button({ label, onSubmit }: ButtonProps) {
  return (
    <button
      className="w-full p-3 text-center bg-rose-500 text-white rounded-md font-medium"
      onClick={onSubmit}
    >
      {label}
    </button>
  );
}

export default Button;
