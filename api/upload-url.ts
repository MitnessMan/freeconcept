// /api/upload-url.ts
import { generateUploadURL } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const filename = typeof body?.filename === "string" ? body.filename : null;
    if (!filename) return res.status(400).json({ error: "filename required" });

    const { url, id, token, pathname } = await generateUploadURL({
      access: "public",
      contentType: "application/octet-stream",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ uploadURL: url, id, token, pathname, filename });
  } catch (err: any) {
    return res.status(500).json({
      error: "upload url error",
      message: String(err?.message ?? err),
    });
  }
}
