/* eslint-disable react-hooks/exhaustive-deps */
import { goToPageNotFound, goToServerErrorPage } from 'core/history/history'
import { RemoteComponent } from 'core/utils/loaderMfe'
import Dashboard from 'pages/dashboard/dashboard'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import routeService from 'services/route-service'
import { RouteType } from 'src/data/protocols/data/route'
import constants from '../../constants/constants'
import { regex1, regex2 } from '../../core/utils/regex'
import { RouterContainer } from './router-styles'

const Router = () => {
  const [dynamicRoutes, setDynamicRoutes] = useState<RouteType[]>([])
  const { pathname } = useLocation()
  const { DASHBOARD } = constants.ROUTES

  const loadRoutes = async (): Promise<void> => {
    try {
      const response = await routeService.getRoutes()
      setDynamicRoutes(response?.body?.items as RouteType[])
    } catch (error) {
      goToServerErrorPage()
    }
  }

  const getFormattedPath = (): string => {
    let pathFormatted = pathname
    pathFormatted = pathFormatted.replace(regex1, ':id')
    pathFormatted = pathFormatted.replace(regex2, ':uuid')
    return pathFormatted
  }

  const verifyIfRouteAvailable = (): void => {
    if (dynamicRoutes.length > 0) {
      const defaultRoutesString = Object.values(constants.ROUTES)
      const dynamicRoutesString = dynamicRoutes.map(
        (dynamicRoute) => dynamicRoute.route
      )
      const availableRoutesString = [
        ...defaultRoutesString,
        ...dynamicRoutesString
      ]

      const formattedPath = getFormattedPath()

      const available = availableRoutesString.includes(formattedPath)

      if (!available) {
        goToPageNotFound()
      }
    }
  }

  // TODO: Recommend removing backend attribute moduleFederationComponent when is a microfrontend application this attribute is important for widgets.
  const getComponent = (moduleFederationComponent: string): string => {
    const blackList = ['administration-profile']

    const inBlackList = blackList.includes(moduleFederationComponent)

    return inBlackList ? '' : moduleFederationComponent
  }

  useEffect(() => {
    loadRoutes()
  }, [])

  useEffect(() => {
    verifyIfRouteAvailable()
  }, [dynamicRoutes, history])

  return (
    <RouterContainer>
      <Routes>
        <Route path={DASHBOARD} element={<Dashboard />} />
        {dynamicRoutes.map((route) => {
          const { moduleFederationComponent, moduleFederationName, url } =
            route.microfrontend
          return (
            <Route
              path={route.route}
              element={
                <RemoteComponent
                  remoteComponent={{
                    url: url,
                    component: getComponent(moduleFederationComponent),
                    scope: moduleFederationName,
                    module: './module'
                  }}
                />
              }
              key={route.id}
            />
          )
        })}
      </Routes>
    </RouterContainer>
  )
}

export default Router
