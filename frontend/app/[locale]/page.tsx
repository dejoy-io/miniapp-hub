'use client'

// import { TransactionList } from '@/components/Index/TransactionList'
// import { MiniApp, useQRScanner, useMiniApp } from '@tma.js/sdk-react'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const url = searchParams.get('targetUrl')

  return (
    <>
      <main className="flex min-h-screen h-screen">
        <iframe src={url} width="100%" height="100%" style={{
          border: '0', 
        }}/>
      </main>
    </>
  )
}
