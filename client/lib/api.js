const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: 'include' })
  if (!res.ok) throw new Error('API error')
  return res.json()
}
