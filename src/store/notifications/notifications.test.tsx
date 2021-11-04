import { render, RenderResult, act } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { NotificationData } from '../../data/protocols/data/notification'
import { isEqual } from '../../utils/validates'
import Store, { useStore } from '../store'
import { pushNotification } from './notifications.actions'
import {
  notificationsInitialState,
  notificationsReducer
} from './notifications.reducer'
import { notificationActionTypes } from './notifications.types'

const notifications: NotificationData[] = [
  {
    id: '111',
    message: 'message1',
    pluginName: 'pluginName1',
    read: true,
    timestamp: 'timestamp1',
    userId: 111
  },
  {
    id: '222',
    message: 'message2',
    pluginName: 'pluginName2',
    read: false,
    timestamp: 'timestamp2',
    userId: 222
  }
]

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

describe('Notifications reducer', () => {
  test('should render correctly', async () => {
    const { sut } = makeSut()

    const app = await sut.findByTestId('app')

    expect(sut).toBeTruthy()
    expect(app).toBeInTheDocument()
  })

  test('should change state by use store hook with dispatch push notifications', () => {
    makeSut()
    const { dispatch } = moduleStore
    act(() => {
      dispatch(pushNotification(notifications[0]))
    })

    expect(moduleStore.store.notifications[0]).toBe(notifications[0])
  })

  test('should notifications reducer return updated state', () => {
    const state = notificationsReducer(undefined, {
      type: notificationActionTypes.PUSH_NOTIFICATION,
      payload: notifications[0]
    })

    expect(isEqual(state, { notifications: [notifications[0]] })).toBeTruthy()
  })

  test('should notifications reducer return notifications inital state because action type not finded', () => {
    const state = notificationsReducer(notificationsInitialState, {
      type: 'NO_ACTION',
      payload: notifications[0]
    })

    expect(isEqual(state, notificationsInitialState)).toBeTruthy()
  })
})
