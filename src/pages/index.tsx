import styles from "@styles/Home.module.css";
import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className={styles.main}>
      <FileUpload />
    </main>
  );
}
