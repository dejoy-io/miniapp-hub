'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useSDK } from '@tma.js/sdk-react'


export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}


/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
export function SDKLoader({ children }: PropsWithChildren<{}>) {
  const { didInit, components, error } = useSDK()

  const isMounted = useIsMounted()
  if (!isMounted) return null


  // TODO
  /*
  if (!didInit || components === null) {
    return <></>
  }

  if (error !== null) {
    console.error(`SDKLoader load error:`, error)
    // TODO 把当前环境设置为非 tg
    return <>{children}</>

    // return <div>Something went wrong.</div>
  }
  */

  return <>{children}</>
}
