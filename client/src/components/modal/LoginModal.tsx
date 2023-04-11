import Modal from "./Modal";
import useLoginModalState from "../../zustand/UseLoginModal";
import axios from "axios";
import { userSlice } from "../../zustand/user";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";

function LoginModal() {
  const loginModaLState = useLoginModalState();
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
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email: values.email, password: values.password }
      );
      localStorage.setItem("user", JSON.stringify(data));
      user.setUser(data);
    } catch (error) {
      console.log(error);
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
    </>
  );

  const handleSubmit = form.onSubmit(async (values) => {
    await Login(values);
  });

  return (
    <Modal
      title="Login"
      isOpen={loginModaLState.isOpen}
      onClose={loginModaLState.onClose}
      actionLabel="Submit"
      onSubmit={handleSubmit}
      body={body}
    />
  );
}

export default LoginModal;
