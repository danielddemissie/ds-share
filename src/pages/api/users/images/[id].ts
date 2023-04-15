//TODO: handle specific image actions like share, delete, etc.
import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "@/lib/middlewares";
import Image from "@/models/Image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await authMiddleware(req, res);
  const { id } = req.query;

  switch (req.method) {
    case "POST":
      const sharedWith = req.body;
      if (!sharedWith || !sharedWith.length) {
        res.status(400).json({
          message: "Missing sharedWith should be an array of user ids",
        });
        return;
      }
      const image = await Image.findOne({ _id: id, userId: user._id });
      if (!image) {
        res.status(404).json({
          message: "Image not found",
        });
        return;
      }

      image.sharedWith = [...sharedWith, ...image.sharedWith];
      await image.save();
      res.status(200).json({
        message: "Image shared",
        data: image,
      });
      break;
    case "DELETE":
      const deletedImage = await Image.findOneAndDelete({
        _id: id,
        userId: user._id,
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

      const updatedImage = await Image.findOneAndUpdate(
        { _id: id, userId: user._id },
        {
          ipfsHash,
          pinSize,
          timestamp,
          isDuplicate: isDuplicate ?? false,
          userId: user._id,
        },
        { new: true }
      );
      if (!updatedImage) {
        res.status(404).json({
          message: "Image not found",
        });
        return;
      }
      res.status(200).json({
        message: "Image updated",
        data: updatedImage,
      });
    default:
      break;
  }
}
