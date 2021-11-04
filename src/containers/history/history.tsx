import constants from '../../constants/constants'

const {
  DASHBOARD: HOME,
  PAGE_NOT_FOUND,
  SERVER_ERROR,
  ADMINISTRATION_PROFILE
} = constants.ROUTES

export const goToHome = (): void => {
  // history.push(HOME)
}

export const goToAdministrationProfile = (): void => {
  // history.push(ADMINISTRATION_PROFILE)
}

export const goToPageNotFound = (): void => {
  // history.push(PAGE_NOT_FOUND)
}

export const goToServerErrorPage = (): void => {
  // history.push(SERVER_ERROR)
}

export default History
