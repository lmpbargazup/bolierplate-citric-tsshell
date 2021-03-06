/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Loader } from 'citric'
import { keycloakInstance } from 'containers/keycloak/keycloak'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from '../../store/store'
import { RemoteModule } from './types'

const loadComponent = (scope: string, module: string) => {
  return async () => {
    await __webpack_init_sharing__('default')
    const container = window[scope]
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!url) {
      return
    }

    const element = document.createElement('script')

    element.src = url
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
  }, [url])

  return {
    ready,
    failed
  }
}

type RemoteComponentProps = {
  remoteComponent: Pick<RemoteModule, 'url' | 'module' | 'scope' | 'component'>
  setLoading?: () => void
}

export const RemoteComponent = ({
  remoteComponent,
  setLoading
}: RemoteComponentProps) => {
  const { token, refreshToken } = keycloakInstance
  const { store } = useStore()
  const { user } = store
  const router = useNavigate()
  const { component } = remoteComponent

  // console.log(remoteComponent)

  const { ready, failed } = useDynamicScript(
    remoteComponent && remoteComponent.url
  )

  useEffect(() => {
    if (setLoading) {
      setLoading(!ready)
    }
  }, [ready])

  if (!remoteComponent) {
    return <h2>Not remote component specified</h2>
  }

  if (!ready && !failed) {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Loader color="primary" size="major" />
      </div>
    )
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {remoteComponent.url}</h2>
  }

  const Component = React.lazy(
    loadComponent(remoteComponent.scope, remoteComponent.module)
  )

  return (
    <React.Suspense fallback="">
      <Component
        token={token}
        refreshToke={refreshToken}
        currentUser={user}
        router={router}
        component={component}
      />
    </React.Suspense>
  )
}
