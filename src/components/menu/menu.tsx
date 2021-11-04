import React from 'react'
import { MenuModule } from '../../data/protocols/data/menu'
import { useStore } from '../../store/store'
import { MenuOption } from './components/menu-option'
import { MenuContainer, TopMenuContainer } from './menu-styles'

export const Menu: React.FC = () => {
  const { store } = useStore()
  const { menus } = store as { menus: MenuModule[] }

  return (
    <MenuContainer>
      <TopMenuContainer>
        {menus.map((module) => (
          <MenuOption key={module.id} module={module} />
        ))}
      </TopMenuContainer>
    </MenuContainer>
  )
}
