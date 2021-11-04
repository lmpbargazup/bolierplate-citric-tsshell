
export interface KeycloakInstance {
  login: () => void
}

export type AuthClientEvent = 'onReady' | 'onInitError' | 'onAuthSuccess' | 'onAuthError' | 'onAuthRefreshSuccess' | 'onAuthRefreshError' | 'onAuthLogout' | 'onTokenExpired'

export type KeycloakEvents = {
  [key in AuthClientEvent]?: () => void
}
