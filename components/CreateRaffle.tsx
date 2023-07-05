import { useEffect, useRef } from "react";
import Button from "./Button";
import useAddPointsEntry from "@/hooks/useAddPointsEntry";

const CreateRaffleButton: React.FC<AddPointsEntryButtonProps> = ({
  user,
  refreshPointsEntries,
}) => {
  const [addPointsEntry, isLoading] = useAddPointsEntry(user, "raffle_create");
  const prevIsLoading = useRef(isLoading);

  useEffect(() => {
    if (prevIsLoading.current === true && isLoading === false) {
      refreshPointsEntries();
    }

    prevIsLoading.current = isLoading;
  }, [isLoading, refreshPointsEntries]);

  return (
    <Button loading={isLoading} onClick={addPointsEntry} disabled={isLoading}>
      Create Raffle Entry
    </Button>
  );
};

export default CreateRaffleButton;
