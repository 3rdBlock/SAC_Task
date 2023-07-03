import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";
import Button from "./Button";
import Loading from "./Loading";

const LinkWallet: React.FC<LinkWalletProps> = ({
  loadingChecks,
  walletExists,
  refreshUserProfile,
  user,
  publicKey,
}) => {
  console.log("public key:", publicKey?.toBase58());
  // @ts-ignore
  const linkWalletButton = async (user) => {
    const { user_name } = user.user_metadata;
    const { id } = user;
    const { data: userData, error: insertError } = await supabase
      .from("profiles")
      .insert([
        {
          id: id,
          twitter_username: user_name,
          wallet_address: publicKey?.toBase58(),
        },
      ]);
    if (insertError) {
      toast.error("Error inserting user into profiles table.");
    } else {
      toast.success("You have successfully linked your wallet!");
      refreshUserProfile();
    }
  };

  const renderText = () => {
    if (loadingChecks) return <Loading />;
    if (!user) {
      return "Please log in with Twitter.";
    } else if (!publicKey) {
      return "Please connect your wallet.";
    } else if (!walletExists) {
      return "Link your wallet";
    } else {
      return "You have successfully linked your wallet.";
    }
  };

  return (
    <>
      <div className="bg-black/10 flex p-1 rounded-lg m-2 justify-between items-center">
        <div className="flex">
          {walletExists ? (
            <span className="h-2 w-2 rounded-full flex justify-center items-center my-3 mx-2 bg-green-400" />
          ) : (
            <span className="h-2 w-2 rounded-full flex justify-center items-center my-3 mx-2 bg-red-400" />
          )}
          <p className="text-white relative flex items-center px-1">
            {renderText()}
          </p>
        </div>
        <Button
          onClick={() => linkWalletButton(user)}
          disabled={!user || !publicKey || walletExists}
          loading={loadingChecks}
        >
          {walletExists ? "Wallet Linked" : "Link Wallet"}
        </Button>
      </div>
    </>
  );
};

export default LinkWallet;
