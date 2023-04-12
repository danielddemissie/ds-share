import { NextApiRequest, NextApiResponse } from "next";

//TODO: conditional for add and get
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: handle private and public images
  res.json({
    message: "Private images",
    data: [],
  });
}
