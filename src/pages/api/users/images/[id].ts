import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "@/lib/middlewares";
import Image from "@/models/Image";
import dbConnect from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await authMiddleware(req, res);
  const { id } = req.query;
  await dbConnect();
  switch (req.method) {
    case "POST":
      const { sharedWith } = req.body;
      if (!sharedWith || !sharedWith.length) {
        res.status(400).json({
          message: "Missing sharedWith should be an array of user ids",
        });
        return;
      }
      const image = await Image.findOne({ _id: id, ownerId: user._id });
      if (!image) {
        res.status(404).json({
          message: "Image not found",
        });
        return;
      }

      //?: ignore when user already shared
      image.sharedWith = Array.from(
        new Set([...sharedWith, ...image.sharedWith])
      );
      res.status(200).json({
        message: "Image shared",
        data: image,
      });
      break;
    case "DELETE":
      const deletedImage = await Image.findOneAndDelete({
        _id: id,
        ownerId: user._id,
      });
      if (!deletedImage) {
        res.status(404).json({
          message: "Image not found",
        });
        return;
      }
      res.json({ message: "Image deleted" });
      break;
    case "PUT":
      const { ipfsHash, pinSize, timestamp, isDuplicate, isPublic } = req.body;
      const oldImage = await Image.findById(id);
      if (oldImage.isPublic && isPublic === false) {
        res.status(400).json({
          message: "Cannot make a public image private",
        });
        return;
      }
      const updatedData = {
        ipfsHash: ipfsHash ?? oldImage.ipfsHash,
        pinSize: pinSize ?? oldImage.pinSize,
        timestamp: timestamp ?? oldImage.timestamp,
        isDuplicate: isDuplicate ?? oldImage.isDuplicate,
        isPublic: isPublic ?? oldImage.isPublic,
        ownerId: user._id,
      };
      oldImage.set(updatedData);
      await oldImage.save();
      if (!oldImage) {
        res.status(404).json({
          message: "Image not found",
        });
        return;
      }
      res.status(200).json({
        message: "Image updated",
        data: oldImage,
      });
    default:
      break;
  }
}
