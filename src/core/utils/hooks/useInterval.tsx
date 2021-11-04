import { useEffect, useRef } from 'react'

export function useInterval (callback, delay): void {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = (): void => {
      savedCallback.current()
    }
    if (delay) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [callback, delay])
}
