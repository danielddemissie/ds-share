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
    try {
      await dbConnect();
      const { name, password } = req.body;
      if (!name) {
        res.status(400).json({ messaf: "Missing name" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Missing password" });
        return;
      }
      const existingUser = await User.findOne({ name });
      if (existingUser) {
        res.status(400).json({ message: "User name already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(404).json({ error: "Route not found" });
  }
}
