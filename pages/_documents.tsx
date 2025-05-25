import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="AskYourContract.ai - AI-Powered Legal Assistant" />
        <meta name="description" content="Upload and understand legal documents instantly with AI. AskYourContract.ai simplifies contracts with summaries, key clauses, and plain English explanations." />
        <meta name="keywords" content="AI contract analysis, legal assistant, contract summaries, legal AI, document understanding" />
        <meta name="author" content="AskYourContract.ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askyourcontract.ai/" />
        <meta property="og:title" content="AskYourContract.ai - AI-Powered Legal Assistant" />
        <meta property="og:description" content="Upload and understand legal documents instantly with AI. Summaries, key clauses, and plain English explanations." />
        <meta property="og:image" content="https://askyourcontract.ai/preview-ai-legal-assistant.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://askyourcontract.ai/" />
        <meta property="twitter:title" content="AskYourContract.ai - AI-Powered Legal Assistant" />
        <meta property="twitter:description" content="Upload and understand legal documents instantly with AI. Summaries, key clauses, and plain English explanations." />
        <meta property="twitter:image" content="https://askyourcontract.ai/preview-ai-legal-assistant.png" />

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