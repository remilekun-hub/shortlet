import { Navigate } from "react-router-dom";
import { userSlice } from "../zustand/user";

interface favourite {
  _id: string;
  propertyId: string;
}

type UserType = {
  name: string;
  id: string;
  token: string;
  image: string;
  favourites: favourite[];
};
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
