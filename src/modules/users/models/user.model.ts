export interface IUser {
  readonly id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  updatePassword(oldPassword: string, newPassword: string): boolean;
  getUserInfo();
}

export type ResponseUserType = Omit<
  IUser,
  'password' | 'updatePassword' | 'getUserInfo'
>;
