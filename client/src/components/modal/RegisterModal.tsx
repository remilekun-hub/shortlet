import Modal from "./Modal";
import RegisterModalState from "../../zustand/useRegisterModal";

function RegisterModal(): JSX.Element {
  const registerModal = RegisterModalState();

  const body = (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        name=""
        placeholder="Name"
        className="border-[2px] outline-none rounded-[5px] p-3 focus:bg-none"
      />
      <input
        type="text"
        name=""
        placeholder="Email"
        className="border-[2px] outline-none rounded-[5px] p-3 focus:bg-none"
      />
      <input
        type="password"
        name=""
        className="border-[2px] outline-none rounded-[5px] p-3 focus:bg-none bg-none"
      />
    </div>
  );
  const handleSubmit = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "remi", isAdmin: "true" })
    );
    alert("details submitted");
    registerModal.onClose();
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Submit"
      body={body}
      onSubmit={handleSubmit}
    />
  );
}

export default RegisterModal;
