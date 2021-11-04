import constants from '../../constants/constants'
import { MenuModule } from '../../data/protocols/data/menu'
import { menuActionTypes, MenuState } from './menu.types'

const { DASHBOARD: HOME } = constants.ROUTES
export const homeModule: MenuModule = {
  id: 0,
  moduleName: 'Home',
  route: HOME
}

export const menuInitialState: MenuState = {
  menus: [homeModule]
}

type MenuAction = {
  payload: MenuModule[]
  type: string
}

export const menuReducer = (
  state: MenuState,
  action: MenuAction
): MenuState => {
  const modules = action.payload?.length ? action.payload : []

  const actionTypes = {
    [menuActionTypes.SET_MENU]: { ...state, menus: [homeModule, ...modules] }
  }

  return actionTypes[action.type] || state
}
