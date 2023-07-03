import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";

const BuyRaffle: React.FC<AddRaffleEntryButtonProps> = ({
  user,
  refreshRaffleEntries,
}) => {
  const addRaffleEntry = async () => {
    const id = uuidv4();

    const { error } = await supabase.from("raffle_entries").insert([
      {
        id,
        points: "10",
        user_id: user.id,
      },
    ]);

    if (error) {
      toast.error("Error inserting user into raffle_entries table.");
    } else {
      toast.success("You have successfully added a new raffle entry!");
      refreshRaffleEntries();
    }
  };

  return <Button onClick={addRaffleEntry}>Add Raffle Entry</Button>;
};

export default BuyRaffle;
