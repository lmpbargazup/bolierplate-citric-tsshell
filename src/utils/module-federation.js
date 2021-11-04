/* eslint-disable no-undef */
import { Loader } from 'citric'
import { useRouter } from 'next/router'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { keycloakInstance } from '../containers/keycloak/keycloak'
import { useStore } from '../store/store'

const loadComponent = (scope, module) => {
  return async () => {
    await __webpack_init_sharing__('default')
    const container = window[scope] // or get the container somewhere else
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

const useDynamicScript = (args) => {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!args.url) {
      return
    }

    const element = document.createElement('script')

    element.src = args.url
    element.type = 'text/javascript'
    element.async = true

    setReady(false)
    setFailed(false)

    element.onload = () => {
      setReady(true)
    }

    element.onerror = () => {
      setReady(false)
      setFailed(true)
    }

    document.head.appendChild(element)

    return () => {
      document.head.removeChild(element)
    }
  }, [args.url])

  return {
    ready,
    failed
  }
}

const System = ({ system, setLoading, token, refreshToken, currentUser, router, component }) => {
  const { ready, failed } = useDynamicScript({
    url: system && system.url
  })

  useEffect(() => {
    if (setLoading) {
      setLoading(!ready)
    }
  }, [ready])

  if (!system) {
    return <h2>Not system specified</h2>
  }

  if (!ready) {
    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Loader color="primary" size="major" /></div>
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {system.url}</h2>
  }

  const Component = lazy(loadComponent(system.scope, system.module))

  return (
    <Suspense fallback="">
      <Component token={token} refreshToke={refreshToken} currentUser={currentUser} router={router} component={component} />
    </Suspense>
  )
}

export const Module = ({ system, setLoading = undefined, component = '' }) => {
  const { token, refreshToken } = keycloakInstance
  const { store } = useStore()
  const router = useRouter()

  return (
    <System
        system={system}
        setLoading={setLoading}
        token={token}
        refreshToken={refreshToken}
        currentUser={store.user}
        router={router}
        component={component}
      />
  )
}
