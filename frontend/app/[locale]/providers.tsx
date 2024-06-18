'use client'

import * as React from 'react'
import { SDKProvider, SDKInitOptions } from '@tma.js/sdk-react'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SDKLoader } from '@/components/SDKLoader'
import { I18nProviderClient } from '@/i18n/client'
import { ThemeProvider } from 'next-themes'

export interface ProvidersProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export function Providers({ params: { locale }, children }: ProvidersProps) {
  const sdkInitOptions: SDKInitOptions = {
    acceptScrollbarStyle: true,
    checkCompat: true,
    cssVars: true,
  }

  const queryClient = new QueryClient()

  return (
    <>
      <SDKProvider initOptions={sdkInitOptions}>
        <I18nProviderClient locale={locale}>
          <NextUIProvider>
            <ThemeProvider attribute="class">
              <QueryClientProvider client={queryClient}>
                <SDKLoader>{children}</SDKLoader>
              </QueryClientProvider>
            </ThemeProvider>
          </NextUIProvider>
        </I18nProviderClient>
      </SDKProvider>
    </>
  )
}
