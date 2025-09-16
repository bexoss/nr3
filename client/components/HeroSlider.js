import { useEffect, useState } from 'react'
import Button from './ui/Button'

export default function HeroSlider({ slides = [], interval = 5000 }) {
  const [idx, setIdx] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (count <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % count), interval)
    return () => clearInterval(t)
  }, [count, interval])

  if (count === 0) return null

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div
        className="h-full w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="w-full shrink-0 h-full bg-no-repeat bg-cover bg-right md:bg-center"
            style={s && s.bgImage ? { backgroundImage: `url(${s.bgImage})` } : undefined}
          >
            <div
              className={[
                'relative h-full w-full flex items-center justify-center',
                // subtle overlay for text readability
                'after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-br after:from-white/0 after:to-white/5',
              ].join(' ')}
            >
              <div className="max-w-6xl mx-auto px-4 py-0 w-full h-full">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                  <div className="text-left flex items-center h-full">{s.content}</div>
                  <div className="relative flex justify-end h-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center px-2">
            <Button variant="ghost" size="sm" aria-label="Previous" onClick={() => setIdx((idx - 1 + count) % count)}>
              ‹
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <Button variant="ghost" size="sm" aria-label="Next" onClick={() => setIdx((idx + 1) % count)}>
              ›
            </Button>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={['h-2 w-2 rounded-full border border-white', i === idx ? 'bg-white' : 'bg-white/30'].join(
                  ' '
                )}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
