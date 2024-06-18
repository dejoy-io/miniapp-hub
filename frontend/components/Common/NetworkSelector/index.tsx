import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import React from 'react'
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { NetworkItem } from './NetworkItem'
import { NetworkType, Networks } from '@/consts/network'

type NetworkSelectorProps = {
  extra?: React.ReactNode
  onSelect: (net: NetworkType) => void
}
export function NetworkSelector({ extra, onSelect }: NetworkSelectorProps) {
  return (
    <div className="container flex flex-col gap-2  pt-2">
      {extra}
      <Listbox className="pt-4">
        {Object.values(Networks).map((net, i, arr) => (
          <ListboxItem showDivider={i < arr.length - 1} key={net.name} onPress={() => onSelect(net)}>
            <NetworkItem {...net} />
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}
