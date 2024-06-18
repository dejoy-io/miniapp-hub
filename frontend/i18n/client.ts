'use client'

import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } = createI18nClient({
  en: () => import('./locales/en'),
  uk: () => import('./locales/uk'),
  ru: () => import('./locales/ru'),
  'zh-CN': () => import('./locales/zh-CN'),
  'zh-TW': () => import('./locales/zh-TW'),
  jp: () => import('./locales/jp'),
})
