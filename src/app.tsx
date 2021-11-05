import { Keycloak } from 'containers/keycloak/keycloak'
import History from 'core/history/history'
import { Main } from 'core/main/main'
import Router from 'core/router/router'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'

const App = () => {
  return (
    <BrowserRouter>
      <Keycloak>
        <Store>
          <Main>
            <>
              <History />
              <Router />
            </>
          </Main>
        </Store>
      </Keycloak>
    </BrowserRouter>
  )
}

export default App
