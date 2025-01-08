import { useEffect, useRef, useState } from 'react'

export const useShowResults = () => {
  const [isShowResults, setIsShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
      setIsShowResults(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    setIsShowResults,
    resultsRef,
    isShowResults,
  }
}
