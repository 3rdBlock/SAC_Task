import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import Button from "./Button";
import Loading from "./Loading";

export default function TwitterAuth() {
  const [user, setUser] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
    if (error) console.error(error);
    setLoading(false);
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    document.cookie =
      "supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (error) {
      console.error("Error signing out:", error);
    }
  };

  let avatar_url, full_name, user_name;
  if (user) {
    ({ avatar_url, full_name, user_name } = user.user_metadata);
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-black/10 flex p-1 rounded-lg m-2 justify-between items-center">
      {user ? (
        <>
          {user_name ? (
            <p className="text-white p-1 mx-1">@{user_name}</p>
          ) : null}
          <Button onClick={signout}>Sign Out</Button>

          <img
            className="rounded-full h-8 mx-1"
            src={avatar_url}
            alt={`${full_name} avatar`}
          />
        </>
      ) : (
        <Button onClick={handleSignIn} disabled={loading}>
          {loading ? <Loading /> : "Sign in with Twitter"}
        </Button>
      )}
    </div>
  );
}
