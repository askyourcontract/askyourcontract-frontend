// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false, // So it can accept file streams if needed
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Upload endpoint is ready (not implemented)' })
}