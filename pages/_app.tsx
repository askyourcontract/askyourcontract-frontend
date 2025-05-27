import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-LR373JLL8E', {
          page_path: url,
        })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        {/* Google Analytics Init */}
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