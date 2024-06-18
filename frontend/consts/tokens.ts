import { BigNumber } from 'bignumber.js'

export enum SYMBOL {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH',
}

export type TokenType = {
  name?: string
  symbol: SYMBOL | string
  decimals: 6 | 8 | 18 | number // USDT / BTC / TOKEN
  icon: string
  value?: BigNumber
  price?: BigNumber
  networks?: string | number[]
}

export const Tokens: Record<SYMBOL | string, TokenType> = {
  [SYMBOL.BTC]: {
    name: 'Bitcoin',
    symbol: SYMBOL.BTC,
    decimals: 8,
    icon: '/tokens/btc.svg',
  },
  [SYMBOL.ETH]: {
    name: 'Ethereum',
    symbol: SYMBOL.ETH,
    decimals: 18,
    icon: '/tokens/eth.svg',
  },
  [SYMBOL.USDT]: {
    name: 'Tether USD',
    symbol: SYMBOL.USDT,
    decimals: 6,
    icon: '/tokens/usdt.svg',
  },
}
