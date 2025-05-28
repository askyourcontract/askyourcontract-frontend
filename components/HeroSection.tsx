'use client'

import { useRouter } from 'next/router'

export default function HeroSection() {
  const router = useRouter()

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 sm:px-12 md:px-20 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Understand Legal Documents Instantly with <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Upload contracts, NDAs, agreements, and let AI highlight clauses, summarize key points, and explain them in plain English.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </button>
          <a
            href="#features"
            className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  )
}