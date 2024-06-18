import { MiniApp } from '@tma.js/sdk-react'
import { SVGProps } from 'react'

export {}

declare global {
  interface Window {
    Telegram: {
      MiniApp: MiniApp
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'

      NEXT_PUBLIC_GRAPHQL_ENDPOINT: string
      NEXT_PUBLIC_MINI_APP_LINK: string
      GRAPHQL_SERVER_ENDPOINT: string
    }
  }
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}
