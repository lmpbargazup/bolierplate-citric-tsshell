import { UserData } from '../../data/protocols/data/user'

export type UserState = {
  user: UserData
}

export const userActionTypes = {
  SET_USER: '@user/SET_USER'
}
