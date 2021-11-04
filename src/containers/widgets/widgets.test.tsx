import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import constants from '../../constants/constants'
import { PluginData, PluginTypeCode } from '../../data/protocols/data/plugin'
import pluginManagerService from '../../services/plugin-manager-service'
import { Context } from '../../store/store'
import Widgets from './widgets'

const mockWidgetId = 'widget.id.1'

const fakeMainWidget: PluginData = {
  code: 'mainwidget',
  backendEndpoint: 'mainwidget',
  created: 'mainwidget',
  frontendEndpoint: 'mainwidget',
  id: 'mainwidget',
  maintainer: {
    author: 'mainwidget',
    email: 'mainwidget',
    id: 'mainwidget'
  },
  name: 'mainwidget',
  type: {
    code: PluginTypeCode.IDE,
    description: 'mainwidget',
    id: 'mainwidget',
    name: 'mainwidget'
  },
  updated: 'mainwidget',
  version: 'mainwidget',
  description: 'mainwidget',
  iconLink: 'mainwidget',
  component: 'maincomponent',
  module: 'mainmodule',
  scope: 'mainscope'
}

const fakeWidget: PluginData = {
  code: 'microroutes-plugin-1',
  backendEndpoint: 'widget01',
  created: 'widget01',
  frontendEndpoint: 'widget01',
  id: mockWidgetId,
  maintainer: {
    author: 'widget01',
    email: 'widget01',
    id: 'widget01'
  },
  name: 'Widget 01',
  type: {
    code: 'PRD',
    description: 'widget01',
    id: 'widget01',
    name: 'widget01'
  },
  updated: 'widget01',
  version: 'widget01',
  description: 'widget01',
  iconLink: 'widget01',
  component: 'component01',
  module: 'module01',
  scope: 'scope01'
}

const widgets = [fakeMainWidget, fakeWidget]

jest.spyOn(pluginManagerService, 'getPlugins').mockResolvedValue({
  statusCode: 200,
  body: {
    data: widgets,
    page: 0,
    size: 1,
    totalElements: 2
  }
})

type SutType = {
  sut: RenderResult
}

const { WIDGETS } = constants.DATA_TESTID.CONTAINERS.WIDGETS

const makeSut = (): SutType => {
  const sut = render(
    <Context.Provider value={{ store: { user: { username: 'Bob' } } }}>
      <Widgets />
    </Context.Provider>
  )
  return { sut }
}

describe('Widgets component', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()
    const { findByTestId } = sut
    const widgets = await findByTestId(WIDGETS)

    expect(widgets).toBeInTheDocument()
    expect(sut).toBeTruthy()
  })

  test('should render main widget and secondary widget', async () => {
    const { sut } = makeSut()
    const home = await sut.findByTestId(WIDGETS)
    const widget = sut.getByTestId(mockWidgetId)

    expect(home).toBeInTheDocument()
    expect(widget).toBeInTheDocument()
  })

  test('should widget is visible on mouse enter', async () => {
    jest.spyOn(pluginManagerService, 'getPlugins').mockResolvedValue({
      statusCode: 200,
      body: {
        data: [fakeWidget],
        page: 0,
        size: 1,
        totalElements: 2
      }
    })

    const { sut } = makeSut()

    const widget = await sut.findByTestId(fakeWidget.id)
    fireEvent.mouseEnter(widget)
    expect(widget).toBeVisible()
  })
})
