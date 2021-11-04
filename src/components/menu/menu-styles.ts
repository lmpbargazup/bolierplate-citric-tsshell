import styled from 'styled-components'
import styles from '../../constants/styles'

const { VIEW_HEIGHT, MENU_HEIGHT, BASE_COLORS } = styles
const { BASE_COLOR_10 } = BASE_COLORS

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${MENU_HEIGHT};
  max-width: ${MENU_HEIGHT};
  min-height: ${VIEW_HEIGHT};
  background-color: ${BASE_COLOR_10};
  justify-content: space-between;
`

export const TopMenuContainer = styled.div`
  padding-top: 24px;
`
export const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  min-width: ${MENU_HEIGHT};
  max-width: ${MENU_HEIGHT};
  display: flex;
  padding-top: 24px;

  div {
    width: ${MENU_HEIGHT};
  }
`
