import Image from "next/image";
import React from "react";

export default function Card(props: ICardProps) {
  return (
    <div>
      <Image src={props.url} width={300} height={400} alt="alt image" />
    </div>
  );
}

export interface ICardProps {
  url: string;
}
