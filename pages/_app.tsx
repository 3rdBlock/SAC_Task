import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"light"}
        />
        <div className="pt-16">
          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
    </div>
  );
}
