import PublicLayout from '../../components/PublicLayout'

export default function Account() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">ACCOUNT</h1>
        <div className="space-x-3">
          <a href="/login" className="px-4 py-2 border rounded">로그인</a>
          <a href="/signup" className="px-4 py-2 border rounded">회원가입</a>
        </div>
      </div>
    </PublicLayout>
  )
}
