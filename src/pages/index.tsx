import Image from "next/image";
import { useState } from "react";
import useImages from "./hooks/useImages";
import styles from "../styles/Home.module.css";

export default function Home() {
  const images: any[] = useImages("animals", 10);
  const [files, setFile] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();
  const handleFile = (e: any) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i: any) => {
    setFile(files.filter((x) => x.name !== i));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-3 md:w-1/2 w-[1000px] rounded-md ">
        <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
          {message}
        </span>
        <div className="h-32 w-full overflow-hidden relative shadow-md items-center rounded-md border-gray-400">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute cursor-pointer"
            multiple
            name="files[]"
          />
          <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
            <div className="flex flex-col">
              <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
              <span className="text-[12px]">Drag and Drop a file to share</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, key) => {
            return (
              <div
                key={key}
                className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="h-12 w-12 ">
                    <img
                      className="w-full h-full rounded"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                  <span className="truncate w-44">{file.name}</span>
                </div>
                <div
                  onClick={() => {
                    removeImage(file.name);
                  }}
                  className="h-6 w-6  flex items-center cursor-pointer justify-center rounded-sm"
                >
                  <i className="mdi mdi-trash-can bg-green-400 text-white text-[14px]"></i>
                  <i className="mdi mdi-trash-can text-white bg-red-400 text-[14px]"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center space-x-6 space-y-6">
        {images.map((image) => (
          <div className="">
            <Image
              className="rounded-md"
              src={image.urls.regular}
              alt={image.alt_description}
              width={400}
              height={300}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
