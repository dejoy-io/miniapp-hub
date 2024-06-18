import React from 'react'
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

type MenuItem = {
  startIcon: React.ReactNode
  label: string
  value?: string
  path?: string
  onPress?: () => void
  endContent?: React.ReactNode
}

type MenuGroupProps = {
  menus: MenuItem[]
}

export function MenuGroup({ menus }: MenuGroupProps) {
  const router = useRouter()
  return (
    <Listbox variant="flat" className="rounded-md bg-content1 [&_li]:list-none">
      <ListboxSection className="mb-0">
        {menus.map((v, i) => (
          <ListboxItem
            className="py-3"
            showDivider={i < menus.length - 1}
            key={i}
            textValue={v.label}
            onPress={() => {
              if (v?.onPress) {
                return v.onPress()
              }
              if (v.path) {
                router.push(v.path as string)
              }
            }}
            startContent={<div>{v.startIcon}</div>}
            endContent={
              v.endContent || (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary">{v.value}</span>
                  <ArrowIcon />
                </div>
              )
            }
          >
            <span className="text-base font-medium">{v.label}</span>
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  )
}
