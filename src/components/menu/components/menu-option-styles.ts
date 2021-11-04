import styled from 'styled-components'
import styles from '../../../constants/styles'

const { PRIMARY } = styles.COLORS

type MenuOptionIconContainerProps = {
  selected?: boolean
}

export const MenuOptionIconContainer = styled.div<MenuOptionIconContainerProps>`
  width: 100%;
  height: 60px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const MenuOptionLine = styled.div<MenuOptionIconContainerProps>`
  background: ${(p) => (p.selected ? PRIMARY : 'none')};
  height: inherit;
  width: 4px;
  display: flex;
  position: absolute;
  left: 0;
  border-radius: 4px;
`

export const MenuOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`

export const MenuOptionLabel = styled.p`
  font-size: 12px;
`

export const MenuOptionIcon = styled.img.attrs(({ src, alt }) => ({
  src,
  alt
}))`
  display: flex;
  height: 24px;
  width: 24px;
`
