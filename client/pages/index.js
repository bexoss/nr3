import PublicLayout from '../components/PublicLayout'

export default function Home() {
  return (
    <PublicLayout>
      <section className="min-h-[60vh] bg-gradient-to-br from-rose-100 to-sky-100 flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Glow with Confidence</h1>
          <p className="max-w-xl text-gray-600 mb-6">피부 과학에 기반한 포뮬러로 매일의 루틴을 간결하게. 지금 베스트 셀러를 만나보세요.</p>
          <a href="/shop" className="px-5 py-3 bg-black text-white rounded">지금 쇼핑하기</a>
        </div>
      </section>
    </PublicLayout>
  )
}
