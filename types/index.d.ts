interface User {
  id: string;
}

interface AddRaffleEntryButtonProps {
  user: User;
  refreshRaffleEntries: () => void;
}

interface LinkWalletProps {
  loadingChecks: boolean;
  walletExists: boolean | null;
  user: User | null;
  refreshUserProfile: () => void;
  publicKey: PublicKey | null;
}

interface NavProps {
  setPublicKey: (value: PublicKey | null) => void;
}
