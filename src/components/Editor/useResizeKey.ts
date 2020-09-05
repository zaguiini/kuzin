import { useState, useEffect } from 'react'

export const useResizeKey = () => {
  const [key, setKey] = useState(0)

  useEffect(() => {
    const resize = () => {
      setKey((key) => key + 1)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return key.toString()
}
