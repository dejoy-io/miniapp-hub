import { Button } from '@nextui-org/react'
import React from 'react'
import { PasswordInput } from '../Common/PasswordInput'
import { useI18n } from '@/i18n/client'

type PasswordStep = {
  onNext: () => void
}

export function PasswordStep1({ onNext }: PasswordStep) {
  const t = useI18n()

  return (
    <div className="container flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-14">
        <h4 className="text-center font-bold">{t('set_password_title')}</h4>
        <p className="px-4 text-sm">{t('set_password_content')}</p>
      </div>

      <div className="flex flex-col gap-4 pb-10">
        <p className="text-sm">{t('set_password_note')}</p>
        <Button color="primary" onPress={onNext}>
          {t('set_password_set')}
        </Button>
      </div>
    </div>
  )
}
export function PasswordStep2({ onNext }: PasswordStep) {
  const t = useI18n()

  return (
    <div className="container flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-14">
        <h4 className="text-center font-bold">{t('set_password_set')}</h4>
        <p className="px-4 text-center text-sm">{t('set_password_enter')}</p>
        <div className="mt-6">
          <PasswordInput
            maxlenth={6}
            onChange={(v) => {
              console.log(v)
            }}
          />
        </div>
      </div>
      <div className="flex flex-col pb-10">
        <Button color="primary" onPress={onNext}>
          {t('set_password_next')}
        </Button>
      </div>
    </div>
  )
}

export function PasswordStep3({ onNext }: PasswordStep) {
  const t = useI18n()

  return (
    <div className="container flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-14">
        <h4 className="text-center font-bold">{t('set_password_confirm')}</h4>
        <p className="px-4 text-center text-sm">{t('set_password_again')}</p>
        <div className="mt-6">
          <PasswordInput
            maxlenth={6}
            onChange={(v) => {
              console.log(v)
            }}
          />
        </div>
      </div>
      <div className="flex flex-col pb-10">
        <Button color="primary" onPress={onNext}>
          {t('set_password_set')}
        </Button>
      </div>
    </div>
  )
}
