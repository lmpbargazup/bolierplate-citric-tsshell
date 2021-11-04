import { render, RenderResult, act } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { mockUser } from '../../jest/__mocks__/user'
import { isEqual } from '../../utils/validates'
import Store, { useStore } from '../store'
import { setUser } from './user.actions'
import { userInitialState, userReducer } from './user.reducer'
import { userActionTypes } from './user.types'

let moduleStore

const MockComponent = (): ReactElement => {
  const store = useStore()
  moduleStore = store
  return <h1 data-testid="app">My App</h1>
}

type SutType = {
  sut: RenderResult
}

const makeSut = (): SutType => {
  const sut = render(
    <Store>
      <MockComponent />
    </Store>
  )
  return { sut }
}

describe('Notifications reducer', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()

    const app = await sut.findByTestId('app')

    expect(sut).toBeTruthy()
    expect(app).toBeInTheDocument()
  })

  test('should change state by use store hook with dispatch push notifications', () => {
    makeSut()
    const { dispatch } = moduleStore

    act(() => {
      dispatch(setUser(mockUser))
    })

    expect(moduleStore.store.user).toBe(mockUser)
  })

  test('should notifications reducer return updated state', () => {
    const state = userReducer(userInitialState, {
      type: userActionTypes.SET_USER,
      payload: mockUser
    })

    expect(isEqual(state, { user: mockUser })).toBeTruthy()
  })

  test('should notifications reducer return notifications inital state because action type not finded', () => {
    const state = userReducer(userInitialState, {
      type: 'NO_ACTION',
      payload: mockUser
    })

    expect(isEqual(state, userInitialState)).toBeTruthy()
  })
})
