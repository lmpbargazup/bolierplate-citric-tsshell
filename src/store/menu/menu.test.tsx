import { render, RenderResult, act } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { MenuModule } from '../../data/protocols/data/menu'
import '../../jest/mocks'
import { isEqual } from '../../utils/validates'
import Store, { useStore } from '../store'
import { setMenu } from './menu.actions'
import { menuInitialState, menuReducer } from './menu.reducer'
import { menuActionTypes } from './menu.types'

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

const menu: MenuModule = {
  id: 1,
  moduleName: 'Administration',
  route: '/administration',
  microfrontend: { id: 1, url: 'http://somewhere.com' }
}

describe('Menu store', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()

    const app = await sut.findByTestId('app')

    expect(sut).toBeTruthy()
    expect(app).toBeInTheDocument()
  })

  test('should change state by use store hook with dispatch push menu action', () => {
    makeSut()
    const { dispatch } = moduleStore

    act(() => {
      dispatch(setMenu([menu]))
    })

    expect(moduleStore.store.menus[1]).toBe(menu)
  })

  test('should menu reducer return updated state', () => {
    const state = menuReducer(menuInitialState, {
      type: menuActionTypes.SET_MENU,
      payload: [menu]
    })

    expect(
      isEqual(state, { menus: [...menuInitialState.menus, menu] })
    ).toBeTruthy()
  })

  test('should menu reducer return menu inital state because action type not finded', () => {
    const state = menuReducer(menuInitialState, {
      type: 'NO_ACTION',
      payload: [menu]
    })

    expect(isEqual(state, menuInitialState)).toBeTruthy()
  })

  test('should menu reducer return initial state when payload comes empty', () => {
    const state = menuReducer(menuInitialState, {
      type: menuActionTypes.SET_MENU,
      payload: []
    })

    expect(isEqual(state, { menus: [...menuInitialState.menus] })).toBeTruthy()
  })
})
