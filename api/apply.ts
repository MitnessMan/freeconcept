// /api/apply.ts
// Serverless Google Sheets backend (Vercel function)
// POST /api/apply  -> başvuruyu Google Sheet'e yazar
// CORS dahil, basit rate limit, alan doğrulama, sağlam hata mesajları.

// ====== Tipler ======
type ApplyPayload = {
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  languages?: string[];   // ["Fransızca","Almanca",...]
  about?: string;
  kvkk?: boolean;
  cvName?: string;        // "CV_AdSoyad.pdf"
  lang?: "tr" | "de" | "fr" | "en"; // formun o anki dili (opsiyonel)
};

// ====== Basit in-memory rate limit (best-effort) ======
const RL_WINDOW_MS = 15_000; // 15sn
const RL_MAX = 3;            // 15sn'de max 3 istek
const rl = new Map<string, { count: number; ts: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const node = rl.get(key);
  if (!node || now - node.ts > RL_WINDOW_MS) {
    rl.set(key, { count: 1, ts: now });
    return false;
  }
  node.count++;
  if (node.count > RL_MAX) return true;
  return false;
}

// ====== Google Sheets bağlan ======
import { google } from 'googleapis';

function getJwtClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  }
  // Vercel env içinde \n kaçışlarını gerçek satır sonuna çevir
  privateKey = privateKey.replace(/\\n/g, '\n');

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

async function appendToSheet(values: (string | number | boolean | null)[]) {
  const SHEET_ID = process.env.SHEET_ID!;
  const TAB = process.env.SHEET_TAB_NAME || 'Submissions';
  if (!SHEET_ID) throw new Error('Missing SHEET_ID');

  const auth = getJwtClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${TAB}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [values] },
  });

  // Örn: updates.updatedRange: 'Submissions!A2:O2'
  const updatedRange = (res.data.updates?.updatedRange || '').split('!')[1] || '';
  return { updatedRange };
}

// ====== Yardımcılar ======
function okEmail(x?: string) {
  if (!x) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim());
}
function safeStr(x?: string, max = 1000) {
  const s = (x ?? '').toString().trim();
  return s.slice(0, max);
}
function arrToCsv(arr?: string[], max = 20) {
  const a = Array.isArray(arr) ? arr.slice(0, max) : [];
  return a.map(s => (s ?? '').toString().trim()).filter(Boolean).join(', ');
}
function getIp(req: any) {
  const xf = (req.headers?.['x-forwarded-for'] || '') as string;
  return (xf.split(',')[0] || req.socket?.remoteAddress || (req.connection as any)?.remoteAddress || '').trim();
}
function sendCors(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // gerekirse domain ile kısıtla
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ====== Handler ======
export default async function handler(req: any, res: any) {
  try {
    sendCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'POST') {
      return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    }

    // Rate limit (IP + UA)
    const key = getIp(req) + '|' + (req.headers?.['user-agent'] || '');
    if (rateLimit(key)) {
      return res.status(429).json({ ok: false, error: 'Too Many Requests' });
    }

    // Body parse (Vercel bazen body'yi string bazen object verir)
    const body: ApplyPayload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = safeStr(body.email, 200);
    const phone = safeStr(body.phone, 200);
    const country = safeStr(body.country, 120);
    const city = safeStr(body.city, 120);
    const languages = arrToCsv(body.languages);
    const about = safeStr(body.about, 4000);
    const kvkk = !!body.kvkk;
    const cvName = safeStr(body.cvName, 300);
    const lang = (safeStr(body.lang, 5) as any) || 'tr';

    // Basit doğrulama:
    if (!kvkk) {
      return res.status(400).json({ ok: false, error: 'KVKK onayı zorunlu.' });
    }
    if (!okEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Geçerli bir e-posta girin.' });
    }
    if (!phone) {
      return res.status(400).json({ ok: false, error: 'Telefon zorunludur.' });
    }

    // Meta
    const ts = new Date().toISOString();
    const ua = safeStr(req.headers?.['user-agent'] as string, 500);
    const ip = safeStr(getIp(req), 100);
    const referer = safeStr(req.headers?.['referer'] as string, 500);
    const origin = safeStr(req.headers?.['origin'] as string, 300);

    // Sheet'e yazılacak tek satır
    const row = [
      ts,            // A - timestamp (ISO)
      email,         // B
      phone,         // C
      country,       // D
      city,          // E
      languages,     // F
      about,         // G
      kvkk ? 'yes' : 'no',  // H
      cvName || '(mail/wa ile gelecek)', // I
      lang,          // J form dili
      ua,            // K userAgent
      ip,            // L ip (best-effort)
      origin,        // M
      referer        // N
    ];

    const { updatedRange } = await appendToSheet(row);

    return res.status(200).json({
      ok: true,
      saved: true,
      range: updatedRange,
      message: 'Başvuru kaydedildi.',
    });
  } catch (err: any) {
    console.error('apply error:', err?.response?.data || err?.message || err);
    // Google yetki hatasında anlamlı dön
    if (/Request had insufficient authentication scopes|invalid_grant|unauthorized/i.test(String(err?.message))) {
      return res.status(500).json({ ok: false, error: 'Google Sheets yetkilendirme hatası (env değişkenlerini kontrol edin).' });
    }
    return res.status(500).json({ ok: false, error: 'Sunucu hatası.' });
  }
}
