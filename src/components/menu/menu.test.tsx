import { RenderResult } from '@testing-library/react'
import React from 'react'
import '../../jest/mocks'
import renderWithDependencies from '../../jest/render-with-dependencies'
import { Menu } from './menu'
import { menuInitialState } from '../../store/menu/menu.reducer'

type SutType = {
  sut: RenderResult
}

const makeSut = (): SutType => {
  const sut = renderWithDependencies({
    children: <Menu />,
    provider: { store: { ...menuInitialState } }
  })

  return { sut }
}

describe('Menu container component', () => {
  test('should render correctly', () => {
    const { sut } = makeSut()
    expect(sut).toBeTruthy()
  })
})
