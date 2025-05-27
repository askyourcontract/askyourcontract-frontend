'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type AnalysisResult = {
  summary: string
  clauses: string[]
  explanation: string
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
    setAnalysis(null)
    setError('')
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setUploading(true)
    setError('')
    setAnalysis(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw new Error(uploadError.message)

      // Trigger Google Analytics event for file upload
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'file_upload', {
          event_category: 'Documents',
          event_label: file.name,
          value: file.size,
        })
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')

      setAnalysis(data)

      // Trigger Google Analytics event for AI result
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ai_analysis_complete', {
          event_category: 'Analysis',
          event_label: file.name,
        })
      }

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white max-w-2xl mx-auto w-full p-6 sm:p-8 rounded-xl shadow-md mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload your legal document</h2>
        <p className="text-gray-500 text-sm">
          Supported formats: PDF, DOCX, JPG/PNG
        </p>
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        {uploading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : null}
        {uploading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded">
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">📄 Summary</h3>
            <p className="text-gray-700 mt-1">{analysis.summary}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">📌 Important Clauses</h3>
            <ul className="list-disc pl-5 text-gray-700 mt-1 space-y-1">
              {analysis.clauses.map((clause, i) => (
                <li key={i}>{clause}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">💡 Simple Explanation</h3>
            <p className="text-gray-700 mt-1">{analysis.explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}