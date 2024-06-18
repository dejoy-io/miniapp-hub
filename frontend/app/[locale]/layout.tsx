import '@/assets/styles/globals.scss'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Miniapp',
  description: 'Miniapp',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  params,
  children,
  ...rest
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-content2">
        <Providers params={params}>{children}</Providers>
      </body>
    </html>
  )
}
