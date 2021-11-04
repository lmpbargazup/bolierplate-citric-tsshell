import { Avatar, Button, Icon, Text } from 'citric'
import { Vertical } from 'components/spacings/vertical/vertical'
import { keycloakLogout } from 'containers/keycloak/keycloak'
import React, { useState } from 'react'
import constants from '../../../../constants/constants'
import strings from '../../../../constants/strings'
import { UserData } from '../../../../data/protocols/data/user'
import {
  ChevronDownContainer,
  NavbarProfileContainer,
  NavbarProfileDataContainer,
  NavbarProfileDropdown,
  NavbarProfileDropdownDataContainer
} from './navbar-profile-styles'

type NavbarProfileProps = {
  user: UserData
}

export const NavbarProfile: React.FC<NavbarProfileProps> = ({
  user
}: NavbarProfileProps) => {
  const [showMenuOptions, setShowMenuOptions] = useState(false)
  const { LOGOUT } = strings.CONTAINERS.NAVBAR.NAVBAR_PROFILE
  const {
    NAVBAR_PROFILE_CONTAINER,
    NAVBAR_PROFILE_DROPDOWN,
    NAVBAR_PROFILE_DROPDOWN_NAME,
    NAVBAR_PROFILE_DROPDOWN_EMAIL,
    NAVBAR_PROFILE_DROPDOWN_LOGOUT_BUTTON
  } = constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_PROFILE

  const onLogout = (): void => {
    keycloakLogout()
  }

  const { name, email } = user

  return (
    <NavbarProfileContainer
      onClick={() => setShowMenuOptions(true)}
      onMouseLeave={() => setShowMenuOptions(false)}
      data-testid={NAVBAR_PROFILE_CONTAINER}
    >
      <NavbarProfileDataContainer>
        <Avatar.User size="medium" color="complementary4" name={name} />
        <ChevronDownContainer>
          <Icon.Default name="chevron-down" size="micro" />
        </ChevronDownContainer>
      </NavbarProfileDataContainer>
      <NavbarProfileDropdown
        showMenu={showMenuOptions}
        data-testid={NAVBAR_PROFILE_DROPDOWN}
      >
        <Avatar.User size="large" color="complementary4" name={name} />

        <NavbarProfileDropdownDataContainer>
          <Text.Body2
            weight="semibold"
            data-testid={NAVBAR_PROFILE_DROPDOWN_NAME}
          >
            {name}
          </Text.Body2>
          <Vertical heigth={4} />
          <Text.Microtext
            weight="regular"
            data-testid={NAVBAR_PROFILE_DROPDOWN_EMAIL}
            color={'color.base.b8'}
          >
            {email}
          </Text.Microtext>
        </NavbarProfileDropdownDataContainer>
        <Button
          color="secondary"
          onClick={onLogout}
          text={LOGOUT}
          data-testid={NAVBAR_PROFILE_DROPDOWN_LOGOUT_BUTTON}
        />
      </NavbarProfileDropdown>
    </NavbarProfileContainer>
  )
}
