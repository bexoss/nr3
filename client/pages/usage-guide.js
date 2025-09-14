import PublicLayout from '../components/PublicLayout'

export default function UsageGuide() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">사용법 안내</h1>
        <p className="text-gray-700">제품별 사용 순서와 팁을 확인하세요.</p>
      </div>
    </PublicLayout>
  )
}
