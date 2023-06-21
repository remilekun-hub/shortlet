import Modal from "./Modal";
import useLoginModalState from "../../zustand/UseLoginModal";
import useRegisterModalState from "../../zustand/useRegisterModal";
import axios, { AxiosError } from "axios";
import { userSlice } from "../../zustand/user";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Loader } from "@mantine/core";
import { useState } from "react";
import { Baseurl } from "../../baseurl";

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
          ? "password should be more than six"
          : null,
    },
  });
  const Login = async (values: { email: string; password: string }) => {
    setStatus({ ...status, isLoading: true });

    try {
      const { data } = await axios.post(`${Baseurl}/api/v1/auth/login`, {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      user.setUser(data);
      loginModaLState.onClose();
    } catch (error: any) {
      setStatus({
        message: `${error.response.data.msg}!`,
        color: "text-red-500",
        isLoading: false,
      });
    } finally {
      setTimeout(() => {
        form.reset(), setStatus({ message: "", color: "", isLoading: false });
      }, 3000);
    }
  };

  const body = (
    <>
      <form>
        <TextInput
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          size="md"
          mb={20}
          autoComplete="no"
        />
        <PasswordInput
          size="md"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
      </form>

      <div className="mt-3 flex flex-col items-center">
        {status.isLoading && <Loader size={"sm"} color="#412db3" />}
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
