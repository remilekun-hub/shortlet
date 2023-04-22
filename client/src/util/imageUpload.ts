import axios from "axios";

export const imageUpload = async (files: FileList | null) => {
  const images: string[] = [];
  const form_data = new FormData();

  if (files != null) {
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
    return images;
  } else return [];
};
