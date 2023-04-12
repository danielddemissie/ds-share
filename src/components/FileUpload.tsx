import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const JWT = `Bearer ${process.env.JWT}`;

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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZjVmM2ZiNS1kNDg5LTRiOTMtYmU4Yi0yMWQ3MDhjNzk1OTciLCJlbWFpbCI6ImRhbmllbGRkZW1pc3NpZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmM2MzcwNTExYjQ0NmI5OTFhNTIiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZmE5YWM0YmFjMDgxNDhhZTE2MzY5NTQ1NTFiNzQ1YjMwYzIyNzQ3ZTRlMjdhNGQyZWE1Mzc0MmQ5MDFlZjQxIiwiaWF0IjoxNjgxMTI0ODkzfQ.lXVuglW8XJ7xoA-S5vHEOXYYMSpxl5jGsuvfNnzpM30",
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
