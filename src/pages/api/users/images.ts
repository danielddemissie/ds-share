import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Image from "@/models/Image";
import { Decoded } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        const token = req.headers.authorization.split("Bearer ")[1];
        const user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as unknown as Decoded;
        console.log(user);
        const userExisit = await User.findById(user.userId);
        if (!userExisit) {
          res.status(401).json({
            message: "User not found",
          });
          return;
        }
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
          userId: user.userId,
        });
        image.__v = undefined;
        res.status(200).json({
          message: "Image added",
          data: image,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized user",
        });
      }
      break;
    case "GET":
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        const token = req.headers.authorization.split("Bearer ")[1];
        const user = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as unknown as Decoded;

        const userExisit = await User.findById(user.userId);
        if (!userExisit) {
          res.status(401).json({
            message: "User not found",
          });
          return;
        }

        const images = await Image.find({ userId: user.userId }).select([
          "-__v",
        ]);
        res.status(200).json({
          message: "User images",
          data: images,
        });
      } else {
        res.status(401).json({
          message: "Unauthorized user",
        });
      }
      break;
    default:
      res.status(404).json({ error: "Route not found" });
  }
}
