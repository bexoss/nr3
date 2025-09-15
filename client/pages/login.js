import { useState } from 'react'
import { useRouter } from 'next/router'
import PublicLayout from '../components/PublicLayout'
import { Button, Input, Alert, CircularProgress, Title1, Body2 } from '../components/ui'
import { useMutation } from '@tanstack/react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@test.com')
  const [password, setPassword] = useState('test')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'login_failed')
      return data
    },
    onSuccess: () => router.push('/me'),
    onError: () => setError('이메일 또는 비밀번호가 올바르지 않습니다.'),
    onSettled: () => setLoading(false),
  })

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    loginMutation.mutate()
  }

  return (
    <PublicLayout>
      <form onSubmit={onSubmit} className="max-w-sm mx-auto px-4 py-10 space-y-5">
        <div>
          <Title1>로그인</Title1>
          <Body2 className="text-gray-600">계정으로 로그인하세요</Body2>
        </div>
        {error ? (
          <Alert variant="error" title="로그인 오류">{error}</Alert>
        ) : null}
        <Input label="이메일" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="비밀번호" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <CircularProgress size="sm" color="white" className="mr-2" /> 로그인 중…
            </>
          ) : (
            '로그인'
          )}
        </Button>
        <div className="text-center text-xs text-gray-600">또는</div>
        <div className="grid grid-cols-3 gap-2">
          <Button type="button" variant="outline">Google</Button>
          <Button type="button" variant="outline">Line</Button>
          <Button type="button" variant="outline">Facebook</Button>
        </div>
      </form>
    </PublicLayout>
  )
}
