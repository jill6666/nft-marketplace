import { QueryClient } from '@tanstack/react-query';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import
  {
    metaMaskWallet,
    rainbowWallet,
    okxWallet,
    trustWallet,
    uniswapWallet,
    bybitWallet
  } from '@rainbow-me/rainbowkit/wallets';
import { http, defineChain } from "viem";

export const bevm_mainnet = defineChain({
  id: 11501,
  name: "BEVM Mainnet",
  network: "bevm_mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcoin",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet-1.bevm.io/"],
      webSocket: ["wss://rpc-mainnet-1.bevm.io/ws"],
    },
    public: {
      http: ["https://rpc-mainnet-1.bevm.io/"],
      webSocket: ["wss://rpc-mainnet-1.bevm.io/ws"],
    },
    //"https://rpc-mainnet-1.bevm.io/",
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://scan-mainnet.bevm.io/" },
  },
  contracts: {},
});

export const client = new QueryClient();
export const config = getDefaultConfig({
  appName: 'OpenMeme',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains: [bevm_mainnet],
  transports: {
    [bevm_mainnet.id]: http(),
  },
  ssr: true,
  wallets: [
    { groupName: 'Suggest', wallets: [bybitWallet, metaMaskWallet] },
    { groupName: 'Others', wallets: [rainbowWallet, okxWallet, trustWallet, uniswapWallet] },
  ],
});
