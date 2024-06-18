'use client'

import { useAuthenticateMutation } from '@/services/useAuthenticateMutation'
import { useLaunchParams, useMiniApp, useViewport } from '@tma.js/sdk-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function AuthPage() {
  const pathname = usePathname()
  const router = useRouter()
  const miniApp = useMiniApp()
  const viewport = useViewport()
  const launchParams = useLaunchParams()
  const { mutate: authenticate, data, isSuccess } = useAuthenticateMutation()

  useEffect(() => {
    const { initDataRaw } = launchParams
    if (initDataRaw) {
      console.log('Enter this into authenticate mutation in Apollo IDE for development: ')
      authenticate({ input: { initDataRaw } })
    }
  }, [launchParams, authenticate])

  useEffect(() => {
    if (isSuccess && data.authenticate.success === true && miniApp) {
      const routeTo = pathname.substring(pathname.indexOf('/auth') + 5)
      const { initData } = launchParams
      let locale = initData?.user?.languageCode ?? ''
      if (!['en', 'uk', 'ru', 'zh-CN', 'zh-TW', 'jp'].includes(locale)) {
        locale = 'en'
      }

      // TODO from config
      const targetUrl = new URL("https://extreme-racing.cybercat.best")
      targetUrl.searchParams.set('token', data.authenticate.token)

      const path = routeTo + '/' + (initData?.startParam ? initData.startParam : '')
    
      const u = new URL(path, "http://localhost")
      u.searchParams.set('targetUrl', targetUrl.href)

      console.log('href: ', u.pathname + u.search)

      router.replace(u.pathname + u.search)
      miniApp.ready()

      viewport.expand()
      window.Telegram = {
        MiniApp: miniApp,
      }
    }
  }, [isSuccess, data, miniApp])

  return <div className="flex min-h-screen"></div>
}
