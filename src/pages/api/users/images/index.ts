import { NextApiRequest, NextApiResponse } from "next";
import Image from "@/models/Image";
import authMiddleware from "@/lib/middlewares";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await authMiddleware(req, res);
  switch (req.method) {
    case "POST":
      const { ipfsHash, pinSize, timestamp, isDuplicate } = req.body;
      if (!ipfsHash) {
        res.status(400).json({
          message: "Missing ipfsHash",
        });
        return;
      }
      if (!pinSize) {
        res.status(400).json({
          message: "Missing pinSize",
        });
        return;
      }
      if (!timestamp) {
        res.status(400).json({
          message: "Missing timestamp",
        });
        return;
      }

      const image = await Image.create({
        ipfsHash,
        pinSize,
        timestamp,
        isDuplicate: isDuplicate ?? false,
        userId: user._id,
      });
      image.__v = undefined;
      res.status(200).json({
        message: "Image added",
        data: image,
      });

      break;
    case "GET":
      const images = await Image.find({ userId: user._id }).select(["-__v"]);
      res.status(200).json({
        message: "User images",
        data: images,
      });

      break;
    default:
      res.status(404).json({ error: "Route not found" });
  }
}
