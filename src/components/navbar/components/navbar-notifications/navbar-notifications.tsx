/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Icon, Notification, Tooltip } from 'citric'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import constants from '../../../../constants/constants'
import strings from '../../../../constants/strings'
import { useInterval } from '../../../../core/utils/hooks/useInterval'
import { NotificationData } from '../../../../data/protocols/data/notification'
import notificationManagerService from '../../../../services/notification-manager-service'
import { getNotificationDynamicPropertiesByCategory } from '../../../../utils/notifications'
import { formatTime } from '../../../../utils/timestamp'
import { toastNotify } from '../../../toast-notification/toast-notification'
import {
  CursorPointer,
  NavbarNotificationContainer,
  NavbarNotificationContent,
  NavbarNotificationDataContainer,
  NavbarNotificationHeader,
  NavbarNotificationMessage,
  NavbarNotificationsBellContainer,
  NavbarNotificationsContainer,
  NavbarNotificationsDropdown,
  NavbarNotificationsDropdownActionsContainer,
  NavbarNotificationsDropdownContent,
  NavbarNotificationsDropdownHeader,
  NavbarNotificationsDropdownMarkAllAsRead,
  NavbarNotificationsDropdownNotifications,
  NavbarNotificationsEmpty,
  NavbarNotificationsEmptyContainer,
  NavbarNotificationSolveButton,
  NavbarNotificationTime,
  NavbarNotificationTitle
} from './navbar-notifications-styles'

let moduleSetNotifications: Dispatch<SetStateAction<NotificationData[]>>
let moduleSetNotificationsNotViewed: Dispatch<SetStateAction<string[]>>

const INTERVAL_LOAD_NOTIFICATION = 2000

const sortArray = (): void => {
  const orderByTimestamp = (
    notification1: NotificationData,
    notification2: NotificationData
  ): number => {
    if (notification1.timestamp > notification2.timestamp) {
      return -1
    }
    if (notification1.timestamp < notification2.timestamp) {
      return 1
    }
    return 0
  }

  moduleSetNotifications((prevState) => {
    const currentNotifications = prevState.slice()
    const notReadNotifications = currentNotifications.filter(
      (notification) => !notification.read
    )
    const readNotifications = currentNotifications.filter(
      (notification) => notification.read
    )
    notReadNotifications.sort(orderByTimestamp)
    readNotifications.sort(orderByTimestamp)
    const orderedNotifications = [...notReadNotifications, ...readNotifications]
    return orderedNotifications
  })
}

export const markAsRead = (notificationsIds: string[]): void => {
  notificationManagerService
    .postMarkNotificationIsRead(notificationsIds)
    .then(() => {
      moduleSetNotifications((prevState) => {
        const newState = prevState.slice()
        notificationsIds.forEach((notificationId) => {
          const index = newState.findIndex((item) => item.id === notificationId)
          newState[index].read = true
          moduleSetNotificationsNotViewed((prev) => {
            return prev.filter((id) => id !== notificationId)
          })
        })
        return newState
      })
      sortArray()
    })
}

export const NavbarNotifications: React.FC = () => {
  const [hasNewNotification, setHasNewNotification] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([] as NotificationData[])
  const [notificationsNotViewed, setNotificationsNotViewed] = useState(
    [] as string[]
  )
  const [mouseInDropdown, setMouseInDropdown] = useState(false)
  const newNotificationsCount = notifications.filter((not) => !not.read).length
  moduleSetNotifications = setNotifications
  moduleSetNotificationsNotViewed = setNotificationsNotViewed
  const { NOTIFICATIONS, MARK_ALL_READ, YOU_DONT_HAVE } =
    strings.CONTAINERS.NAVBAR.NAVBAR_NOTIFICATIONS
  const {
    NAVBAR_NOTIFICATIONS_CONTAINER,
    NAVBAR_NOTIFICATIONS_ALERT,
    NAVBAR_NOTIFICATIONS_EMPTY,
    NAVBAR_NOTIFICATIONS_DROPDOWN,
    NAVBAR_NOTIFICATIONS_MARK_ALL,
    NAVBAR_NOTIFICATION_TITLE,
    NAVBAR_NOTIFICATION_TIME,
    NAVBAR_NOTIFICATION_MESSAGE
  } = constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_NOTIFICATIONS

  const verifyHasNewNotification = (): void => {
    const isReadStates = notifications.map((notification) => notification.read)
    const hasNewNotification = isReadStates.includes(false)
    setHasNewNotification(hasNewNotification)
  }

  const showNotificationsNotViewed = (
    notifications: NotificationData[]
  ): void => {
    const notViewed = notifications.filter((notification) => !notification.read)
    notViewed.forEach((notification) => {
      if (!notificationsNotViewed.includes(notification.id)) {
        toastNotify(notification)
        setNotificationsNotViewed((prevState) => {
          prevState.push(notification.id)
          return prevState
        })
      }
    })
  }

  const loadNotifications = async (): Promise<void> => {
    try {
      const notifications = await notificationManagerService.getNotifications()
      showNotificationsNotViewed(notifications.body.message)
      setNotifications(notifications.body.message)
      sortArray()
    } catch (error) {
      console.error(error)
      setNotifications([])
    }
  }

  useInterval(loadNotifications, INTERVAL_LOAD_NOTIFICATION)

  const handleClickSolveButton = (path: string): void => {
    setShowDropdown(false)
    // console.log(path)
    // history.push(path)
  }

  document.onmousedown = function () {
    setShowDropdown(mouseInDropdown)
  }

  useEffect(() => {
    verifyHasNewNotification()
  }, [notifications])

  return (
    <NavbarNotificationsContainer
      data-testid={NAVBAR_NOTIFICATIONS_CONTAINER}
      onMouseEnter={() => setMouseInDropdown(true)}
      onMouseLeave={() => setMouseInDropdown(false)}
    >
      <NavbarNotificationsBellContainer onClick={() => setShowDropdown(true)}>
        <Tooltip text="Notifications" position="left">
          <CursorPointer>
            {hasNewNotification ? (
              <span data-testid={NAVBAR_NOTIFICATIONS_ALERT}>
                <Notification quantity={newNotificationsCount} />
              </span>
            ) : (
              <Icon.Rounded
                name="notification"
                size="medium"
                color="complementary4.main"
                bgColor="base.b1"
              />
            )}
          </CursorPointer>
        </Tooltip>
      </NavbarNotificationsBellContainer>
      <NavbarNotificationsDropdown
        show={showDropdown}
        data-testid={NAVBAR_NOTIFICATIONS_DROPDOWN}
      >
        <NavbarNotificationsDropdownHeader>
          <NavbarNotificationsDropdownNotifications>
            {NOTIFICATIONS}
          </NavbarNotificationsDropdownNotifications>
          <NavbarNotificationsDropdownActionsContainer>
            {notifications.length !== 0 && (
              <NavbarNotificationsDropdownMarkAllAsRead
                hasNewNotification={hasNewNotification}
                onClick={() =>
                  markAsRead(
                    notifications.map((notification) => notification.id)
                  )
                }
                data-testid={NAVBAR_NOTIFICATIONS_MARK_ALL}
              >
                {MARK_ALL_READ}
              </NavbarNotificationsDropdownMarkAllAsRead>
            )}
            <Button.Circle
              icon="remove"
              onClick={() => setShowDropdown(false)}
            />
          </NavbarNotificationsDropdownActionsContainer>
        </NavbarNotificationsDropdownHeader>
        <NavbarNotificationsDropdownContent>
          {notifications.length === 0 && (
            <NavbarNotificationsEmptyContainer>
              <NavbarNotificationsEmpty
                data-testid={NAVBAR_NOTIFICATIONS_EMPTY}
              >
                {YOU_DONT_HAVE}
              </NavbarNotificationsEmpty>
            </NavbarNotificationsEmptyContainer>
          )}
          {notifications.map(
            ({
              id,
              read,
              title,
              message,
              timestamp,
              category,
              redirectTo: path
            }) => {
              const time = formatTime(timestamp)
              const { icon, buttonColors, buttonText } =
                getNotificationDynamicPropertiesByCategory(category)

              return (
                <NavbarNotificationContainer
                  data-testid={id}
                  key={id}
                  isRead={read}
                  onClick={() => !read && markAsRead([id])}
                >
                  <NavbarNotificationContent>
                    <NavbarNotificationHeader>
                      <NavbarNotificationDataContainer>
                        <Icon.Square
                          name={icon.name}
                          size="medium"
                          color={icon.color}
                          bgColor={icon.bgColor}
                        />
                        <NavbarNotificationTitle
                          data-testid={NAVBAR_NOTIFICATION_TITLE}
                        >
                          {title}
                        </NavbarNotificationTitle>
                      </NavbarNotificationDataContainer>
                      <NavbarNotificationTime
                        data-testid={NAVBAR_NOTIFICATION_TIME}
                      >
                        {time}
                      </NavbarNotificationTime>
                    </NavbarNotificationHeader>
                    <NavbarNotificationMessage
                      data-testid={NAVBAR_NOTIFICATION_MESSAGE}
                    >
                      {message}
                    </NavbarNotificationMessage>
                    {path && (
                      <NavbarNotificationSolveButton
                        colors={buttonColors}
                        onClick={() => handleClickSolveButton(path)}
                      >
                        {buttonText}
                      </NavbarNotificationSolveButton>
                    )}
                  </NavbarNotificationContent>
                </NavbarNotificationContainer>
              )
            }
          )}
        </NavbarNotificationsDropdownContent>
      </NavbarNotificationsDropdown>
    </NavbarNotificationsContainer>
  )
}
