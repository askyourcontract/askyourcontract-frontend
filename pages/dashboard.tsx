'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import Head from 'next/head'
import Image from 'next/image'

interface Document {
  id: string
  file_name: string
  file_path?: string
  created_at: string
}

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchDocuments()
  }, [session])

  const fetchDocuments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', session?.user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setDocuments(data)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return (
      <div className="h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Please log in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Your Dashboard | AskYourContract.ai</title>
      </Head>
      <div className="min-h-screen bg-slate-900 text-white px-4">
        {/* Header */}
        <header className="flex justify-between items-center py-6 max-w-6xl mx-auto">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => (window.location.href = '/')}
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

        {/* Main */}
        <main className="max-w-6xl mx-auto mt-8 space-y-6">
          <h1 className="text-3xl font-bold mb-4">📁 Your Uploaded Documents</h1>

          {loading ? (
            <p>Loading...</p>
          ) : documents.length === 0 ? (
            <p>No documents uploaded yet.</p>
          ) : (
            <table className="w-full text-left bg-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-700 text-sm uppercase text-slate-300">
                <tr>
                  <th className="p-3">File Name</th>
                  <th className="p-3">Uploaded</th>
                  <th className="p-3">Download</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-700 hover:bg-slate-700">
                    <td className="p-3">{doc.file_name}</td>
                    <td className="p-3">{new Date(doc.created_at).toLocaleString()}</td>
                    <td className="p-3">
                      {doc.file_path ? (
                        <a
                          href={`https://${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
                            /^https?:\/\//,
                            ''
                          )}/storage/v1/object/public/documents/${doc.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </>
  )
}