'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { saveAs } from 'file-saver'

export default function ContractBuilder() {
  const [session, setSession] = useState<Session | null>(null)
  const [prompt, setPrompt] = useState('')
  const [contract, setContract] = useState('')
  const [loading, setLoading] = useState(false)

  const templatePresets = [
    {
      title: '📄 NDA Agreement',
      prompt: 'Draft a non-disclosure agreement between a startup and a contractor for confidential project work.'
    },
    {
      title: '🧑‍💻 Freelance Contract',
      prompt: 'Create a freelance agreement between a graphic designer and a client for a logo design project.'
    },
    {
      title: '🏠 Lease Agreement',
      prompt: 'Generate a rental lease agreement between a landlord and tenant for a residential property.'
    },
    {
      title: '🤝 Employment Offer',
      prompt: 'Draft an employment offer letter for a new software engineer at a tech company.'
    }
  ]

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  const generateContract = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setContract('')

    try {
      const res = await fetch('/api/generate-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setContract(data.contract)
    } catch (err: any) {
      alert(err.message || 'Failed to generate contract.')
    } finally {
      setLoading(false)
    }
  }

  // Download as .doc with basic formatting for Word
  const handleDownload = () => {
    if (!contract) return
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'></head><body>
    `
    const content = `<pre style="font-family:Arial; font-size:12pt;">${contract.replace(/\n/g, '<br>')}</pre>`
    const footer = '</body></html>'
    const blob = new Blob([header + content + footer], {
      type: 'application/msword'
    })
    saveAs(blob, 'generated_contract.doc')
  }

  if (!session) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center">
        <p className="text-center text-xl">Please log in to build a contract.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>AI-Powered Contract Builder | AskYourContract.ai</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6 max-w-7xl mx-auto">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">AskYourContract.ai</span>
          </div>
          <div className="text-sm text-slate-300 flex items-center gap-4">
            <span>{session.user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Builder Section */}
        <main className="max-w-3xl mx-auto mt-10 space-y-8">
          <h1 className="text-3xl font-bold text-center mb-2">AI Contract Builder</h1>

          {/* Preset Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templatePresets.map((preset, index) => (
              <button
                key={index}
                aria-label={`Use template: ${preset.title}`}
                onClick={() => setPrompt(preset.prompt)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-left"
              >
                {preset.title}
              </button>
            ))}
          </div>

          {/* Prompt Textarea */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the contract you need..."
            className="w-full p-4 rounded-lg text-black min-h-[120px]"
          />

          <button
            onClick={generateContract}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Contract'}
          </button>

          {/* Result */}
          {contract && (
            <div className="bg-white text-black p-6 rounded-xl shadow space-y-4">
              <h2 className="text-lg font-bold text-gray-800">📄 Generated Contract</h2>
              <pre className="whitespace-pre-wrap font-mono text-sm">{contract}</pre>

              <button
                onClick={handleDownload}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                disabled={!contract}
              >
                Download as Word
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}