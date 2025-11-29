import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// 1. Get projectId from https://cloud.reown.com
export const projectId = 'YOUR_PROJECT_ID'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// 2. Set up Wagmi adapter
export const networks = [bsc] as const

export const wagmiAdapter = new WagmiAdapter({
  networks: [bsc],
  projectId,
  ssr: false
})

// 3. Create modal
export const metadata = {
  name: 'Floa IDO',
  description: 'Floa IDO - Train & Earn with AI Agents',
  url: 'https://floahive.com',
  icons: ['https://floahive.com/favicon.ico']
}

createAppKit({
  adapters: [wagmiAdapter],
  networks: [bsc],
  projectId,
  metadata,
  features: {
    analytics: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(189 94% 55%)',
  }
})

export const queryClient = new QueryClient()
