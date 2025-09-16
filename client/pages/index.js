import React from 'react'
import PublicLayout from '../components/PublicLayout'
import HeroSlider from '../components/HeroSlider'
import { Button, Title1, Body1, Body2 } from '../components/ui'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../lib/api'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { ScrollAnimationVariants } from '../lib/utils/animation'

// Swiper CSS
import 'swiper/css'
import 'swiper/css/free-mode' // freeMode 사용 시 권장
// import 'swiper/css/navigation' // 네비게이션 미사용이면 불필요

export default function Home() {
  const slides = [
    {
      bgImage: '/images/ceramide-wide.png',
      content: (
        <div>
          <Body2 className="text-gray-500 mb-1">Skin barrier care</Body2>
          <Title1 className="mb-2">Ceramide 5000ppm</Title1>
          <Body1 className="text-gray-600 mb-6">
            High concentration ceramide essence to help protect your skin barrier and prevent moisture loss.
            <br /> Keep dry and sensitive skin hydrated and comfortable.
          </Body1>
          <Button as="a" href="/collections/best">
            Shop Now
          </Button>
        </div>
      ),
    },
    {
      bgImage: '/images/salmon-pdrn-0.3x.png',
      content: (
        <div>
          <Body2 className="text-gray-500 mb-1">Revitalize your skin</Body2>
          <Title1 className="mb-2">Salmon PDRN 100,000ppm</Title1>
          <Body1 className="text-gray-600 mb-6">
            PDRN helps support skin renewal for a firmer, healthier look.
            <br /> Pair with ceramide care to lock in moisture.
          </Body1>
          <Button as="a" href="/collections/best">
            Shop Now
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PublicLayout transparentHeader headerSlot={<HeroSlider slides={slides} />}>
      <div className="py-10">
        <HomeBestSection />
      </div>
    </PublicLayout>
  )
}
// (선택) 스크롤바 숨김 전역 CSS가 없다면 추가하세요.
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

function HomeBestSection() {
  const { data } = useQuery({
    queryKey: ['home', 'best-weekly'],
    queryFn: () => apiGet('/products?sort=best&size=12'),
  })
  const items = data?.items || []

  const swiperRef = React.useRef(null)
  const [progress, setProgress] = React.useState(30)

  React.useEffect(() => {
    const inst = swiperRef.current?.swiper
    if (!inst) return

    const handleProgress = (s) => {
      const p = Math.min(1, Math.max(0, s.progress ?? 0))
      setProgress(Math.max(30, Math.round(p * 100)))
    }

    handleProgress(inst)
    inst.on('progress', handleProgress)
    inst.on('slideChangeTransitionEnd', handleProgress)
    return () => {
      inst.off('progress', handleProgress)
      inst.off('slideChangeTransitionEnd', handleProgress)
    }
  }, [data])

  return (
    <section className="w-full">
      {/* 헤더 영역 - motion 애니메이션 적용 */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={ScrollAnimationVariants}
      >
        <div className="text-xl font-medium whitespace-nowrap">Best Products</div>
        <div className="text-base text-gray-600 whitespace-nowrap mt-2">Most searched this week</div>
      </motion.div>

      {/* 캐러셀 - motion 애니메이션 적용 */}
      <motion.div
        className="relative max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={ScrollAnimationVariants}
      >
        <Swiper
          ref={swiperRef}
          modules={[FreeMode]}
          freeMode={true}
          grabCursor={true}
          spaceBetween={16}
          slidesPerView="auto"
          watchOverflow={true}
        >
          {items.map((p, idx) => (
            <SwiperSlide key={p._id || idx} style={{ width: 'auto' }}>
              <a href={`/p/${p._id}`} className="block w-[250px] md:w-[300px] rounded-md hover:shadow-sm bg-white">
                <div
                  className="w-full aspect-[4/5] bg-gray-100 rounded-t-md bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/ceramide-transparent.png)` }}
                />
                <div className="p-3">
                  <div className="text-sm text-gray-900 line-clamp-2 font-medium">{p.title || p.name}</div>
                  {p.option && <div className="text-xs text-gray-600 mt-1">{p.option}</div>}
                  <div className="text-sm mt-2 font-semibold">{(p.price ?? 0).toLocaleString()}원</div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 진행바 */}
        <div className="mt-6">
          <div className="w-full h-1 bg-gray-200 overflow-hidden rounded">
            <div
              className="h-full bg-gray-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
