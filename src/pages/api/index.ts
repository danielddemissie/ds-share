import type { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json({ message: "Welcome to API" });
}
