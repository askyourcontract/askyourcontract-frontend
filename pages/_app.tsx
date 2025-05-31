import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/auth-helpers-nextjs';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-LR373JLL8E', {
          page_path: url,
        });
      }
    };

    import('next/router').then(({ Router }) => {
      Router.events.on('routeChangeComplete', handleRouteChange);
    });

    return () => {
      import('next/router').then(({ Router }) => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      });
    };
  }, []);

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
              gtag('config', 'G-LR373JLL8E', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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