import axios from "axios";

export const singleImageUpload = async (file: File | null | undefined) => {
  if (file != null && file != undefined) {
    const form_data = new FormData();
    form_data.append("file", file);
    form_data.append("upload_preset", "shortlet");

    try {
      const {
        data: { url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/draqmxlg6/image/upload",
        form_data
      );

      return url;
    } catch (error) {
      console.log(error);
    }
  }
};
