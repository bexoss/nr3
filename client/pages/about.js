import PublicLayout from '../components/PublicLayout'

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">브랜드 스토리</h1>
        <p className="text-gray-700">우리는 피부 본연의 힘을 믿습니다...</p>
      </div>
    </PublicLayout>
  )
}
