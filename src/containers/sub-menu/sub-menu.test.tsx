import { fireEvent, RenderResult, screen } from '@testing-library/react'
import React from 'react'
import '../../../jest/mocks'
import { MenuContext, MenuModule } from '../../data/protocols/data/menu'
import renderWithDependencies from '../../jest/render-with-dependencies'
import { history } from '../history/history'
import { SubMenu } from './sub-menu'

type SutType = {
  sut: RenderResult
}

type SutParams = {
  contexts: MenuContext[]
  spyHandleClose?: () => void
}

const fakeContexts: MenuContext[] = [
  {
    id: 1,
    contextName: 'Organization',
    pages: [
      {
        id: 1,
        name: 'General',
        route: '/general',
        microfrontend: { id: 1, url: 'http' }
      }
    ]
  }
]

const fakeMenu: MenuModule = {
  id: 1,
  moduleName: 'Administration',
  microfrontend: { id: 1, url: 'http' },
  route: '/administration',
  contexts: fakeContexts
}

const makeSut = ({ contexts, spyHandleClose = jest.fn() }: SutParams): SutType => {
  const sut = renderWithDependencies({
    children: <SubMenu menuOptionSelected={fakeMenu} handleClose={spyHandleClose} />,
    provider: { store: {} }
  })

  return { sut }
}

describe('SubMenu', () => {
  test('should render correctly', () => {
    const { sut } = makeSut({ contexts: fakeContexts })
    expect(sut).toBeTruthy()
  })

  test('should render correct parameters', async () => {
    makeSut({ contexts: fakeContexts })
    const context = await screen.findByText('Organization')
    const menuItem = screen.getByText('General')
    expect(context).toBeTruthy()
    expect(menuItem).toBeTruthy()
  })

  test('should invoke push method of history after handleMenuItemClick call', async () => {
    makeSut({ contexts: fakeContexts })
    const menuItem = screen.getByText('General')
    const pushSpy = jest.spyOn(history, 'push')
    fireEvent.click(menuItem)
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledWith('/administration/general')
  })

  test('should call handleClose function when arrow was clicked', async () => {
    const spyHandleClose = jest.fn()
    makeSut({ contexts: fakeContexts, spyHandleClose })
    const arrowButton = await screen.findByTestId('close-button')
    fireEvent.click(arrowButton)
    expect(spyHandleClose).toHaveBeenCalledTimes(1)
  })
})
