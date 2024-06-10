export interface UserFormData {
  email: string,
  password: string
}

export interface User {
  id: number,
  email: string,
  password: string
}
export interface UserWithoutPassword extends Omit<User, 'password'> {}

export interface SessionToken {
  token: number,
  userId: number,
  expires: number,
  isInvalid: boolean
}