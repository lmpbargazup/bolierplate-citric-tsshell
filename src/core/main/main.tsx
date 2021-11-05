/* eslint-disable react-hooks/exhaustive-deps */
import Citric from 'citric'
import { Menu } from 'components/menu/menu'
import { Navbar } from 'components/navbar/navbar'
import { ToastNotification } from 'components/toast-notification/toast-notification'
import { SubMenu } from 'containers/sub-menu/sub-menu'
import { GlobalStyle } from 'core/styles/global'
import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import menuService from 'services/menu-service'
import userManagerService from 'services/user-manager-service'
import { MenuModule } from 'src/data/protocols/data/menu'
import { UserData } from 'src/data/protocols/data/user'
import constants from '../../constants/constants'
import { setMenu } from '../../store/menu/menu.actions'
import { useStore } from '../../store/store'
import { setUser } from '../../store/user/user.actions'
import { AppContainer, AppContent } from './main-styles'

type MainProps = {
  children: ReactElement
}

export function Main({ children }: MainProps) {
  const { dispatch, store } = useStore()
  const [showMenu, setShowMenu] = useState(true)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const { pathname } = useLocation()

  const { menuOptionSelected } = store as { menuOptionSelected: MenuModule }
  const { menuOptionWasSelected } = store as { menuOptionWasSelected: boolean }

  const { PAGE_NOT_FOUND, SERVER_ERROR } = constants.ROUTES

  const loadMenu = async (): Promise<void> => {
    try {
      const response = await menuService.getModules()
      dispatch(setMenu(response.body as MenuModule[]))
    } catch (error) {
      console.log('Failed to load modules')
    }
  }

  const loadCurrentUser = async (): Promise<void> => {
    try {
      const response = await userManagerService.getCurrentUser()
      dispatch(setUser(response.body as UserData))
    } catch (error) {
      // goToServerErrorPage()
    }
  }

  const verifyIfIsErrorRoute = (location = pathname): void => {
    const currentRoute = location
    const errorRoutes = Object.values([PAGE_NOT_FOUND, SERVER_ERROR])
    setShowMenu(!errorRoutes.includes(currentRoute))
  }

  const handleSubMenuClose = (): void => {
    setShowSubMenu(false)
  }

  useEffect(() => {
    loadMenu()
    loadCurrentUser()
    verifyIfIsErrorRoute()
  }, [])

  useEffect(() => {
    verifyIfIsErrorRoute(pathname)
  }, [history])

  useEffect(() => {
    setShowSubMenu(
      !!menuOptionSelected &&
        !!menuOptionSelected.contexts &&
        !!menuOptionSelected.contexts.length
    )
  }, [menuOptionWasSelected])

  return (
    <>
      <GlobalStyle />
      <Citric>
        <AppContainer>
          <ToastNotification />
          {showMenu && <Navbar />}
          <AppContent>
            {showMenu && <Menu />}
            {showSubMenu && (
              <SubMenu
                menuOptionSelected={menuOptionSelected}
                handleClose={handleSubMenuClose}
              />
            )}
            {children}
          </AppContent>
        </AppContainer>
      </Citric>
    </>
  )
}
