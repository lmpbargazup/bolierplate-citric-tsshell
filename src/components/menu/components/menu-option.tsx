/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Tooltip } from 'citric'
import { goTo } from 'core/history/history'
import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import constants from '../../../constants/constants'
import { MenuModule } from '../../../data/protocols/data/menu'
import { selectMenuOption } from '../../../store/menu-option/menu-option.actions'
import { useStore } from '../../../store/store'
import {
  MenuOptionContainer,
  MenuOptionIconContainer,
  MenuOptionLine
} from './menu-option-styles'

type MenuOptionProps = {
  module: MenuModule
}

const { MENU_OPTION } = constants.DATA_TESTID.CONTAINERS.MENU
const { HOME } = constants.MENU

export const MenuOption: React.FC<MenuOptionProps> = ({
  module
}: MenuOptionProps) => {
  const [selected, setSelected] = useState(false)
  const { store, dispatch } = useStore()
  const { menuOptionSelected } = store as { menuOptionSelected: MenuModule }
  const { pathname } = useLocation()
  const { DASHBOARD } = constants.ROUTES

  const handleMenuOptionClick = (module: MenuModule): void => {
    if (!module.contexts || module.contexts.length === 0) {
      goTo(module.route)
    }
    dispatch(selectMenuOption(module))
  }

  useEffect(() => {
    const { route } = module

    if (pathname === DASHBOARD && route === DASHBOARD) {
      setSelected(true)
    }

    if (route !== DASHBOARD) {
      const pathAndRouteMatch = pathname.includes(route)
      setSelected(pathAndRouteMatch)
    }
  }, [])

  useEffect(() => {
    if (
      menuOptionSelected &&
      menuOptionSelected.moduleName === module.moduleName
    ) {
      setSelected(true)
    } else if (
      menuOptionSelected &&
      menuOptionSelected.moduleName !== module.moduleName
    ) {
      setSelected(false)
    }
  }, [menuOptionSelected])

  const handleIcon = (moduleName: string): ReactElement => {
    switch (moduleName) {
      case 'Administration':
        return (
          <Icon.Default
            name="user"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      case HOME:
        return (
          <Icon.Default
            name="home"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      case 'Demo Pages':
        return (
          <Icon.Default
            name="home"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      case 'Catalog':
        return (
          <Icon.Default
            name="home"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      case 'Templates':
        return (
          <Icon.Default
            name="pipes"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      case 'Products':
        return (
          <Icon.Default
            name="database"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
      default:
        return (
          <Icon.Default
            name="image"
            color={selected ? 'primary.main' : 'base.b10'}
          />
        )
    }
  }

  return (
    <Tooltip text={module.moduleName} position="right">
      <MenuOptionContainer
        onClick={() => handleMenuOptionClick(module)}
        data-testid={MENU_OPTION}
      >
        <MenuOptionIconContainer
          selected={selected}
          aria-label={module.moduleName}
          data-testid="menu-option-icon-container"
        >
          <MenuOptionLine selected={selected} />
          {handleIcon(module.moduleName)}
        </MenuOptionIconContainer>
      </MenuOptionContainer>
    </Tooltip>
  )
}
