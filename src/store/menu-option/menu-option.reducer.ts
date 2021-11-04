import { MenuOptionState, menuOptionActionTypes } from './menu-option.types'
import { MenuOptionAction } from './menu-option.actions'

export const menuOptionInitialState: MenuOptionState = {
  menuOptionSelected: undefined,
  menuOptionWasSelected: false
}

export const menuOptionReducer = (
  state: MenuOptionState,
  action: MenuOptionAction
): MenuOptionState => {
  switch (action.type) {
    case menuOptionActionTypes.SELECT_MENU_OPTION:
      return { ...state, menuOptionSelected: action.payload, menuOptionWasSelected: !state.menuOptionWasSelected }
    default:
      return state
  }
}
