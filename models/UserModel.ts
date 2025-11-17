export interface UserModel {
  guid?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated?: string;
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}
