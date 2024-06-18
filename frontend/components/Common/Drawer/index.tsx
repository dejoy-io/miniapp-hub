import React, { useMemo } from 'react'
import { DrawerHeader } from './Header'

type DrawerProps = {
  title: string
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}

export function Drawer({ isOpen, children, title, onClose }: DrawerProps) {
  if (!isOpen) return null
  return (
    <div
      className={`fixed left-0 top-0 z-[99] flex h-[100vh] w-[100vw] flex-col bg-content1 transition-all ${isOpen ? 'opacity-1 translate-x-0' : 'translate-x-full opacity-0'}`}
    >
      <DrawerHeader title={title} onClose={onClose} />
      <div className="flex-1 overflow-auto pb-10">{children}</div>
    </div>
  )
}
