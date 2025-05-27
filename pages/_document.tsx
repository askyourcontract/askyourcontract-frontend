import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="description" content="AskYourContract.ai helps you understand legal documents instantly with AI. Upload contracts, get summaries, and insights in seconds." />
        <meta name="keywords" content="legal AI, contract analysis, document summarization, AI lawyer, Supabase, OpenAI, AskYourContract" />
        <meta name="author" content="AskYourContract.ai" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askyourcontractai.com/" />
        <meta property="og:title" content="AskYourContract.ai - Understand Contracts with AI" />
        <meta property="og:description" content="Upload your legal documents and get instant AI-powered summaries, explanations, and clause highlights." />
        <meta property="og:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://askyourcontractai.com/" />
        <meta name="twitter:title" content="AskYourContract.ai - Understand Contracts with AI" />
        <meta name="twitter:description" content="Upload legal documents and let AI summarize, explain, and highlight key clauses." />
        <meta name="twitter:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AskYourContract.ai",
              url: "https://askyourcontractai.com",
              description: "AI-powered tool that helps you understand legal documents instantly.",
              sameAs: [],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://askyourcontractai.com/?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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

        {/* Google Analytics Loader */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LR373JLL8E"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}