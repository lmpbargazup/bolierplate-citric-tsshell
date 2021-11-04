import { render, RenderResult } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { MenuModule } from '../../data/protocols/data/menu'
import { NotificationData } from '../../data/protocols/data/notification'
import '../../jest/mocks'
import { mockGlobalStoreAction, mockGlobalStoreApp } from '../../jest/__mocks__/redux-micro-frontend'
import { mockUser } from '../../jest/__mocks__/user'
import { isEqual } from '../../utils/validates'
import constants from '../constants/constants'
import Store, { combineReducers, setModuleStoreDispatch, updateStore, useStore } from './store'
import { storeInitialState, storeReducer } from './store.reducer'
import { storeActionTypes } from './store.types'
import { setUser } from './user/user.actions'
import { userActionTypes } from './user/user.types'

export const mockActionTypes = {
  SET_FIRST: '@first/SET_FIRST',
  SET_SECOND: '@second/SET_SECOND'
}

export type AnyState = FirstState | SecondtState

export type FirstState = {
  first: string
}

const firstInitialState: AnyState = {
  first: ''
}

export const firstReducer = (state = firstInitialState, action): FirstState => {
  const actionTypes = {
    [mockActionTypes.SET_FIRST]: { ...state, first: action.payload }
  }

  return actionTypes[action.type] || state
}

export type SecondtState = {
  second: string
}

const secondInitialState: AnyState = {
  second: ''
}

export const secondReducer = (state = secondInitialState, action): SecondtState => {
  const actionTypes = {
    [mockActionTypes.SET_SECOND]: { ...state, second: action.payload }
  }

  return actionTypes[action.type] || state
}

type SutType = {
  sut: RenderResult
}

let moduleStore

const MockComponent = (): ReactElement => {
  const store = useStore()
  moduleStore = store
  return <h1 data-testid='app'>My App</h1>
}

const makeSut = (): SutType => {
  const sut = render(
    <Store>
      <MockComponent />
    </Store>
  )
  return { sut }
}

const { PLATFORM } = constants.REDUX.APPS

const notifications: NotificationData[] = [{ id: '111', message: 'message1', pluginName: 'pluginName1', read: true, timestamp: 'timestamp1', userId: 111 }, { id: '222', message: 'message2', pluginName: 'pluginName2', read: false, timestamp: 'timestamp2', userId: 222 }]

const menus: MenuModule[] = [
  {
    id: 1,
    moduleName: 'Administration',
    route: '/administration',
    microfrontend: { id: 1, url: 'http://somewhere.com' }
  }
]

describe('Store', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()

    const app = await sut.findByTestId('app')

    expect(sut).toBeTruthy()
    expect(app).toBeInTheDocument()
  })

  test('should combine reducers function return combined reducers and dispatch change states', () => {
    const dispatch = combineReducers(firstReducer, secondReducer)
    const first = 'first'
    const second = 'second'
    const firstState = dispatch(firstInitialState, { type: mockActionTypes.SET_FIRST, payload: first })
    const secondState = dispatch(secondInitialState, { type: mockActionTypes.SET_SECOND, payload: second })
    expect(firstState.first).toBe(first)
    expect(secondState.second).toBe(second)
  })

  test('shoulg dispatch and change state by use store hook', () => {
    const { dispatch } = moduleStore

    dispatch(setUser(mockUser))
    expect(mockGlobalStoreApp).toBe(PLATFORM)
    expect(mockGlobalStoreAction.type).toBe(userActionTypes.SET_USER)
    expect(mockGlobalStoreAction.payload).toBe(mockUser)
  })

  test('should module store dispatch send correctly payload', () => {
    let mockPayload
    const mockDispatch = (payload): void => {
      mockPayload = payload
    }
    setModuleStoreDispatch(mockDispatch)
    const updatedStore = {
      [PLATFORM]: {
        store: 'updatedStore'
      }
    }
    updateStore(updatedStore)
    expect(mockPayload.type).toBe(storeActionTypes.UPDATE_STORE)
    expect(mockPayload.value).toBe(updatedStore.store)
  })

  test('should store reducer return updated store', () => {
    const mockPayload = {
      user: mockUser,
      notifications,
      menus
    }

    const updatedStore = storeReducer(storeInitialState, { type: storeActionTypes.UPDATE_STORE, payload: mockPayload })

    expect(updatedStore.user).toBe(mockUser)
    expect(updatedStore.notifications).toBe(notifications)
    expect(updatedStore.menus).toBe(menus)
  })

  test('should store reducer return store because payload is not different', () => {
    const mockPayload = {
      user: mockUser
    }

    const store1 = storeReducer(storeInitialState, { type: storeActionTypes.UPDATE_STORE, payload: mockPayload })

    const store2 = storeReducer(store1, { type: storeActionTypes.UPDATE_STORE, payload: store1 })

    expect(isEqual(store1, store2)).toBeTruthy()
  })

  test('should store reducer return store inital state because action type not finded', () => {
    const mockPayload = {
      user: mockUser
    }

    const store = storeReducer(storeInitialState, { type: 'NOT_FINDED', payload: mockPayload })

    expect(isEqual(storeInitialState, store)).toBeTruthy()
  })
})
