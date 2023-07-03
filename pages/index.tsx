import TwitterAuth from "@/components/TwitterAuth";
import Nav from "@/components/nav";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import LinkWallet from "@/components/LinkWallet";
import useCheckUserProfile from "@/utils/useCheckUserProfile";
import { supabase } from "@/utils/supabaseClient";
import BuyRaffle from "@/components/BuyRaffle";
import useCheckRaffleEntries from "@/utils/useCheckRaffleEntries";
import Loading from "@/components/Loading";

export default function Home() {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);

  const { refreshUserProfile, loadingChecks, walletExists } =
    useCheckUserProfile(id);
  const {
    totalPoints,
    refreshRaffleEntries,
    loadingChecks: raffleLoading,
  } = useCheckRaffleEntries(id);
  console.log(user);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setId(session?.user.id ?? null);
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`twitter_username, wallet_address`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setTwitter(data.twitter_username);
          setWallet(data.wallet_address);
        }
      } catch (error) {
        alert("Error loading user data!");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getProfile();
    }
  }, [user, supabase]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:p-20">
      <div className="fixed z-50 w-full top-0">
        <Nav setPublicKey={setPublicKey} />
      </div>
      <TwitterAuth />
      <LinkWallet
        publicKey={publicKey}
        user={user}
        loadingChecks={loadingChecks}
        refreshUserProfile={refreshUserProfile}
        walletExists={walletExists}
      />

      {walletExists &&
        user &&
        (raffleLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <BuyRaffle
              user={user}
              refreshRaffleEntries={refreshRaffleEntries}
            />
            <p className="text-white m-2">Total raffle points: {totalPoints}</p>
          </div>
        ))}
    </main>
  );
}
