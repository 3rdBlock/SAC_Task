import { supabase } from "@/utils/supabaseClient";
import { useCallback, useEffect, useState } from "react";

const useCheckUserProfile = (userId: string | null) => {
  const [walletExists, setWalletExists] = useState<boolean | null>(null);
  const [loadingChecks, setLoadingChecks] = useState(true);

  const checkUserProfile = useCallback(async () => {
    setLoadingChecks(true);

    if (!userId) {
      setWalletExists(false);
      setLoadingChecks(false);
      return;
    }

    try {
      const { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      if (error) {
        throw error;
      }

      setWalletExists(user?.[0]?.wallet_address ? true : false);
    } catch (error: any) {
      if (error && typeof error === "object" && "message" in error) {
        console.error("Error checking user profile:", error.message);
      } else {
        console.error("Error checking user profile:", error);
      }
    } finally {
      setLoadingChecks(false);
    }
  }, [userId]);

  useEffect(() => {
    checkUserProfile();
  }, [checkUserProfile]);

  return {
    walletExists,
    refreshUserProfile: checkUserProfile,
    loadingChecks,
  };
};

export default useCheckUserProfile;
