import { useEffect, useRef, useState } from "react"


export const useExpanded = (text: string) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(textRef.current) {
      const isOverflowing = 
        textRef.current.scrollHeight > 
        textRef.current.clientHeight
      setShowMoreButton(isOverflowing)
    }
  }, [text])

  return{
    isExpanded,
    setIsExpanded,
    textRef,
    showMoreButton
  }
}