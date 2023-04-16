import axios from "axios";
import styles from "../styles/Home.module.css";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";

export async function getServerSideProps() {
  const res = await axios("http://localhost:3000/api");
  const images = res.data.data;
  return {
    props: {
      images,
    },
  };
}

export default function Home({ images }: { images: string[] }) {
  return (
    <main className={styles.main}>
      <FileUpload />
      {images.map((img: any) => (
        <div>
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${img.ipfsHash}`}
            width={300}
            height={400}
            alt="image"
          />
        </div>
      ))}
    </main>
  );
}
