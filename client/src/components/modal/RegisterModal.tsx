import Modal from "./Modal";
import RegisterModalState from "../../zustand/useRegisterModal";
import useLoginModalState from "../../zustand/UseLoginModal";
import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, FileInput, Loader } from "@mantine/core";
import { useState } from "react";
import { singleImageUpload } from "../../util/singleImageUpload";
import { Baseurl } from "../../baseurl";

function RegisterModal(): JSX.Element {
  const loginModal = useLoginModalState();
  const registerModal = RegisterModalState();
  const [file, setFile] = useState<File | null | undefined>(null);
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
    validateInputOnChange: true,
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
          ? "Password is too short"
          : null,
    },
  });
  const body = (
    <>
      <form>
        <TextInput
          placeholder="Michael"
          size="md"
          {...form.getInputProps("name")}
          mb={20}
          autoComplete="no"
        />
        <FileInput
          placeholder="Upload image"
          my={20}
          value={file}
          size="md"
          accept="image/png,image/jpeg"
          onChange={setFile}
        />

        <TextInput
          size="md"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          mb={20}
          autoComplete="no"
        />
        <PasswordInput
          autoComplete="no"
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

  const register = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setStatus({ ...status, isLoading: true });
    try {
      const url = await singleImageUpload(file);
      await axios.post(`${Baseurl}/api/v1/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        image: url,
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
        setFile(null);
      }, 3000);
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
