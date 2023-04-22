import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "@/lib/middlewares";
import User from "@/models/User";
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
    case "GET":
      if (user._id == id) {
        const publicImages = await Image.find({ isPublic: true });
        const privateImages = await Image.find({
          ownerId: id,
          isPublic: false,
        });
        res.status(200).json({
          message: "user details",
          data: {
            user,
            sharedUsers: [],
            images: {
              public: publicImages || [],
              private: privateImages || [],
              shareWithMe: [],
            },
          },
        });
      } else {
        res.status(400).json({
          message: "User not found or invalid token",
          data: null,
        });
      }
      break;
    case "DELETE":
      const deletedUser = await User.findOneAndDelete(user._id);
      if (!deletedUser) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      res.json({ message: "User deleted" });
      break;
    case "PUT":
      const { name, password } = req.body;
      if (!name) {
        res.status(400).json({
          message: "Missing name",
        });
        return;
      }
      if (!password) {
        res.status(400).json({
          message: "Missing password",
        });
        return;
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          name,
          password,
        },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
      res.status(200).json({
        message: "User updated",
        data: updatedUser,
      });
    default:
      break;
  }
}
