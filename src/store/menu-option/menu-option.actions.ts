import { MenuModule } from '../../data/protocols/data/menu'
import { menuOptionActionTypes } from './menu-option.types'

export type MenuOptionAction = {
  payload: any
  type: string
}

export const selectMenuOption = (value: MenuModule): MenuOptionAction => ({
  type: menuOptionActionTypes.SELECT_MENU_OPTION,
  payload: value
})
