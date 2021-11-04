import { UserData } from '../../data/protocols/data/user'
import { userActionTypes } from './user.types'

export type UserAction = {
  payload: UserData
  type: string
}

export const setUser = (value: UserData): UserAction => ({
  type: userActionTypes.SET_USER,
  payload: value
})
