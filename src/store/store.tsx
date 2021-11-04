/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import React, { createContext, useContext, useReducer } from 'react'
import {
  menuOptionInitialState,
  menuOptionReducer
} from './menu-option/menu-option.reducer'
import { menuInitialState, menuReducer } from './menu/menu.reducer'
import {
  notificationsInitialState,
  notificationsReducer
} from './notifications/notifications.reducer'
import { StoreType } from './store.types'
import { userInitialState, userReducer } from './user/user.reducer'

const combineReducers =
  (...reducers) =>
  (prevState, value, ...args) =>
    reducers.reduce(
      (newState, reducer) => reducer(newState, value, ...args),
      prevState
    )

const reducers = combineReducers(
  userReducer,
  notificationsReducer,
  menuReducer,
  menuOptionReducer
)

const storeInitialState = {
  ...userInitialState,
  ...notificationsInitialState,
  ...menuInitialState,
  ...menuOptionInitialState
}

export const Context = createContext(null)

const Store = ({ children }) => {
  const [store, dispatch] = useReducer(reducers, storeInitialState)

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Context.Consumer>{() => <>{children}</>}</Context.Consumer>
    </Context.Provider>
  )
}

export const useStore = () => useContext(Context) as StoreType

export default Store
