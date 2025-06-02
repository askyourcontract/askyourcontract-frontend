import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="AskYourContract.ai helps you understand legal documents instantly with AI. Upload contracts, get summaries, and insights in seconds."
        />
        <meta
          name="keywords"
          content="legal AI, contract analysis, document summarization, AI lawyer, Supabase, OpenAI, AskYourContract"
        />
        <meta name="author" content="AskYourContract.ai" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askyourcontractai.com/" />
        <meta
          property="og:title"
          content="AskYourContract.ai - Understand Contracts with AI"
        />
        <meta
          property="og:description"
          content="Upload your legal documents and get instant AI-powered summaries, explanations, and clause highlights."
        />
        <meta
          property="og:image"
          content="https://askyourcontractai.com/preview-ai-legal-assistant.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://askyourcontractai.com/" />
        <meta
          name="twitter:title"
          content="AskYourContract.ai - Understand Contracts with AI"
        />
        <meta
          name="twitter:description"
          content="Upload legal documents and let AI summarize, explain, and highlight key clauses."
        />
        <meta
          name="twitter:image"
          content="https://askyourcontractai.com/preview-ai-legal-assistant.png"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AskYourContract.ai",
              url: "https://askyourcontractai.com",
              description:
                "AI-powered tool that helps you understand legal documents instantly.",
              publisher: {
                "@type": "Organization",
                name: "AskYourContract.ai",
                logo: {
                  "@type": "ImageObject",
                  url: "https://askyourcontractai.com/preview-ai-legal-assistant.png",
                },
              },
            }),
          }}
        />

        {/* Google Analytics (GA4) with page_path tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LR373JLL8E"></script>
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

        {/* Google AdSense Verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6625555515664002"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}