import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const metadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
          },
        }
      );

      console.log("cleicke", res.data);
      //TODO: send me to backend
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className={styles.inputWrapper} htmlFor="input">
        Select file to upload
      </label>
      <input
        className={styles.input}
        type="file"
        id="input"
        onChange={changeHandler}
      />
      <button className={styles.btn} onClick={handleSubmission}>
        Upload
      </button>
    </>
  );
};

export default FileUpload;
