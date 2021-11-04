import styled from 'styled-components'
import styles from '../../constants/styles'

const { BASE_COLOR_10, BASE_COLOR_8, BASE_COLOR_3 } = styles.BASE_COLORS

export const Container = styled.div`
  z-index: 1000;
  background-color: ${BASE_COLOR_10};
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  top: 0;
  left: 72px;
  align-items: flex-end;
  width: 272px;
`

export const MenuList = styled.ul`
  margin: 0px;
  padding: 0px 24px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`

export const MenuContextContainer = styled.div`
  align-self: start;
  padding-left: 40px;
`

export const MenuSubItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 30px;
`

export const MenuHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 24px 0px 32px 40px;
  box-sizing: border-box;
`

export const CloseButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`

export const MenuItem = styled.li`
  justify-content: space-between;
  padding: 0px 16px;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: ${BASE_COLOR_8};
  }
`

export const SubItem = styled.div`
  cursor: pointer;
  margin-bottom: 12px;
  color: ${BASE_COLOR_8};
  :hover {
    color: 'red';
  }
`

export const SubItemText = styled.div`
  cursor: pointer;
  margin-bottom: 12px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  height: 18px;
  margin-top: 3px;
  text-decoration: none;
  color: ${(props) =>
    props.color === 'color.base.b10' ? '#8C909C' : '#FF6D00'};

  &:hover {
    color: ${(props) =>
      props.color === 'color.base.b10' ? '#1A2138' : '#FF6D00'};
  }
`

export const CloseButton = styled.a`
  color: ${BASE_COLOR_3};
  width: 40px;
  display: flex;
  justify-content: flex-end;
  padding: 0px 24px;
  cursor: pointer;
  :hover {
    opacity: 0.4;
  }
  margin: 1.6em 0.6em 0 0;
`

export const CloseButtonIcon = styled.div`
  display: flex;
  height: 36px;
  width: 36px;
`
