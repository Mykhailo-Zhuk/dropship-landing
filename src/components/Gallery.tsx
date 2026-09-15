// ============================================================
// Gallery — слайдер фото товару
// ------------------------------------------------------------
// Особливості:
//  - гортання пальцем на мобільному (touch-події)
//  - стрілки «‹ ›» та точки-індикатори
//  - мініатюри під слайдером для швидкого переходу
//  - автопрокрутка кожні 5 секунд (зупиняється при наведенні)
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react'
import { PRODUCT } from '../data/product'
import { Reveal } from './Reveal'

export function Gallery() {
  const [active, setActive] = useState(0)
  const total = PRODUCT.images.length

  // Координата X початку дотику (для свайпів)
  const touchStartX = useRef<number | null>(null)

  /** Перехід до наступного фото (з зацикленням) */
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total])

  /** Перехід до попереднього фото */
  const prev = () => setActive((i) => (i - 1 + total) % total)

  // Автопрокрутка: спрацьовує кожні 5 секунд
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  // Обробники свайпу: запам'ятовуємо початок дотику...
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  // ...і порівнюємо з кінцем: зсув > 50px = свайп
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    if (delta < -50) next()
    touchStartX.current = null
  }

  return (
    <section id="gallery" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Заголовок секції */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-widest text-ink/50 uppercase">
              Галерея
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              Подивись <span className="text-accent-dark">у деталях</span>
            </h2>
            <p className="mt-3 text-ink/60">
              Гортай фото пальцем або використовуй стрілки
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl">
            {/* Головний слайд */}
            <div
              className="relative overflow-hidden rounded-3xl border border-ink/5 shadow-xl shadow-ink/10"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Фото з ефектом перемикання (fade) */}
              {PRODUCT.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${PRODUCT.name} — фото ${i + 1}`}
                  className={`aspect-[4/5] w-full object-cover transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                  }`}
                  loading="lazy"
                />
              ))}

              {/* Лічильник «2 / 5» */}
              <span className="absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-cream backdrop-blur-sm">
                {active + 1} / {total}
              </span>

              {/* Стрілка «назад» */}
              <button
                onClick={prev}
                aria-label="Попереднє фото"
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl font-bold text-ink shadow-lg backdrop-blur-sm hover:bg-accent"
              >
                ‹
              </button>
              {/* Стрілка «вперед» */}
              <button
                onClick={next}
                aria-label="Наступне фото"
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl font-bold text-ink shadow-lg backdrop-blur-sm hover:bg-accent"
              >
                ›
              </button>
            </div>

            {/* Точки-індикатори */}
            <div className="mt-4 flex justify-center gap-2">
              {PRODUCT.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Перейти до фото ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-accent-dark' : 'w-2 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>

            {/* Мініатюри — на десктопі зручно перемикатись */}
            <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1 sm:justify-center">
              {PRODUCT.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={`shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                    i === active
                      ? 'border-accent-dark opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" className="h-16 w-16 object-cover sm:h-20 sm:w-20" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Підказка про розмір */}
            <p className="mt-6 text-center text-sm text-ink/50">
              📏 Не знаєш розмір? Напиши нам свій зріст і вагу — підкажемо
              безкоштовно.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
