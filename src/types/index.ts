export interface User {}

export interface Decoded {
  userId: string;
  iat: Date;
  exp: Date;
}

export interface Image {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
}
