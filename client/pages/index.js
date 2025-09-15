import PublicLayout from '../components/PublicLayout'
import HeroSlider from '../components/HeroSlider'
import { Button, Title1, Body2 } from '../components/ui'

export default function Home() {
  const slides = [
    {
      bgImage: '/images/ceramide-bg.png',
      content: (
        <div>
          <Title1 className="mb-2">Glow with Confidence</Title1>
          <Body2 className="text-gray-600 mb-6">브랜드의 대표 라인업으로 매일의 루틴을 간결하게.</Body2>
          <Button as="a" href="/collections/best">지금 쇼핑하기</Button>
        </div>
      ),
    },
  ]

  return (
    <PublicLayout transparentHeader headerSlot={<HeroSlider slides={slides} />}>
      {/* Additional landing sections can go here */}
    </PublicLayout>
  )
}
