import { supabase } from "@/utils/supabaseClient";
import { useCallback, useEffect, useState } from "react";

const useCheckPointsEntries = (userId: string | null) => {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [loadingChecks, setLoadingChecks] = useState(true);

  const checkPointEntries = useCallback(async () => {
    setLoadingChecks(true);

    if (!userId) {
      setTotalPoints(0);
      setLoadingChecks(false);
      return;
    }

    try {
      const { data: entries, error } = await supabase
        .from("points")
        .select("points")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      // Assuming points are stored as numbers, not strings.
      const points = entries?.reduce((total, entry) => total + entry.points, 0);
      setTotalPoints(points ?? 0);
    } catch (error: any) {
      if (error && typeof error === "object" && "message" in error) {
        console.error("Error checking raffle entries:", error.message);
      } else {
        console.error("Error checking raffle entries:", error);
      }
    } finally {
      setLoadingChecks(false);
    }
  }, [userId]);

  useEffect(() => {
    checkPointEntries();
  }, [checkPointEntries]);

  return {
    totalPoints,
    refreshPointsEntries: checkPointEntries,
    loadingChecks,
  };
};

export default useCheckPointsEntries;
