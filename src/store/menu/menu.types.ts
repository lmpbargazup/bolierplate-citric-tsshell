import { MenuModule } from '../../data/protocols/data/menu'

export type MenuState = {
  menus: MenuModule[]
}

export const menuActionTypes = {
  SET_MENU: '@menu/SET_MENU'
}
