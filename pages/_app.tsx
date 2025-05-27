import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Google Analytics setup for client-side route changes
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-LR373JLL8E', {
          page_path: url,
        })
      }
    }

    // Next.js uses Router events, not window events
    // Import Router dynamically to avoid SSR issues
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
        {/* Google Analytics Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LR373JLL8E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LR373JLL8E');
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}