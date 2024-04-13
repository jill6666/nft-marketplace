import { QueryClient } from '@tanstack/react-query';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  phantomWallet,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  okxWallet,
  trustWallet,
  uniswapWallet,
} from '@rainbow-me/rainbowkit/wallets';

export const client = new QueryClient();
export const config = getDefaultConfig({
  appName: 'OpenMeme',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
  wallets: [
    { groupName: 'Suggest', wallets: [metaMaskWallet, phantomWallet, coinbaseWallet] },
    { groupName: 'Others', wallets: [rainbowWallet, okxWallet, trustWallet, uniswapWallet] },
  ],
});
