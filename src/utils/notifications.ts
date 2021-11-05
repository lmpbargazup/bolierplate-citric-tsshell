import strings from '../constants/strings'
import styles from '../constants/styles'
import { SolveButtonProps } from '../containers/navbar/components/navbar-notifications/navbar-notifications-styles'

const { CLICK_HERE_SOLVE, CHECK_IT_OUT } =
  strings.CONTAINERS.NAVBAR.NAVBAR_NOTIFICATIONS

type NotificationDynamicProperties = {
  lineColor: string
  icon: {
    name: string
    color: string
    bgColor: string
  }
  buttonColors: SolveButtonProps
  buttonText: string
}

export const getNotificationDynamicPropertiesByCategory = (
  category
): NotificationDynamicProperties => {
  const { SECONDARY, NEGATIVE_FEEDBACK, POSITIVE_FEEDBACK } = styles.COLORS
  const { COMPLEMENTARY_5 } = styles.COMPLEMENTARY_COLORS
  const { BASE_COLOR_10 } = styles.BASE_COLORS

  const notificationCategory = {
    DEFAULT: {
      lineColor: SECONDARY,
      icon: {
        name: 'image',
        color: 'primary.main',
        bgColor: 'primary.light2'
      },
      buttonColors: {
        textColor: SECONDARY,
        background: false,
        backgroundColor: SECONDARY
      },
      buttonText: CLICK_HERE_SOLVE
    },
    WARNING: {
      lineColor: COMPLEMENTARY_5,
      icon: {
        name: 'alert-circle',
        color: 'base.b1',
        bgColor: 'feedback.alert.main'
      },
      buttonColors: {
        textColor: BASE_COLOR_10,
        background: true,
        backgroundColor: NEGATIVE_FEEDBACK
      },
      buttonText: CLICK_HERE_SOLVE
    },
    ALARM: {
      lineColor: NEGATIVE_FEEDBACK,
      icon: {
        name: 'alert-circle',
        color: 'base.b1',
        bgColor: 'feedback.negative.main'
      },
      buttonColors: {
        textColor: BASE_COLOR_10,
        background: true,
        backgroundColor: NEGATIVE_FEEDBACK
      },
      buttonText: CLICK_HERE_SOLVE
    },
    SUCCESS: {
      lineColor: POSITIVE_FEEDBACK,
      icon: {
        name: 'check',
        color: 'base.b1',
        bgColor: 'feedback.positive.main'
      },
      buttonColors: {
        textColor: BASE_COLOR_10,
        background: true,
        backgroundColor: POSITIVE_FEEDBACK
      },
      buttonText: CHECK_IT_OUT
    }
  }

  const notification: NotificationDynamicProperties =
    notificationCategory[category]

  return notification
}
