import { UserData } from '../../data/protocols/data/user'
import { userActionTypes, UserState } from './user.types'

export const userInitialState: UserState = {
  user: {
    name: '',
    photoUrl: '',
    username: '',
    email: '',
    initials: '',
    userId: ''
  }
}
type UserAction = {
  payload: UserData
  type: string
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  const actionTypes = {
    [userActionTypes.SET_USER]: { ...state, user: action.payload }
  }

  return actionTypes[action.type] || state
}
