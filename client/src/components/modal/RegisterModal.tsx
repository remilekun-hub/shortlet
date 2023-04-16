import Modal from "./Modal";
import RegisterModalState from "../../zustand/useRegisterModal";
import useLoginModalState from "../../zustand/UseLoginModal";
import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useState } from "react";

function RegisterModal(): JSX.Element {
  const loginModal = useLoginModalState();
  const registerModal = RegisterModalState();
  const [status, setStatus] = useState({
    message: "",
    color: "",
    isLoading: false,
  });

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) =>
        value === ""
          ? "Your name is required"
          : value.length <= 3
          ? "Name is too short"
          : null,
      email: (value) =>
        value === ""
          ? "Email is required"
          : /^\S+@\S+$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        value === ""
          ? "Password is required"
          : value.length < 6
          ? "Password characters cannot be less tahn six"
          : value.length > 10
          ? "Password characters cannot be more than ten"
          : null,
    },
  });
  const body = (
    <>
      <form>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Michael"
          {...form.getInputProps("name")}
          mb={10}
          autoComplete="no"
        />
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
        {status.isLoading && <p>... Loading</p>}
        <p className={`${status.color}`}>{status.message}</p>
      </div>
    </>
  );

  const register = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setStatus({ ...status, isLoading: true });
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        name: values.name,
        email: values.email,
        password: values.email,
      });
      setStatus({
        message: "Registration Successful!",
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

  const handleFormSubmit = form.onSubmit(async (values) => {
    await register(values);
  });

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };
  const footer = (
    <div className="flex justify-center flex-wrap space-x-2 text-[14px]">
      <p className="text-neutral-600">Already have an account?</p>
      <p onClick={toggle} className="cursor-pointer underline">
        Log in{" "}
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Submit"
      onSubmit={handleFormSubmit}
      body={body}
      footer={footer}
    />
  );
}

export default RegisterModal;
