import PublicLayout from '../../components/PublicLayout'

export default function MyPage() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">MY PAGE</h1>
        <p className="text-gray-700">프로필/주소 수정, 로그아웃 등이 들어갑니다.</p>
      </div>
    </PublicLayout>
  )
}
