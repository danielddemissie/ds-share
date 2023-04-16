import type { NextApiRequest, NextApiResponse } from "next";
import Image from "@/models/Image";
import dbConnect from "@/lib/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST":
      res.status(200).json({ message: "Welcome to ds-share API" });
      break;
    case "GET":
      const images = await Image.find({
        isPublic: true,
      }).select(["-__v"]);
      res.status(200).json({
        message: "All public images",
        data: images,
      });
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
