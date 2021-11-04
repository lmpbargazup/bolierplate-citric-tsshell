import { ReactKeycloakProvider } from '@react-keycloak/web'
import { default as KeycloakJS } from 'keycloak-js'
import React, { ReactElement, useEffect, useState } from 'react'
import { AuthClientEvent, KeycloakEvents } from './keycloak.types'

const config: KeycloakJS.KeycloakConfig = {
  realm: process.env.OPENID_REALM as string,
  url: process.env.OPENID_URL as string,
  clientId: process.env.OPENID_CLIENT_ID as string
}

export const keycloakInstance: KeycloakJS.KeycloakInstance = KeycloakJS(config)

export const keycloakLogout = (): void => {
  keycloakInstance.logout()
}

type KeycloakProps = {
  children: ReactElement
}

export const Keycloak = ({ children }: KeycloakProps): ReactElement => {
  const [ready, setReady] = useState(false)

  const onEvent = (event: AuthClientEvent): void => {
    const events: KeycloakEvents = {
      onReady: () => setReady(true)
    }

    const action = events[event]

    if (action) {
      action()
    }
  }

  useEffect(() => {
    if (ready) {
      if (!keycloakInstance.authenticated) {
        keycloakInstance.login()
      }
    }
  }, [ready])

  return (
    <ReactKeycloakProvider authClient={keycloakInstance} onEvent={onEvent}>
      {ready && children}
    </ReactKeycloakProvider>
  )
}
