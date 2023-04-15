import axios from "axios";
import styles from "../styles/Home.module.css";
import FileUpload from "@/components/FileUpload";

export async function getServerSideProps() {
  const res = await axios("/api");
  const images = res.data;
  return {
    props: {
      images,
    },
  };
}

export default function Home({ images }: { images: string[] }) {
  console.log(images);
  return (
    <main className={styles.main}>
      <FileUpload />
    </main>
  );
}
