import React, { useCallback, useMemo } from 'react'
import { ReactComponent as QrScanIcon } from '@/assets/icons/qrscan.svg'
import { Button } from '@nextui-org/react'

export function QrScan() {
  const scanner = useMemo(
    () => ({
      isOpened: false,
      open: (title: string) => {
        console.warn('scanner open: ', title)
      },
    }),
    [],
  ) // TODO useQRScanner()

  const showScanQr = useCallback(async () => {
    if (scanner.isOpened) return

    const content = await scanner?.open?.('Scan QR Code')
    // content 为钱包地址
    console.log('content: ', content)
  }, [scanner])
  return (
    <div>
      <Button variant="light" size="sm" isIconOnly radius="full" aria-label="Scan">
        <QrScanIcon className="fill-current" />
      </Button>
    </div>
  )
}
