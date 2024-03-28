export type IUserData = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IUser = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
