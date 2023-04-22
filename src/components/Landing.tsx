import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Landing() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    async function getPublicImages() {
      const res = await axios("http://localhost:3000/api");
      const images = res.data.data;
      setImages(images);
    }

    getPublicImages();
  }, []);
  return (
    <div>
      <h1>landing</h1>
      <main className={styles.main}>
        {images.map((img: any) => (
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_PINIATA_CLOUD}/${img.ipfsHash}`}
              width={300}
              height={400}
              alt="image"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
