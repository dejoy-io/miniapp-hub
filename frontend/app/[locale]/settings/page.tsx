'use client'

import React from 'react'
import { PageLayout } from '@/components/Common/PageLayout'

import { ReactComponent as VerfiyIcon } from '@/assets/icons/verify.svg'
import { ReactComponent as CryptoIcon } from '@/assets/icons/crypto.svg'
import { ReactComponent as FaqIcon } from '@/assets/icons/faq.svg'
import { ReactComponent as NewsIcon } from '@/assets/icons/news.svg'
import { ReactComponent as ContactIcon } from '@/assets/icons/contact.svg'
import { ReactComponent as DarkIcon } from '@/assets/icons/dark.svg'

import { MenuGroup } from '@/components/Settings/MenuGroup'
import { Routers } from '@/consts/routers'
import { useI18n } from '@/i18n/client'
import { DarkMode } from '@/components/Settings/DarkMode'
import { Listbox, ListboxItem } from '@nextui-org/react'

export default function SettingsPage() {
  const t = useI18n()

  return (
    <PageLayout showBack title={t('set_title')}>
      <div className="mt-4 flex w-full flex-col gap-4 px-2">
        <MenuGroup
          menus={[
            {
              label: t('set_verification'),
              value: t('set_not'),
              path: Routers.settings_password,
              startIcon: <VerfiyIcon />,
            },
            {
              label: t('set_default'),
              value: 'USD',
              path: '',
              startIcon: <CryptoIcon />,
            },
          ]}
        />

        <MenuGroup
          menus={[
            {
              label: t('set_support'),
              path: '',
              startIcon: <ContactIcon />,
            },
            {
              label: t('set_faq'),
              path: '',
              startIcon: <FaqIcon />,
            },
            {
              label: t('set_news'),
              path: '',
              startIcon: <NewsIcon />,
            },
            {
              label: t('set_dark_mode'),
              path: '',
              startIcon: <DarkIcon />,
              endContent: <DarkMode />,
            },
          ]}
        />

        <Listbox variant="flat" className="rounded-md bg-content1">
          <ListboxItem key="agreement" className=" px-2 py-3">
            <p className="font-semibold text-primary">{t('set_agreement')}</p>
          </ListboxItem>
        </Listbox>
      </div>
    </PageLayout>
  )
}
