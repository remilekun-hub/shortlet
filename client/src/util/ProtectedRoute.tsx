import { Navigate } from "react-router-dom";

type Prop = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Prop) => {
  const user = localStorage.getItem("user");

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
