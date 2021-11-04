import { fireEvent, RenderResult } from '@testing-library/react'
import React from 'react'
import constants from '../../../../constants/constants'
import renderWithDependencies from '../../../../jest/render-with-dependencies'
import { Card } from './card'
import { CardProps } from './card.types'

const mockCard: CardProps = {
  description: 'description',
  id: 'card-01',
  name: 'card name',
  type: 'type',
  setCurrentWidget: jest.fn(),
  showWidget: true,
  chipData: [
    { text: 'Oficial', color: 'primary' },
    { text: '2.0.0.4', color: 'secondary' }
  ],
  component: '',
  lastUpdate: '',
  module: '',
  scope: '',
  url: ''
}

const { LOADING, WIDGET, ERROR, ERROR_BUTTON, WIDGET_CONTAINER } =
  constants.DATA_TESTID.CONTAINERS.WIDGETS.COMPONENTS.CARD

type SutType = {
  sut: RenderResult
}

const makeSut = (
  loadingInitialState = true,
  errorInitialState = false
): SutType => {
  const sut = renderWithDependencies({
    children: (
      <Card
        {...mockCard}
        loadingInitialState={loadingInitialState}
        errorInitialState={errorInitialState}
      />
    )
  })
  return { sut }
}

describe('Card component', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()
    expect(sut).toBeTruthy()
  })

  test('should render correctly dont pass initial state params', async () => {
    const sut = renderWithDependencies({
      children: <Card {...mockCard} />
    })
    expect(sut).toBeTruthy()
  })

  test('should render with loading is visible', async () => {
    const { sut } = makeSut()

    const loading = await sut.findByTestId(LOADING)

    expect(loading).toBeVisible()
  })

  test('should render with widget is visible', async () => {
    const { sut } = makeSut(false, false)

    const widget = await sut.findByTestId(WIDGET)

    expect(widget).toBeVisible()
  })

  test('should render with error is visible', async () => {
    const { sut } = makeSut(false, true)

    const error = await sut.findByTestId(ERROR)

    expect(error).toBeVisible()
  })

  test('should refresh import path on click in error button', async () => {
    const { sut } = makeSut(false, true)

    const error = await sut.findByTestId(ERROR)

    expect(error).toBeVisible()

    const widgetContainer = sut.getByTestId(WIDGET_CONTAINER)

    fireEvent.mouseEnter(widgetContainer)

    const buttonError = await sut.findByTestId(ERROR_BUTTON)

    expect(buttonError).toBeVisible()

    fireEvent.click(buttonError)

    const loading = await sut.findByTestId(LOADING)

    expect(loading).toBeVisible()
  })
})
