import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-LR373JLL8E', {
          page_path: url,
        })
      }
    }

    import('next/router').then(({ Router }) => {
      Router.events.on('routeChangeComplete', handleRouteChange)
    })

    return () => {
      import('next/router').then(({ Router }) => {
        Router.events.off('routeChangeComplete', handleRouteChange)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>AskYourContract.ai</title>
        {/* Google Analytics Initialization */}
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
      <Component {...pageProps} />
    </>
  )
}