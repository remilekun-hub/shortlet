import Modal from "./Modal";
import RegisterModalState from "../../zustand/useRegisterModal";
import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { useState } from "react";

function RegisterModal(): JSX.Element {
  const [first, setfirst] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resMessage, setResMessage] = useState({ message: "", color: "" });
  const registerModal = RegisterModalState();

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
      {isLoading && "...Loading"}
      <p className="text-center">{first}</p>
    </>
  );

  const register = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name: values.name,
          email: values.email,
          password: values.email,
        }
      );
    } catch (error: any) {
      setfirst(error?.message);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        form.reset(), setfirst("");
      }, 5000);
    }
  };

  const handleFormSubmit = form.onSubmit(async (values) => {
    await register(values);
  });

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Submit"
      onSubmit={handleFormSubmit}
      body={body}
    />
  );
}

export default RegisterModal;
