import Modal from "./Modal";
import useLoginModalState from "../../zustand/UseLoginModal";
import useRegisterModalState from "../../zustand/useRegisterModal";
import axios, { AxiosError } from "axios";
import { userSlice } from "../../zustand/user";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

function LoginModal() {
  const loginModaLState = useLoginModalState();
  const registerModal = useRegisterModalState();
  const [status, setStatus] = useState({
    message: "",
    color: "",
    isLoading: false,
  });
  const user = userSlice((state) => state);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        value === ""
          ? "Email is required"
          : /^\S+@\S+$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        value === ""
          ? "password is required"
          : value.length < 6
          ? "password characters cannot be less tahn six"
          : value.length > 10
          ? "password characters cannot be more than ten"
          : null,
    },
  });
  const Login = async (values: { email: string; password: string }) => {
    setStatus({ ...status, isLoading: true });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email: values.email, password: values.password }
      );
      localStorage.setItem("user", JSON.stringify(data));
      user.setUser(data);
      setStatus({
        message: "Login Successful!",
        color: "text-green-500",
        isLoading: false,
      });
    } catch (error: any) {
      setStatus({
        message: `${error.response.data.msg}!`,
        color: "text-red-500",
        isLoading: false,
      });
    } finally {
      setTimeout(() => {
        form.reset(), setStatus({ message: "", color: "", isLoading: false });
      }, 5000);
    }
  };

  const body = (
    <>
      <form>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          mb={10}
          autoComplete="no"
        />
        <PasswordInput
          withAsterisk
          label="Password"
          autoComplete="no"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
      </form>
      {/* change to loading componment later */}
      <div className="mt-3 flex flex-col items-center">
        {status.isLoading && <p>...Loading</p>}
        <p className={`${status.color}`}>{status.message}</p>
      </div>
    </>
  );

  const handleSubmit = form.onSubmit(async (values) => {
    await Login(values);
  });
  const toggle = () => {
    loginModaLState.onClose();
    registerModal.onOpen();
  };
  const footer = (
    <div className="flex justify-center flex-wrap space-x-2 text-[14px]">
      <p className="text-neutral-600">Don't have an account yet?</p>
      <p onClick={toggle} className="cursor-pointer underline">
        Sign up{" "}
      </p>
    </div>
  );

  return (
    <Modal
      title="Login"
      isOpen={loginModaLState.isOpen}
      onClose={loginModaLState.onClose}
      actionLabel="Submit"
      onSubmit={handleSubmit}
      body={body}
      footer={footer}
    />
  );
}

export default LoginModal;
