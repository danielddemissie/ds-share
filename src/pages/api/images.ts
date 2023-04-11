import type { NextApiRequest, NextApiResponse } from "next";

export interface UploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export function regiserUser(req: NextApiRequest, res: NextApiResponse<any>) {
  //TODO: register user
  res.json({ message: "registerd" });
}

export function loginUser(req: NextApiRequest, res: NextApiResponse<any>) {
  //TODO: login user
  res.json({ message: "logged in" });
}

export function getPublicImages(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //TODO: public images
  res.json({ images: [] });
}

export function getPrivateImages(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //TODO: private images
  res.json({
    images: [],
  });
}

export function shareWithUser(req: NextApiRequest, res: NextApiResponse<any>) {
  //TODO: share with user
  res.json({ message: "shared" });
}

export default function uploadImages(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //TODO: register user
  res.status(200).json({ message: "Image uploaded successfully" });
}
