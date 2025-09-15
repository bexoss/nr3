import PublicLayout from '../components/PublicLayout'
import { useState } from 'react'
import { Button, Input, Title1, Body2 } from '../components/ui'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <PublicLayout>
      <form className="max-w-sm mx-auto px-4 py-10 space-y-5">
        <div>
          <Title1>회원가입</Title1>
          <Body2 className="text-gray-600">계정을 생성합니다</Body2>
        </div>
        <Input label="이름" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="이메일" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="비밀번호" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">가입하기</Button>
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

