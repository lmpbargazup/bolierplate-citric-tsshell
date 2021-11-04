import React from 'react'
import { render } from '@testing-library/react'
import { EmptyState } from './empty-state'

describe('Empty State component', () => {
  test('should render correctly', async () => {
    const sut = render(<EmptyState />)
    expect(sut).toBeTruthy()

    const title = await sut.findByTestId('title')
    const textNothingToShow = await sut.findByTestId('text-nothing-to-show')
    const textTryAgain = await sut.findByTestId('text-try-again')
    const illustration = await sut.findByTestId('illustration')
    expect(title).toBeTruthy()
    expect(textNothingToShow).toBeTruthy()
    expect(textTryAgain).toBeTruthy()
    expect(illustration).toBeTruthy()
  })
})
