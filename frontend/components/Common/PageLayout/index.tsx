import React from 'react'
import { PageLayoutHeader, PageLayoutHeaderProps } from './Header'

type PageLayoutProps = {
  children: React.ReactNode
} & PageLayoutHeaderProps

export function PageLayout({ showBack, title, children }: PageLayoutProps) {
  return (
    <div className="flex h-[100vh] flex-col overflow-hidden">
      <PageLayoutHeader showBack={showBack} title={title} />
      <div className="flex w-full flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  )
}
