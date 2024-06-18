'use client'

import { PasswordStep1, PasswordStep2, PasswordStep3 } from '@/components/Settings/Password'
import React, { useState } from 'react'

export default function PasswordPage() {
  const [tabActive, setTabActive] = useState(0)

  if (tabActive === 1) {
    return <PasswordStep2 onNext={() => setTabActive(2)} />
  }

  if (tabActive === 2) {
    return (
      <PasswordStep3
        onNext={() => {
          alert('保存密码')
        }}
      />
    )
  }

  return <PasswordStep1 onNext={() => setTabActive(1)} />
}
