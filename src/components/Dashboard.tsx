import React, { useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "./Header";

export default function Dashboard() {
  const route = useRouter();
  useEffect(() => {
    const userDetail = localStorage.getItem("user-detail");
    if (!userDetail) route.push("/login");
  }, []);

  const userDetail = JSON.parse(localStorage.getItem("user-detail") as string);
  return (
    <div>
      <Header />
      <FileUpload />
      <section>
        <h2>Public Images</h2>
        <div>
          {userDetail.images.public.map((el: any) => (
            <Image
              src={`${process.env.NEXT_PUBLIC_PINIATA_CLOUD}/${el.ipfsHash}`}
              width={300}
              height={400}
              alt="image"
            />
          ))}
        </div>
      </section>
      <section>
        <h2>Private Images</h2>
        <div>
          {userDetail.images.private.length > 0 ? (
            userDetail.images.private.map((el: any) => (
              <Image
                src={`${process.env.NEXT_PUBLIC_PINIATA_CLOUD}/${el.ipfsHash}`}
                width={300}
                height={400}
                alt="image"
              />
            ))
          ) : (
            <h4>
              No Private Image found Please Upload Images To see contetens here
              :){" "}
            </h4>
          )}
        </div>
      </section>
    </div>
  );
}
