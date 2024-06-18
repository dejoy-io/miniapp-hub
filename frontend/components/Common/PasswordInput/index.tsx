import React, { useEffect, useState } from 'react'
import { Tier } from './Tier'

type PasswordInputProps = {
  maxlenth: number
  onChange?: (value: string) => void
}
export function PasswordInput({ maxlenth, onChange }: PasswordInputProps) {
  const [value, setValue] = useState('')

  return (
    <label className="relative">
      <input
        className="absolute top-0 opacity-0"
        value={value}
        type="password"
        onChange={(ev) => {
          const _value = ev.target.value.substring(0, maxlenth)
          setValue(_value)
          onChange?.(_value)
        }}
      />
      <div className="flex justify-center gap-2">
        {Array.from({ length: maxlenth }, (_, i) => (
          <Tier key={i} text={value[i] || ''} active={i === value.length - 1} />
        ))}
      </div>
    </label>
  )
}
