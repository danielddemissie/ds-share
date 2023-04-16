import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Image from "next/image";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    console.log("selectedFile", event.target.files[0]);
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
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
          },
        }
      );
      const image = await axios.post(
        "/api/users/images",
        {
          ipfsHash: res.data.IpfsHash,
          pinSize: res.data.PinSize,
          isDuplicate: res.data.IsDuplicate ?? false,
          timestamp: res.data.Timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImg = () => {
    setSelectedFile("");
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
        onClick={(e: any) => {
          e.target.value = null;
        }}
        onChange={changeHandler}
      />
      <button className={styles.btn} onClick={handleSubmission}>
        Upload
      </button>
      {selectedFile && (
        <div className="temp-show">
          <Image
            width={400}
            height={400}
            alt="temp image"
            className="temp-image"
            src={URL.createObjectURL(selectedFile)}
          />
          <div className="image-action">
            <h2>{selectedFile.name}</h2>
            <button className="remove-btn" onClick={handleRemoveImg}>
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
