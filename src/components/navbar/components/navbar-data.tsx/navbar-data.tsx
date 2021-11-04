import { Text } from 'citric'
import React from 'react'
import constants from '../../../../constants/constants'
import { UserData } from '../../../../data/protocols/data/user'
import { NavbarDataContainer } from './navbar-data-styles'

type NavbarDataProps = {
  user: UserData
}

export const NavbarData: React.FC<NavbarDataProps> = ({
  user
}: NavbarDataProps) => {
  const { CONTAINER, NAME, USERNAME } =
    constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_DATA

  return (
    <NavbarDataContainer data-testid={CONTAINER}>
      <Text.Body2 weight="semibold" data-testid={NAME}>
        {user.name}
      </Text.Body2>
      <Text.Microtext
        weight="regular"
        data-testid={USERNAME}
        color={'color.base.b8'}
      >
        {user.username}
      </Text.Microtext>
    </NavbarDataContainer>
  )
}
