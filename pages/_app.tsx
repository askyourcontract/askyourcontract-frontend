import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/auth-helpers-nextjs';

const GA_MEASUREMENT_ID = 'G-LR373JLL8E';

function sendPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => sendPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <title>AskYourContract.ai</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  );
}