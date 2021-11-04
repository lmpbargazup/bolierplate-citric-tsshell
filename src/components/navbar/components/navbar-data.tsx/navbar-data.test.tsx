import { RenderResult } from '@testing-library/react'
import React from 'react'
import constants from '../../../../constants/constants'
import renderWithDependencies from '../../../../jest/render-with-dependencies'
import { mockUser } from '../../../../jest/__mocks__/user'
import { NavbarData } from './navbar-data'

type SutType = {
  sut: RenderResult
}

const makeSut = (user = mockUser): SutType => {
  const sut = renderWithDependencies({
    children: <NavbarData user={user} />
  })

  return { sut }
}

const { CONTAINER, NAME, USERNAME } =
  constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_DATA

describe('NavbarData component', () => {
  test('should render correctly', () => {
    const { sut } = makeSut()
    expect(sut).toBeTruthy()
  })

  test('should render user data info', () => {
    const { sut } = makeSut()

    const container = sut.findByTestId(CONTAINER)
    const name = sut.getByTestId(NAME)
    const username = sut.getByTestId(USERNAME)

    expect(container).toBeTruthy()
    expect(name).toBeVisible()
    expect(username).toBeVisible()
  })
})
