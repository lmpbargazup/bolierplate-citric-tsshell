import { Icon } from 'components/icon/icon'
import React from 'react'
import { NotificationState } from '../../store/notifications/notifications.types'
import { useStore } from '../../store/store'
import { UserState } from '../../store/user/user.types'
import { NavbarData } from './components/navbar-data.tsx/navbar-data'
import { NavbarNotifications } from './components/navbar-notifications/navbar-notifications'
import { NavbarProfile } from './components/navbar-profile/navbar-profile'
import {
  NavBarContainer,
  NavBarLogoContainer,
  NavBarMenuContainer
} from './navbar-styles'

export const Navbar: React.FC = () => {
  const { store } = useStore()
  const { user } = store as UserState & NotificationState

  return (
    <NavBarContainer>
      <NavBarLogoContainer>
        <Icon name="logo-orange" height={72} width={72} color={'white'} />
      </NavBarLogoContainer>
      <NavBarMenuContainer>
        <NavbarNotifications />
        <NavbarData user={user} />
        <NavbarProfile user={user} />
      </NavBarMenuContainer>
    </NavBarContainer>
  )
}
