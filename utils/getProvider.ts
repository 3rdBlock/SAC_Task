import { PhantomProvider } from "../components/types";

const getProvider = (): PhantomProvider | undefined => {
  if (typeof window !== "undefined" && "phantom" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  if (typeof window !== "undefined") {
    window.open("https://phantom.app/", "_blank");
  }
};

export default getProvider;
