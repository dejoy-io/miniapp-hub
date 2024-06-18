'use client'

import { useTheme } from 'next-themes'
import { Switch } from '@nextui-org/react'
import React from 'react'

export function DarkMode() {
  const { setTheme, theme } = useTheme()
  return (
    <Switch
      size="sm"
      aria-label="Dark Mode"
      defaultSelected={theme === 'dark'}
      onValueChange={(isSelected) => {
        setTheme(isSelected ? 'dark' : 'light')
      }}
    />
  )
}
