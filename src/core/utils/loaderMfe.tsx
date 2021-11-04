import React from 'react'

import { RemoteModule } from './types'

const loadComponent = (scope: string, module: string) => {
  return async () => {
    //@ts-expect-error
    await __webpack_init_sharing__("default")
    //@ts-expect-error
    const container = window[scope]
    //@ts-expect-error
    await container.init(__webpack_share_scopes__.default)
    //@ts-expect-error
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
  remoteComponent: Pick<RemoteModule, 'url' | 'module' | 'scope'>
}

export const RemoteComponent = ({ remoteComponent }: RemoteComponentProps) => {
  const { ready, failed } = useDynamicScript(
    remoteComponent && remoteComponent.url
  )

  if (!remoteComponent) {
    return <h2>Not remote component specified</h2>
  }

  if (!ready && !failed) {
    return <h2>Loading...</h2>
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {remoteComponent.url}</h2>
  }

  const Component = React.lazy(
    loadComponent(remoteComponent.scope, remoteComponent.module)
  )

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  )
}
