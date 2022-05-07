import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  apiProvider,
  configureChains,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

const alchemyId = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [apiProvider.alchemy(alchemyId), apiProvider.fallback()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
);
