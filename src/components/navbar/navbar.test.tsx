import { RenderResult } from '@testing-library/react'
import React from 'react'
import '../../../jest/mocks'
import renderWithDependencies from '../../../jest/render-with-dependencies'
import userManagerService from '../../services/user-manager-service'
import { Navbar } from './navbar'
import { mockUser } from '../../../jest/__mocks__/user'

jest.spyOn(userManagerService, 'getCurrentUser').mockResolvedValue({
  statusCode: 200,
  body: mockUser
})

type SutType = {
  sut: RenderResult
}

const makeSut = (user = mockUser): SutType => {
  const sut = renderWithDependencies({
    children: <Navbar />,
    provider: { store: { user }, dispatch: jest.fn() }
  })

  return { sut }
}

describe('Navbar container component', () => {
  test('should render correctly', () => {
    const { sut } = makeSut()
    expect(sut).toBeTruthy()
  })
})
