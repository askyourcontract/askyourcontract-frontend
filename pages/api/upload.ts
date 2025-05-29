import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export const config = {
  api: {
    bodyParser: true, // Enable body parsing for JSON
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { filePath } = req.body

  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  if (sessionError || !session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Insert into documents table
  const { error } = await supabase
    .from('documents')
    .insert([
      {
        path: filePath,
        user_id: session.user.id
      }
    ])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true })
}