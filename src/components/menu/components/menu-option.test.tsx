import { fireEvent, RenderResult, screen } from '@testing-library/react'
import React from 'react'
import constants from '../../../constants/constants'
import styles from '../../../constants/styles'
import { MenuModule } from '../../../data/protocols/data/menu'
import renderWithDependencies, {
  setMockAsPath
} from '../../../jest/render-with-dependencies'
import { menuOptionActionTypes } from '../../../store/menu-option/menu-option.types'
import { homeModule } from '../../../store/menu/menu.reducer'
import { history } from '../../history/history'
import { MenuOption } from './menu-option'

const { PRIMARY } = styles.COLORS

const fakeModule: MenuModule = {
  id: 1,
  moduleName: 'Administration',
  route: '/administration',
  microfrontend: { id: 1, url: 'http://somewhere.com' },
  contexts: [
    {
      id: 1,
      contextName: 'Organization',
      pages: [
        {
          id: 1,
          name: 'General',
          route: '/general',
          microfrontend: { id: 1, url: 'http://somewhere.com' }
        }
      ]
    }
  ]
}

type SutType = {
  sut: RenderResult
}

type SutParams = {
  module?: MenuModule
  dispatchSpy?: jest.Mock<any, any>
  menuOptionSelected?: MenuModule
}

const makeSut = ({
  module = homeModule,
  dispatchSpy = jest.fn(),
  menuOptionSelected = undefined
}: SutParams): SutType => {
  const sut = renderWithDependencies({
    children: <MenuOption module={module} />,
    provider: { store: { menuOptionSelected }, dispatch: dispatchSpy }
  })

  return { sut }
}

const {
  MENU_OPTION,
  MENU_OPTION_ICON_CONTAINER
} = constants.DATA_TESTID.CONTAINERS.MENU

describe('MenuOption component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    const wrapper = makeSut({})
    expect(wrapper).toBeTruthy()
  })

  test('should render correctly with optionSelected', () => {
    const { sut } = makeSut({ menuOptionSelected: homeModule })
    expect(sut).toBeTruthy()
  })

  test('should render correctly with optionSelected different than the module loaded', () => {
    const { sut } = makeSut({ menuOptionSelected: fakeModule })
    expect(sut).toBeTruthy()
  })

  test('should render with unknown module and dont render the unknown module', async () => {
    const unknownModule: MenuModule = {
      ...fakeModule,
      moduleName: 'Unknown'
    }
    makeSut({ module: unknownModule })
    const contextName = screen.queryByText(
      unknownModule.contexts[0].contextName
    )
    expect(contextName).toBeFalsy()
  })

  test('should execute action on click in component', async () => {
    history.push = jest.fn()
    const { sut } = makeSut({})

    const menuOption = await sut.findByTestId(MENU_OPTION)

    fireEvent.click(menuOption)

    expect(history.push).toHaveBeenCalledTimes(1)
  })

  test('should home menu option start selected', async () => {
    makeSut({})
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )
    expect(menuOptionIconContainer).toHaveStyle(
      'background: rgba(255, 109, 0, 0.1)'
    )
    expect(menuOptionIconContainer).toHaveStyle(
      `border-left: 4px solid ${PRIMARY}`
    )
  })

  test('should random menu option start not selected', async () => {
    makeSut({ module: fakeModule })
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )
    expect(menuOptionIconContainer).toHaveStyle('background: none')
    expect(menuOptionIconContainer).toHaveStyle('border-left: none')
  })

  test('should dispatch SELECT_MENU_OPTION when some menu option was clicked', async () => {
    const dispatchSpy = jest.fn()
    makeSut({ module: fakeModule, dispatchSpy })

    const menuOption = await screen.findByTestId(MENU_OPTION)
    fireEvent.click(menuOption)

    const expectedAction = {
      type: menuOptionActionTypes.SELECT_MENU_OPTION,
      payload: fakeModule
    }

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction)
  })

  test('should set menu option selected when history has specific route', async () => {
    setMockAsPath('/administration/profile')

    makeSut({ module: fakeModule })
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )

    expect(menuOptionIconContainer).toHaveStyle(
      'background: rgba(255, 109, 0, 0.1)'
    )
    expect(menuOptionIconContainer).toHaveStyle(
      `border-left: 4px solid ${PRIMARY}`
    )
  })

  test('should render Icon when module is "Demo Pages"', async () => {
    const demoPagesModule = { ...fakeModule, moduleName: 'Demo Pages' }
    makeSut({ module: demoPagesModule })
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )
    expect(menuOptionIconContainer.childElementCount).toBe(1)
  })

  test('should render Icon when module is "Catalog"', async () => {
    const demoPagesModule = { ...fakeModule, moduleName: 'Catalog' }
    makeSut({ module: demoPagesModule })
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )
    expect(menuOptionIconContainer.childElementCount).toBe(1)
  })

  test('should render nothing when module is a Unknown module', async () => {
    const demoPagesModule = { ...fakeModule, moduleName: 'unknown' }
    makeSut({ module: demoPagesModule })
    const menuOptionIconContainer = await screen.findByTestId(
      MENU_OPTION_ICON_CONTAINER
    )
    expect(menuOptionIconContainer.childElementCount).toBe(0)
  })
})
