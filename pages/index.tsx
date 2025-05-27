'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import FileUpload from '../components/Fileupload'
import { Session } from '@supabase/supabase-js'

export default function Home({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [currentSession, setCurrentSession] = useState<Session | null>(session)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // --- Google Analytics Event Tracking ---
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'login', {
        method: 'Google',
      })
    }
  }

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', isSignUp ? 'sign_up' : 'login', {
        method: 'Email',
      })
    }

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(isSignUp ? 'Signup successful! Check your email to confirm.' : 'Login successful!')
    }

    setLoading(false)
  }
  // --- End Google Analytics Event Tracking ---

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <Head>
        <title>AskYourContract.ai - Understand Contracts with AI</title>
        <meta
          name="description"
          content="Upload your legal documents and get instant AI-powered summaries, explanations, and clause highlights."
        />
        <meta name="keywords" content="AI contract analysis, legal assistant, contract summaries, legal AI" />
        <meta name="author" content="AskYourContract.ai" />
        <meta property="og:url" content="https://askyourcontractai.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AskYourContract.ai - Understand Contracts with AI" />
        <meta
          property="og:description"
          content="Upload your legal documents and get instant AI-powered summaries, explanations, and clause highlights."
        />
        <meta property="og:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AskYourContract.ai - Understand Contracts with AI" />
        <meta
          name="twitter:description"
          content="Upload your legal documents and get instant AI-powered summaries, explanations, and clause highlights."
        />
        <meta name="twitter:image" content="https://askyourcontractai.com/preview-ai-legal-assistant.png" />
        <link rel="canonical" href="https://askyourcontractai.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AskYourContract.ai',
              url: 'https://askyourcontractai.com',
              description:
                'AI-powered legal assistant that summarizes, explains, and highlights clauses in legal documents.',
              applicationCategory: 'LegalApplication',
              operatingSystem: 'All',
            }),
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <header className="text-center p-6 bg-white shadow">
          <h1 className="text-3xl font-bold text-blue-700">AskYourContract.ai</h1>
          <p className="text-gray-600 mt-1">
            Upload and understand legal documents instantly with AI
          </p>
        </header>

        <main className="flex-grow flex items-center justify-center px-4 py-10">
          {!currentSession ? (
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center space-y-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Sign in with Google
              </button>

              <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-10 bg-gray-300"></span>
                <span className="text-sm text-gray-500">or</span>
                <span className="h-px w-10 bg-gray-300"></span>
              </div>

              <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleAuth}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setMessage('')
                  }}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                >
                  {isSignUp ? 'Login' : 'Sign Up'}
                </button>
              </div>

              {message && <p className="text-sm text-red-600" role="status">{message}</p>}
            </div>
          ) : (
            <div className="w-full max-w-2xl px-4">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700 font-medium">
                  Signed in as {currentSession.user.email}
                </p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:underline"
                >
                  Sign out
                </button>
              </div>
              <FileUpload />
            </div>
          )}
        </main>

        <footer className="text-center text-sm text-gray-500 py-4">
          &copy; {new Date().getFullYear()} AskYourContract.ai • All rights reserved.
          <br />
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:underline mx-2"
          >
            Privacy Policy
          </a>
          |
          <a
            href="/terms-of-service"
            className="text-blue-600 hover:underline mx-2"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </>
  )
}