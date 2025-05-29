import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  if (sessionError || !session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json(data)
}