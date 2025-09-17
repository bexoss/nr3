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
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
          <h1 className="text-3xl font-bold mb-2">Ceramide 5000ppm</h1>
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
          <h1 className="text-3xl font-bold mb-2">Salmon PDRN 100,000ppm</h1>
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
      {/* Best Products */}
      <div className="py-10 mt-5">
        <HomeBestSection />
      </div>
      {/* Common Concerns */}
      <div className="py-10 px-12">
        <h2 className="text-2xl font-bold">Common Concerns</h2>
        <p className="mt-4 text-sm text-gray-600">Not sure where to begin? Here are some common skin concerns.</p>
        <div className="">
          <div className="grid grid-cols-6 gap-1 mt-10">
            {[
              {
                label: 'Dryness',
                image:
                  'https://cdn.media.amplience.net/i/deciem/signs-of-aging-concern_1?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
              {
                label: 'Redness',
                image:
                  'https://cdn.media.amplience.net/i/deciem/congestion-concerns?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
              {
                label: 'Dullness',
                image: 'https://cdn.media.amplience.net/i/deciem/Texture?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
              {
                label: 'Wrinkles',
                image:
                  'https://cdn.media.amplience.net/i/deciem/Dark%20Circles?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
              {
                label: 'Acne',
                image:
                  'https://cdn.media.amplience.net/i/deciem/Redness-Concern1?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
              {
                label: 'Dark Spots',
                image:
                  'https://cdn.media.amplience.net/i/deciem/Dryness-Concern?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1',
              },
            ].map((concern) => (
              <div key={concern.label} className="flex flex-col items-start">
                <img src={concern.image} alt={concern.label} className="w-40 h-40 mb-2" />
                <span className="text-sm self-start">{concern.label}</span>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4 mt-10" />
      </div>

      {/* Mix Your Skin's Match */}
      <div className="py-10 px-12">
        <div className="flex gap-8">
          <div className="basis-3/5">
            <div>
              <h2 className="text-2xl mb-8 font-bold">Find Your Skin’s Formula</h2>
              <p className="text-gray-600 mb-8 text-sm">
                Tell us your top skin concerns. We’ll recommend the formulations that can help.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-between px-8 py-4 w-[280px] border border-gray-400 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span></span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="basis-2/5">
            <div className="relative">
              <img
                src={
                  'https://nano-recipe-assets.s3.ap-northeast-2.amazonaws.com/images/detailImages/common_plenty_animation.gif'
                }
                alt={'기획 제품'}
                style={{ width: '100%', height: 'auto' }}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4 mt-10" />
      </div>

      <div className="py-10 px-12">
        <h2 className="text-2xl mb-8 font-bold">Make your own care.</h2>
        <div className="flex gap-8">
          <div className="basis-2/5">
            <div className="relative">
              <img
                src={
                  'https://nano-recipe-assets.s3.ap-northeast-2.amazonaws.com/images/detailImages/1756970949161-8482678.gif'
                }
                alt={'기획 제품'}
                style={{ width: '100%', height: 'auto' }}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="basis-2/5">
            <div className="relative">
              <img
                src={
                  'https://nano-recipe-assets.s3.ap-northeast-2.amazonaws.com/images/detailImages/1756970949252-661468147.gif'
                }
                alt={'기획 제품'}
                style={{ width: '100%', height: 'auto' }}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="basis-1/5">
            <div className="p-4 pr-10">
              <p className="text-gray-600 mb-8">
                Tell us your top skin concerns. We’ll recommend the formulations that can help.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-between px-8 py-4 w-[280px] border border-gray-400 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span></span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 px-12">
        <h2 className="text-3xl mb-8 font-bold">As seen on social</h2>
      </div>

      <div className="py-10">
        <div className="flex gap-8">
          <div className="basis-3/5">
            <div className="relative">
              <img
                src={
                  'https://nano-recipe-assets.s3.ap-northeast-2.amazonaws.com/images/bannerImages/1752047428925-903165812.webp'
                }
                alt={'기획 제품'}
                style={{ width: '100%', height: 'auto' }}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="basis-2/5">
            <div className="p-4 pr-10">
              <h2 className="text-3xl mb-8">기획제품</h2>
              <p className="text-gray-600 mb-8">
                원액 제품이 너무 많아서 고르기 어려우신 분들을 위해 피부타입 별 세트를 추천드립니다. 본인의 피부타입에
                맞는 세트를 구매해 제대로 관리해보세요.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-between px-8 py-4 w-[280px] border border-gray-400 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span></span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
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
        <h2 className="text-2xl font-bold whitespace-nowrap">Best Products</h2>
        <div className="text-base text-gray-600 whitespace-nowrap mt-2">Most searched this week</div>
      </motion.div>

      {/* 캐러셀 - motion 애니메이션 적용 */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4"
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
