import { Icon } from 'citric'
import React, { ReactElement } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotificationData } from '../../data/protocols/data/notification'
import notificationManagerService from '../../services/notification-manager-service'
import { getNotificationDynamicPropertiesByCategory } from '../../utils/notifications'
import {
  StyledToast,
  ToastMessageCloseButton,
  ToastMessageContainer,
  ToastMessageDataContainer,
  ToastMessageMessage,
  ToastMessageMessageContainer,
  ToastMessageSolveButton,
  ToastMessageTitle,
  ToastMessageTitleContainer,
  ToastMessageTitleIconContainer
} from './toast-notification-styles'

type MessageProps = {
  notification: NotificationData
  closeToast?: () => void
}

const Message = (props: MessageProps): ReactElement => {
  const { notification, closeToast } = props
  const { title, message, redirectTo: path, id } = notification
  const { icon, buttonText, buttonColors } =
    getNotificationDynamicPropertiesByCategory(notification.category)

  const handleClickSolveButton = (): void => {
    notificationManagerService.postMarkNotificationIsRead([id])
    // TODO: Adjust markAsRead event and closeToast
    // markAsRead([id])
    // history.push(path)
  }

  return (
    <ToastMessageContainer>
      <ToastMessageDataContainer>
        <ToastMessageTitleContainer>
          <ToastMessageTitleIconContainer>
            <Icon.Square
              name={icon.name}
              size="medium"
              color={icon.color}
              bgColor={icon.bgColor}
            />
            <ToastMessageTitle>{title}</ToastMessageTitle>
          </ToastMessageTitleIconContainer>
          <ToastMessageCloseButton onClick={closeToast}>
            <Icon.Default name="cancel" size="large" />
          </ToastMessageCloseButton>
        </ToastMessageTitleContainer>
        <ToastMessageMessageContainer>
          <ToastMessageMessage>{message}</ToastMessageMessage>
        </ToastMessageMessageContainer>
        {path && (
          <ToastMessageSolveButton
            colors={buttonColors}
            onClick={handleClickSolveButton}
          >
            {buttonText}
          </ToastMessageSolveButton>
        )}
      </ToastMessageDataContainer>
    </ToastMessageContainer>
  )
}

export const toastNotify = (notification: NotificationData): void => {
  toast(Message({ notification }))
}

export const ToastNotification = (): ReactElement => {
  return <StyledToast closeButton={false} hideProgressBar={true} />
}
