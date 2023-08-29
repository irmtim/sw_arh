//Для примера
export type RoleType = 'admin' | 'user'

export interface AuthModel {
  api_token: string
  refreshToken?: string
}

export interface UserModel {
  id: string
  name: string
  roles?: RoleType[]
}