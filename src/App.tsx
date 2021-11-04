import { Keycloak } from 'containers/keycloak/keycloak'
import { Main } from 'core/main/main'
import React from 'react'
import Store from './store/store'

const App = () => {
  return (
    <Keycloak>
      <Store>
        <Main>
          <>
            <h1>App</h1>
          </>
        </Main>
      </Store>
    </Keycloak>
  )
}

export default App
