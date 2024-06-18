import React, { useEffect, useMemo, useState } from 'react'

type TierProps = {
  text: string
  active: boolean
}

let timer: any
export function Tier({ text, active }: TierProps) {
  const [delayShow, setDelayShow] = useState(true)

  useEffect(() => {
    if (active) {
      setDelayShow(true)
      clearTimeout(timer)
      timer = setTimeout(() => {
        setDelayShow(false)
      }, 300)
    } else {
      setDelayShow(false)
    }
  }, [active])

  const content = useMemo(() => {
    if (!text) return null
    if (delayShow) return <span className="text-lg">{text}</span>
    return <div className="h-5 w-5 rounded-full bg-default-800"></div>
  }, [text, delayShow])

  return (
    <div
      className={`flex h-11 w-11 items-center justify-center border bg-content1 ${active ? 'border-gray-600' : 'border-gray-300'}`}
    >
      {content}
    </div>
  )
}
