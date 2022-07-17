export interface IUser {
  readonly id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  getUserInfo();
}

export type ResponseUserType = Omit<IUser, 'password' | 'getUserInfo'>;
