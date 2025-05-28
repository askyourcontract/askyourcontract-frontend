'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import FileUpload from '../components/Fileupload'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [summary, setSummary] = useState('')
  const [importantClauses, setImportantClauses] = useState<string[]>([])
  const [simpleExplanation, setSimpleExplanation] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleResults = (results: {
    summary: string
    clauses: string[]
    explanation: string
  }) => {
    setSummary(results.summary)
    setImportantClauses(results.clauses)
    setSimpleExplanation(results.explanation)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <>
      <Head>
        <title>AskYourContract.ai - Understand Contracts with AI</title>
        <meta
          name="description"
          content="Upload and analyze legal contracts with AI"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 relative overflow-hidden">
        {/* Background SVGs */}
        <Image
          src="/document.svg"
          alt="Document BG"
          width={150}
          height={150}
          className="absolute bottom-10 left-10 opacity-10 hidden md:block"
        />
        <Image
          src="/magnifier.svg"
          alt="Magnifier BG"
          width={150}
          height={150}
          className="absolute top-10 right-20 opacity-10 hidden md:block"
        />
        <Image
          src="/Scales.svg"
          alt="Scales BG"
          width={150}
          height={150}
          className="absolute bottom-0 right-0 opacity-10 hidden md:block"
        />

        {/* Header */}
        <header className="flex justify-between items-center py-6 max-w-7xl mx-auto">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <Image
              src="/logo.png"
              alt="AskYourContract Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">AskYourContract.ai</span>
          </div>
          <div className="text-sm text-slate-300 flex items-center gap-4">
            {session ? (
              <>
                <span className="text-slate-400">{session.user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <a href="/signup" className="hover:text-white">
                Sign up
              </a>
            )}
          </div>
        </header>

        {/* Main Content */}
        {!session ? (
          <main className="flex flex-col items-center text-center mt-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Welcome to <br /> AskYourContract.AI
            </h1>
            <p className="text-slate-300 max-w-xl">
              Analyze your legal documents smartly with AI, detect red flags,
              and get actionable insights.
            </p>

            {/* Sign-in Buttons */}
            <div className="space-y-3 w-full max-w-xs">
              <button
                onClick={() =>
                  supabase.auth.signInWithOAuth({ provider: 'google' })
                }
                className="flex items-center justify-center w-full py-2 bg-white text-black rounded shadow"
              >
                <Image
                  src="/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </button>
              <button
                onClick={() =>
                  supabase.auth.signInWithOAuth({ provider: 'twitter' })
                }
                className="flex items-center justify-center w-full py-2 bg-blue-500 rounded shadow"
              >
                <Image
                  src="/twitter-icon.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Twitter
              </button>
              <button
                onClick={() =>
                  supabase.auth.signInWithOAuth({ provider: 'azure' })
                }
                className="flex items-center justify-center w-full py-2 bg-gray-800 rounded shadow"
              >
                <Image
                  src="/microsoft-icon.svg"
                  alt="Microsoft"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Microsoft
              </button>
            </div>
            <p className="text-sm text-slate-400">
              <a href="/signup" className="underline">
                Sign up
              </a>{' '}
              |{' '}
              <a href="/login" className="underline">
                Log in
              </a>
            </p>
          </main>
        ) : (
          <main className="max-w-7xl mx-auto mt-10">
            {/* Upload Section */}
            <section className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">Upload a Document</h2>
              <p className="text-slate-300 mb-6">
                Upload any legal document to receive instant analysis,
                summaries, and red flag detection.
              </p>
              <FileUpload onResults={handleResults} />
            </section>

            {/* Feature Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
              <div className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 min-h-[180px]">
                <div className="flex items-center mb-4">
                  <Image
                    src="/shield-icon.svg"
                    alt="Contract Review"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-semibold">Contract Review</h3>
                </div>
                <p className="text-slate-300 whitespace-pre-line">
                  {summary || 'Identify warning signs and potential issues in your contracts.'}
                </p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 min-h-[180px]">
                <div className="flex items-center mb-4">
                  <Image
                    src="/document.svg"
                    alt="Summarization"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-semibold">Document Summarization</h3>
                </div>
                <p className="text-slate-300 whitespace-pre-line">
                  {simpleExplanation || 'Get a concise summary of lengthy legal documents.'}
                </p>
              </div>
              <div className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 min-h-[180px]">
                <div className="flex items-center mb-4">
                  <Image
                    src="/magnifier.svg"
                    alt="Key Terms"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-semibold">Key Term Extraction</h3>
                </div>
                <p className="text-slate-300 whitespace-pre-line">
                  {importantClauses.length > 0
                    ? importantClauses.map((clause, idx) => <div key={idx}>{clause}</div>)
                    : 'Extract important clauses, dates, parties, and more.'}
                </p>
              </div>
              <div
                className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 min-h-[180px] hover:bg-slate-700 cursor-pointer"
                onClick={() => window.location.href = '/build'}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src="/Scales.svg"
                    alt="AI Contract Building"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-semibold">AI-Powered Contract Building</h3>
                </div>
                <p className="text-slate-300">Generate contracts tailored to your needs using AI.</p>
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  )
}