'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg'

export type PageLayoutHeaderProps = {
  title: string
  showBack?: boolean
  extra?: React.ReactNode
}

export function PageLayoutHeader({ title, showBack, extra }: PageLayoutHeaderProps) {
  return (
    <div className="sticky flex h-14 items-center justify-between bg-content1 p-2">
      <div>
        {showBack && (
          <Button
            variant="light"
            isIconOnly
            onClick={() => {
              history.back()
            }}
          >
            <BackIcon />
          </Button>
        )}
      </div>

      <h1 className="text-center text-large font-semibold capitalize">{title}</h1>

      <div className="min-w-10">{extra}</div>
    </div>
  )
}
