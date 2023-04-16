import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Decoded } from "@/types";
import User from "@/models/User";
import dbConnect from "./db";

export default async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    await dbConnect();
    const token = req.headers.authorization.split("Bearer ")[1];
    try {
      const { userId } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as unknown as Decoded;
      const user = await User.findById(userId).select(["-password,-__v"]);
      if (!user) {
        res.status(401).json({
          error: "Unauthorized user",
        });
        return;
      }
      return user;
    } catch (error) {
      res.status(401).json({
        error: "Invalid token",
      });
      return;
    }
  } else {
    res.status(401).json({
      error: "Unauthorized user",
    });
    return;
  }
}
