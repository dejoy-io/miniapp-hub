import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./locales/en'),
  uk: () => import('./locales/uk'),
  ru: () => import('./locales/ru'),
  'zh-CN': () => import('./locales/zh-CN'),
  'zh-TW': () => import('./locales/zh-TW'),
  jp: () => import('./locales/jp'),
})
