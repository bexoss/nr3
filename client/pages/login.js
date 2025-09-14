import { useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../components/PublicLayout'
import { apiGet } from '../lib/api'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@local.test')
  const [password, setPassword] = useState('changeme123!')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'login_failed')
      router.push('/mypage')
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      <form onSubmit={onSubmit} className="max-w-sm mx-auto px-4 py-10 space-y-4">
        <h1 className="text-2xl font-semibold mb-2">로그인</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          placeholder="Email"
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded">
          {loading ? '로그인 중...' : '로그인'}
        </button>
        <div className="text-center text-sm text-gray-600">또는</div>
        <div className="grid grid-cols-3 gap-2">
          <button className="border py-2 rounded">Google</button>
          <button className="border py-2 rounded">Line</button>
          <button className="border py-2 rounded">Facebook</button>
        </div>
      </form>
    </PublicLayout>
  )
}
