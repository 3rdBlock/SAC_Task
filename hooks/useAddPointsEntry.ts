import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";

const useAddPointsEntry = (
  user: User,
  reward_type: string
): [() => Promise<void>, boolean] => {
  const [isLoading, setIsLoading] = useState(false);

  const addRaffleEntry = async () => {
    setIsLoading(true);
    const id = uuidv4();

    try {
      const { data: rewardsData, error: rewardsError } = await supabase
        .from("rewards")
        .select("points")
        .eq("reward_type", reward_type);

      if (rewardsError || !rewardsData || rewardsData.length === 0) {
        throw rewardsError || new Error("Reward data not found");
      }

      const pointsValue = rewardsData[0].points;

      const { error } = await supabase.from("points").insert([
        {
          id,
          points: pointsValue,
          user_id: user.id,
          reward_type: reward_type,
        },
      ]);

      if (error) {
        throw error;
      } else {
        toast.success(`You have successfully added a new ${reward_type}!`);
      }
    } catch (error) {
      //   @ts-ignore
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return [addRaffleEntry, isLoading];
};

export default useAddPointsEntry;
