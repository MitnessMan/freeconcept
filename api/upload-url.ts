// /api/upload-url.ts
import type { VercelRequest, VercelResponse } from 'vercel/node';
import { generateUploadURL } from '@vercel/blob';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { filename } = (req.body && typeof req.body === 'object') ? (req.body as any) : {};
    if (!filename || typeof filename !== 'string') {
      return res.status(400).json({ error: 'filename required' });
    }

    const url = await generateUploadURL({
      contentType: 'application/octet-stream',
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel env'den gelir
    });

    return res.status(200).json({ uploadURL: url, filename });
  } catch (err: any) {
    return res.status(500).json({ error: 'upload url error', msg: String(err?.message || err) });
  }
}
