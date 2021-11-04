import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import styles from '../../../../constants/styles'

type RightProp = {
  right?: number
}

type ShowMenuProp = {
  showMenu?: boolean
}

type FirstOptionProp = {
  firstOption?: boolean
}

const { BASE_COLOR_2, BASE_COLOR_3 } = styles.BASE_COLORS

const { SECONDARY_DARK_1, SECONDARY, HIGHLIGHT } = styles.COLORS

export const NavbarProfileContainer = styled.div<RightProp>`
  display: flex;
  align-items: center;
  padding: 24px 0px;
`

export const NavbarProfileDataContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const NavbarProfileChevron = styled.div`
  display: flex;
  height: 24px;
  width: 24px;
  transform: rotate(180deg);
`

export const NavbarProfileDropdown = styled.div<RightProp & ShowMenuProp>`
  display: ${ifProp({ showMenu: true }, 'flex', 'none')};
  box-sizing: border-box;
  min-width: 201px;
  width: fit-content;
  min-height: 201px;
  position: absolute;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgb(0 0 0 / 8%);
  border-radius: 8px;
  right: 10px;
  top: 65px;
  padding: 24px;
  z-index: 3;
`

export const ChevronDownContainer = styled.div`
  margin-left: 8px;
`

export const NavbarProfileDropdownInitialsContainer = styled.div`
  border-radius: 40px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(4, 124, 255, 0.2);
  overflow: hidden;
`

export const NavbarProfileDropdownPhoto = styled.img`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 64px;
  height: 64px;
`

export const NavbarProfileDropdownInitials = styled.p`
  color: #047cff;
  font-weight: bold;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`

export const NavbarProfileDropdownDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`

export const NavbarProfileDropdownName = styled.p`
  color: ${BASE_COLOR_2};
  font-size: 14px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`

export const NavbarProfileDropdownUserName = styled.p`
  font-size: 12px;
  color: ${BASE_COLOR_3};
  font-family: 'Roboto', sans-serif;
`

export const NavbarProfileDropdownLogoutButton = styled.button<FirstOptionProp>`
  border: none;
  display: flex;
  width: 64px;
  height: 36px;
  background: ${SECONDARY_DARK_1};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;

  cursor: pointer;
  ${ifProp({ firstOption: true }, 'border-top: none;')};
  &:hover {
    background-color: ${SECONDARY};
  }
`

export const NavbarProfileDropdownLinkToProfile = styled.a`
  color: ${HIGHLIGHT};
  margin: 16px 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
`
