import React from 'react'
import { Button } from '@nextui-org/react'
import { ReactComponent as SettingIcon } from '@/assets/icons/setting.svg'
import { Routers } from '@/consts/routers'
import { useRouter } from 'next/navigation'

export function Settings() {
  const router = useRouter()
  return (
    <div>
      <Button
        onClick={() => {
          router.push(Routers.settings)
        }}
        variant="light"
        size="sm"
        isIconOnly
        radius="full"
        aria-label="Setting"
      >
        <SettingIcon />
      </Button>
    </div>
  )
}
