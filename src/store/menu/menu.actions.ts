import { MenuModule } from '../../data/protocols/data/menu'
import { menuActionTypes } from './menu.types'

type MenuAction = {
  payload: MenuModule[]
  type: string
}

export const setMenu = (value: MenuModule[]): MenuAction => ({
  type: menuActionTypes.SET_MENU,
  payload: value
})
