import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import Tesseract from 'tesseract.js'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import { OpenAI } from 'openai'
import { Buffer } from 'buffer'

// Supabase client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filePath } = req.body

  if (!filePath) {
    return res.status(400).json({ error: 'Missing filePath' })
  }

  try {
    // Step 1: Download the uploaded file from Supabase
    const { data: file, error } = await supabase.storage.from('documents').download(filePath)
    if (error || !file) {
      throw new Error('Failed to download file.')
    }

    // Step 2: Determine file type from extension
    const ext = filePath.split('.').pop()?.toLowerCase()
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let text = ''

    if (ext === 'pdf') {
      const parsed = await pdfParse(buffer)
      text = parsed.text
    } else if (ext === 'docx') {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (['png', 'jpg', 'jpeg'].includes(ext || '')) {
      const result = await Tesseract.recognize(buffer, 'eng')
      text = result.data.text
    } else {
      throw new Error('Unsupported file type.')
    }

    if (!text || text.trim().length < 10) {
      throw new Error('Could not extract text from the file.')
    }

    // Step 3: Send the extracted text to OpenAI for analysis
    const prompt = `You are a legal assistant. Analyze the following legal document text:\n\n"${text}"\n\nPlease provide:\n1. A concise summary.\n2. The most important clauses (as a bullet list).\n3. A simple explanation suitable for a layperson.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    })

    const result = response.choices[0].message?.content || ''

    // Try to extract sections using RegExp
    const summaryMatch = result.match(/summary[\s\S]*?:([\s\S]*?)(?:\n\d\.|$)/i)
    const clausesMatch = result.match(/clauses[\s\S]*?:([\s\S]*?)(?:\n\d\.|$)/i)
    const explanationMatch = result.match(/explanation[\s\S]*?:([\s\S]*)/i)

    const summary = summaryMatch?.[1]?.trim() || ''
    const clausesRaw = clausesMatch?.[1]?.trim() || ''
    const explanation = explanationMatch?.[1]?.trim() || ''

    // Split clauses into array (handles bullet points, numbers, dashes)
    const clauses = clausesRaw
      .split(/\n\s*[-*•\d.]+\s*/)
      .map(c => c.trim())
      .filter(Boolean)

    res.status(200).json({
      summary: summary || 'N/A',
      clauses: clauses.length ? clauses : [clausesRaw || 'N/A'],
      explanation: explanation || 'N/A',
    })
  } catch (err: any) {
    console.error('Analysis error:', err.message)
    res.status(500).json({ error: 'Analysis failed. ' + err.message })
  }
}