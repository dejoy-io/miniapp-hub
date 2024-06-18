'use client'
import { PageLayout } from '@/components/Common/PageLayout'
import { useI18n } from '@/i18n/client'

type PasswordLayoutProps = {
  children: React.ReactNode
}

export default function PasswordLayout({ children }: PasswordLayoutProps) {
  const t = useI18n()

  return (
    <PageLayout showBack title={t('set_password')}>
      {children}
    </PageLayout>
  )
}
