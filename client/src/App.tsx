import { Routes, Route } from "react-router-dom";
import { Home, Apartment, Dashboard, UserListings } from "./pages";
import ProtectedRoute from "./util/ProtectedRoute";
import Apartments from "./pages/Apartments";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import { useNavigate } from "react-router-dom";
import CreateListingModal from "./components/modal/CreateListingModal";
import axios from "axios";

function App() {
  const [files, setFiles] = useState<FileList | null | undefined>(null);
  const images: string[] = [];
  const user = userSlice((state) => state);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("user");
    user.removeUser();
    navigate(0);
  };
  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    if (storageUser != null) {
      const parsedUser: {
        name: string;
        isAdmin: boolean;
        id: string;
        token: string;
      } = JSON.parse(storageUser);
      user.setUser({ ...parsedUser });
      return;
    }
  }, []);

  const handleSubmit = async (files: FileList) => {
    const form_data = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      form_data.append("file", file);
      form_data.append("upload_preset", "shortlet");
      try {
        const {
          data: { url },
        } = await axios.post(
          "https://api.cloudinary.com/v1_1/draqmxlg6/image/upload",
          form_data
        );

        images.push(url);
      } catch (error) {
        console.log(error);
      }
    }
    console.log({ images });
  };

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:id" element={<Apartment />} />
        {user.user && (
          <Route path="/user/me/listings" element={<UserListings />} />
        )}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={"wale"}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={"home"} />
          <Route path="users" element={"list of user"} />
          <Route path="bookings" element={"bookings"} />
          <Route path="user/create" element={"create new user"} />
          <Route path="user/:userID" element={"single user"} />
          <Route path="user/:userID/edit" element={"edit user"} />
        </Route>
        <Route path="*" element={"route does not exist"} />
      </Routes>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (files) {
            console.log("submitted");
            await handleSubmit(files);
          }
        }}
        encType="multipart/form-data"
      >
        {/* <input
          type="file"
          name=""
          id=""
          onChange={(e) => {
            setFile(e.target.files?.item(0));
            console.log(file);
          }}
        /> */}
        <input
          type="file"
          name=""
          id=""
          multiple
          onChange={(e) => {
            setFiles(e.target.files);
            console.log(files);
          }}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}

export default App;
