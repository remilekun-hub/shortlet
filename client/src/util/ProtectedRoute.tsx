import { Navigate } from "react-router-dom";
import { userSlice } from "../zustand/user";

type Prop = {
  children: JSX.Element;
};
const ProtectedRoute = ({ children }: Prop) => {
  const user = userSlice((state) => state.user);
  if (!user) {
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
