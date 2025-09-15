import { useEffect, useState } from 'react'
import PublicLayout from '../../components/PublicLayout'
import { Title1, Body2, Tabs, Table } from '../../components/ui'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export default function MePage() {
  const [me, setMe] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE}/auth/me`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setMe(d?.user || null))
  }, [])

  const addr = me?.shippingAddress || {}

  const profile = (
    <div className="space-y-1">
      <div><span className="text-gray-500 mr-2">이름</span>{me?.name || '-'}</div>
      <div><span className="text-gray-500 mr-2">이메일</span>{me?.email || '-'}</div>
    </div>
  )

  const address = (
    <div className="space-y-1">
      <div><span className="text-gray-500 mr-2">우편번호</span>{addr.zipCode || '-'}</div>
      <div><span className="text-gray-500 mr-2">주소</span>{addr.shippingAddress1 || '-'}</div>
      <div><span className="text-gray-500 mr-2">상세주소</span>{addr.shippingAddress2 || '-'}</div>
    </div>
  )

  const orders = (
    <Body2 className="text-gray-500">주문 내역 연동 준비 중입니다.</Body2>
  )

  const tickets = (
    <Body2 className="text-gray-500">문의 내역 연동 준비 중입니다.</Body2>
  )

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <Title1>마이페이지</Title1>
          <Body2 className="text-gray-600">내 프로필과 주문/문의 내역을 확인하세요</Body2>
        </div>
        {!me ? (
          <Body2 className="text-gray-500">로그인이 필요합니다.</Body2>
        ) : (
          <Tabs
            tabs={[
              { label: '프로필', value: 'profile', content: () => profile },
              { label: '배송지', value: 'address', content: () => address },
              { label: '주문내역', value: 'orders', content: () => orders },
              { label: '문의내역', value: 'tickets', content: () => tickets },
            ]}
          />
        )}
      </div>
    </PublicLayout>
  )}

