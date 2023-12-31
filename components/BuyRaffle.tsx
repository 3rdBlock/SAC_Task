import { useEffect, useRef } from "react";
import Button from "./Button";
import useAddPointsEntry from "@/hooks/useAddPointsEntry";

const BuyRaffleButton: React.FC<AddPointsEntryButtonProps> = ({
  user,
  refreshPointsEntries,
}) => {
  const [addPointsEntry, isLoading] = useAddPointsEntry(user, "raffle_entry");
  const prevIsLoading = useRef(isLoading);

  useEffect(() => {
    if (prevIsLoading.current === true && isLoading === false) {
      refreshPointsEntries();
    }

    // Update the previous isLoading state.
    prevIsLoading.current = isLoading;
  }, [isLoading, refreshPointsEntries]);

  return (
    <Button loading={isLoading} onClick={addPointsEntry} disabled={isLoading}>
      Add Raffle Entry
    </Button>
  );
};

export default BuyRaffleButton;
