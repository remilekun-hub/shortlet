import { Navigate } from "react-router-dom";

type Prop = {
  children: JSX.Element;
  user: string;
};
const ProtectedRoute = ({ children, user }: Prop) => {
  if (user !== "remi") {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
