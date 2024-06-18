import { NetworkType } from '@/consts/network'
import { Image } from '@nextui-org/react'
import React from 'react'

export function NetworkItem({ icon, name }: NetworkType) {
  return (
    <div className="flex justify-between py-1">
      <div className="flex items-center gap-4">
        <Image height={36} width={36} radius="sm" src={icon} />
        <p className="text-large font-semibold">{name}</p>
      </div>
    </div>
  )
}
