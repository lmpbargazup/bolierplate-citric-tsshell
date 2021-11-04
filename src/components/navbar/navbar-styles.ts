import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import styles from '../../constants/styles'

type FirstOptionProp = {
  firstOption?: boolean
}

const { PRIMARY, BACKGROUND_COLOR } = styles.COLORS

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 72px;
  background-color: ${BACKGROUND_COLOR};
  align-items: center;
`

export const NavBarLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY};
  min-width: 72px;
  width: 72px;
  height: 72px;
`

export const NavBarMenuContainer = styled.div`
  display: flex;
  flex: 1;
  height: 40px;
  margin: 12px 30px;
  justify-content: flex-end;
  align-items: center;
`

export const NavBarLogo = styled.div`
  display: flex;
  height: 36px;
  width: 36px;
`

export const NavBarOptionsMenuMessage = styled.div<FirstOptionProp>`
  display: flex;
  min-height: 32px;
  font-size: 16px;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #afa5a2;
  border-top: 1px solid #f6f3f1;
  ${ifProp({ firstOption: true }, 'border-top: none;')};
`

export const NavBarOptionsMenuNotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 8px;
  margin-right: 16px;
  cursor: pointer;
`
