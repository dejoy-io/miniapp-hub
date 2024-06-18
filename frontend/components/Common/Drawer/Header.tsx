'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg'

export type DrawerHeaderProps = {
  title: string
  onClose?: () => void
  extra?: React.ReactNode
}

export function DrawerHeader({ title, onClose, extra }: DrawerHeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between bg-content1 py-2">
      <div>
        <Button
          variant="light"
          isIconOnly
          onClick={() => {
            onClose?.()
          }}
        >
          <BackIcon />
        </Button>
      </div>

      <h1 className="text-center text-large font-bold">{title}</h1>

      <div className="min-w-10">{extra}</div>
    </div>
  )
}
