import { MenuModule } from '../../data/protocols/data/menu'

export type MenuOptionState = {
  menuOptionSelected: MenuModule
  menuOptionWasSelected: boolean
}

export const menuOptionActionTypes = {
  SELECT_MENU_OPTION: '@menu/SELECT_MENU_OPTION'
}
