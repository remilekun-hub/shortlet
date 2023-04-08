import Modal from "./Modal";
import useLoginModalState from "../../zustand/UseLoginModal";

function LoginModal() {
  const loginModaLState = useLoginModalState();
  return (
    <Modal
      title="Login"
      isOpen={loginModaLState.isOpen}
      onClose={loginModaLState.onClose}
      actionLabel="Submit"
    />
  );
}

export default LoginModal;
