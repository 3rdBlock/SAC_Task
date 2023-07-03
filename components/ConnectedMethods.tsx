import React, { useState, useEffect, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { getProvider } from "../utils";

const provider = getProvider();

const ConnectedMethods: React.FC<{
  setPublicKey: (publicKey: PublicKey | null) => void;
}> = ({ setPublicKey }) => {
  const [localPublicKey, setLocalPublicKey] = useState<PublicKey | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!provider) return;

    provider.on("connect", (publicKey: PublicKey) => {
      setLocalPublicKey(publicKey);
      setPublicKey(publicKey);
    });

    provider.on("disconnect", () => {
      setLocalPublicKey(null);
      setPublicKey(null);
    });

    return () => {
      provider.disconnect();
    };
  }, [setPublicKey]);

  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.connect();
    } catch (error) {
      console.error("Error connecting: ", error);
    }
  }, []);

  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
    } catch (error) {
      console.error("Error disconnecting: ", error);
    }
  }, []);

  const isConnected = Boolean(localPublicKey);

  const shortenPublicKey = (key: string) => {
    return key ? `${key.slice(0, 6)}...${key.slice(-4)}` : "";
  };

  return (
    <div>
      {isConnected ? (
        <button
          className="mx-2 font-medium bg-zinc-200 px-2 py-1 rounded-lg text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100 dark:text-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
          onClick={handleDisconnect}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered
            ? "Disconnect Wallet"
            : shortenPublicKey(localPublicKey?.toBase58() || "")}
        </button>
      ) : (
        <button
          className="mx-2 font-medium bg-zinc-200 px-2 py-1 rounded-lg text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100 dark:text-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectedMethods;
