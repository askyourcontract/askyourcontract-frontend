import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import Tesseract from 'tesseract.js'
import { OpenAI } from 'openai'
import { Buffer } from 'buffer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

async function extractText(fileUrl: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('documents')
    .download(fileUrl)

  if (error || !data) throw new Error('Failed to download file')

  const buffer = await data.arrayBuffer()
  const ext = fileUrl.split('.').pop()?.toLowerCase()

  if (ext === 'pdf') {
    return (await pdfParse(Buffer.from(buffer))).text
  } else if (ext === 'docx' || ext === 'doc') {
    return (await mammoth.extractRawText({ buffer: Buffer.from(buffer) })).value
  } else if (['png', 'jpg', 'jpeg'].includes(ext || '')) {
    const result = await Tesseract.recognize(Buffer.from(buffer), 'eng')
    return result.data.text
  } else {
    throw new Error('Unsupported file format')
  }
}

async function askOpenAI(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  })
  return res.choices[0].message.content || ''
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { filePath } = req.body

  try {
    const text = await extractText(filePath)

    const summary = await askOpenAI(
      `Summarize this legal contract in 5-7 sentences:\n\n${text}`
    )
    const clauses = await askOpenAI(
      `Extract the key clauses or important legal points from this contract:\n\n${text}`
    )
    const explanation = await askOpenAI(
      `Explain this legal document in simple plain English:\n\n${text}`
    )

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await supabase.from('documents').insert([
      {
        user_id: user.id,
        file_name: filePath.split('/').pop(),
        summary,
        clauses,
        explanation,
      },
    ])

    return res.status(200).json({
      summary,
      clauses,
      explanation,
    })
  } catch (error) {
    console.error('Analysis failed:', error)
    return res.status(500).json({ error: 'Failed to analyze document' })
  }
}