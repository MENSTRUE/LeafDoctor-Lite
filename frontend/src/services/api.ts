import type { Health, PredictionResult } from '../types/prediction';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function parseError(res: Response): Promise<string> {
  try { const body = await res.json(); return typeof body.detail === 'string' ? body.detail : `HTTP ${res.status}`; }
  catch { return `Server returned HTTP ${res.status}`; }
}

export async function checkHealth(signal?: AbortSignal): Promise<Health> {
  const res = await fetch(`${API}/api/v1/health`, { signal });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
export async function predictImage(file: File, signal?: AbortSignal): Promise<PredictionResult> {
  const form = new FormData(); form.append('file', file);
  const res = await fetch(`${API}/api/v1/predict`, { method: 'POST', body: form, signal });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
