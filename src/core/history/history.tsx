import React, { ReactElement } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import constants from '../../constants/constants'

export let navigate: NavigateFunction

const {
  DASHBOARD: HOME,
  PAGE_NOT_FOUND,
  SERVER_ERROR,
  ADMINISTRATION_PROFILE
} = constants.ROUTES

export const goToHome = (): void => {
  navigate(HOME)
}

export const goToAdministrationProfile = (): void => {
  navigate(ADMINISTRATION_PROFILE)
}

export const goToPageNotFound = (): void => {
  navigate(PAGE_NOT_FOUND)
}

export const goToServerErrorPage = (): void => {
  navigate(SERVER_ERROR)
}

export const goTo = (path: string): void => {
  navigate(path)
}

const History = (): ReactElement => {
  navigate = useNavigate()
  return <></>
}

export default History
