import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    await dbConnect();

    try {
      const user = await User.findOne({ name });
      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).json({ error: "Invalid name or password" });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      user.password = undefined;
      user.__v = undefined;
      res
        .status(200)
        .json({ user, message: "User signin successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(404).json({ error: "Route not found" });
  }
}
``;
