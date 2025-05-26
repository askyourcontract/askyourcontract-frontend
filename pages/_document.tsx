import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="AskYourContract.ai — AI Legal Document Assistant" />
        <meta name="description" content="Upload and understand contracts instantly using AI. Summarized, simplified, and key points extracted automatically." />
        <meta name="keywords" content="legal AI, contract analysis, summarize contracts, AskYourContract, understand legal documents, AI assistant" />
        <meta name="author" content="AskYourContract.ai" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askyourcontractai.com/" />
        <meta property="og:title" content="AskYourContract.ai — AI Legal Document Assistant" />
        <meta property="og:description" content="Upload and understand contracts instantly using AI. Get summaries, key points, and plain-language explanations." />
        <meta property="og:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://askyourcontractai.com/" />
        <meta name="twitter:title" content="AskYourContract.ai — AI Legal Document Assistant" />
        <meta name="twitter:description" content="Upload and understand contracts instantly using AI. Get summaries, key points, and plain-language explanations." />
        <meta name="twitter:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}