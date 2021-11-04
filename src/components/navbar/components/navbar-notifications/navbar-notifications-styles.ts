import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import styles from '../../../../constants/styles'

const {
  BASE_COLOR_4,
  BASE_COLOR_10,
  BASE_COLOR_6,
  BASE_COLOR_2,
  BASE_COLOR_1,
  BASE_COLOR_9,
  BASE_COLOR_3
} = styles.BASE_COLORS
const { PRIMARY } = styles.COLORS

export const NavbarNotificationsContainer = styled.div`
  margin-right: 14px;
  padding: 24px 10px;
  display: flex;
  justify-content: flex-end;
`
export const NavbarNotificationsBellContainer = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
`

export const CursorPointer = styled.div`
  &:hover {
    cursor: pointer;
  }
`

export const NavbarNotificationsDropdownCloseButton = styled.div`
  display: flex;
  height: 28px;
  width: 28px;

  &:hover {
    cursor: pointer;
  }
`

type ShowProp = {
  show?: boolean
}

export const NavbarNotificationsDropdown = styled.div<ShowProp>`
  display: ${ifProp({ show: true }, 'flex', 'none')};
  width: 499px;
  position: absolute;
  z-index: 5;
  background: ${BASE_COLOR_10};
  right: 210px;
  top: 70px;
  flex-direction: column;
  filter: drop-shadow(4px 4px 32px rgba(26, 33, 56, 0.08));
`

export const NavbarNotificationsDropdownHeader = styled.div`
  display: flex;
  min-height: 81px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid ${BASE_COLOR_6};
`

export const NavbarNotificationsDropdownActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const NavbarNotificationsDropdownNotifications = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
`

type HasNewNotificationProp = {
  hasNewNotification: boolean
}

export const NavbarNotificationsDropdownMarkAllAsRead = styled.p<HasNewNotificationProp>`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  cursor: ${ifProp({ hasNewNotification: true }, 'pointer', '')};
  color: ${PRIMARY};
  margin-right: 16px;
  font-family: 'Roboto', sans-serif;
  opacity: ${ifProp({ hasNewNotification: true }, '1', '48%')};
`

export const NavbarNotificationsDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 493px;
  overflow: auto;
  padding: 24px;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 4px;
  }
`

export const NavbarNotificationsEmptyContainer = styled.div`
  height: 62px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NavbarNotificationsEmpty = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: ${BASE_COLOR_4};
`

type IsReadProp = {
  isRead: boolean
}

export const NavbarNotificationContainer = styled.div<IsReadProp>`
  display: flex;
  padding: 16px 24px;
  flex-direction: row;
  justify-content: center;
  background: ${BASE_COLOR_9};
  opacity: ${ifProp({ isRead: true }, '48%', '1')};
  border-radius: 4px;
  margin: 2px 0px;
  cursor: ${ifProp({ isRead: true }, '', 'pointer')};
`

export const NavbarNotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`

type ColorProp = {
  color: string
}

export const NavbarNotificationRectangle = styled.div<ColorProp>`
  display: flex;
  flex-direction: column;
  width: 4px;
  min-height: 68px;
  background: ${(props) => props.color};
  border-radius: 8px;
  margin-right: 24px;
`

export const NavbarNotificationHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavbarNotificationDataContainer = styled.div`
  display: flex;
  align-items: center;
`

export const NavbarNotificationIcon = styled.div`
  display: flex;
  height: 32px;
  width: 32px;
`

export const NavbarNotificationTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-left: 12px;
  color: ${BASE_COLOR_1};
`

export const NavbarNotificationTime = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${BASE_COLOR_3};
`

export const NavbarNotificationMessage = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${BASE_COLOR_2};
  margin-top: 18px;
`

export type SolveButtonProps = {
  textColor: string
  background: boolean
  backgroundColor: string
}

export const NavbarNotificationSolveButton = styled.button<{
  colors: SolveButtonProps
}>`
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 133px;
  height: 36px;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: ${(props) => props.colors.textColor};
  border: 1px solid ${({ colors }) => colors.backgroundColor};
  background: red;
  background: ${({ colors }) =>
    colors.background ? colors.backgroundColor : 'none'};

  &:hover {
    cursor: pointer;
  }
`
