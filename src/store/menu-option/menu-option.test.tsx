import { render, RenderResult, waitFor } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { MenuModule } from '../../data/protocols/data/menu'
import { isEqual } from '../../utils/validates'
import Store, { useStore } from '../store'
import { selectMenuOption } from './menu-option.actions'
import {
  menuOptionInitialState,
  menuOptionReducer
} from './menu-option.reducer'
import { menuOptionActionTypes } from './menu-option.types'

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

const mockMenuModule: MenuModule = {
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

  test('should change state by use store hook with dispatch push menu option action', async () => {
    makeSut()
    await waitFor(() => moduleStore.dispatch(selectMenuOption(mockMenuModule)))
    const { store } = moduleStore
    expect(store.menuOptionSelected).toBe(mockMenuModule)
  })

  test('should menu reducer return updated state', () => {
    const state = menuOptionReducer(menuOptionInitialState, {
      type: menuOptionActionTypes.SELECT_MENU_OPTION,
      payload: mockMenuModule
    })

    expect(
      isEqual(state, {
        menuOptionSelected: mockMenuModule,
        menuOptionWasSelected: !menuOptionInitialState.menuOptionWasSelected
      })
    ).toBeTruthy()
  })

  test('should menu reducer return menu option inital state because action type not finded', () => {
    const state = menuOptionReducer(menuOptionInitialState, {
      type: 'NO_ACTION',
      payload: mockMenuModule
    })

    expect(
      isEqual(state, {
        menuOptionSelected: undefined,
        menuOptionWasSelected: menuOptionInitialState.menuOptionWasSelected
      })
    ).toBeTruthy()
  })
})
