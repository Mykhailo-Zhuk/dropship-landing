// ============================================================
// Gallery — слайдер фото товару
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

export function Gallery() {
  const { t, product } = useLanguage()
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = product.images.length

  // Координата X початку дотику (для свайпів)
  const touchStartX = useRef<number | null>(null)

  /** Перехід до наступного фото (з зацикленням) */
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total])

  /** Перехід до попереднього фото */
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total])

  // Автопрокрутка: спрацьовує кожні 5 секунд
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, isPaused])

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
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
              {t.gallery.subtitle}
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              {t.gallery.titlePrefix}
              <span className="text-accent-dark">{t.gallery.titleAccent}</span>
            </h2>
            <p className="mt-3 text-ink/60">{t.gallery.hint}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl">
            {/* Головний слайд */}
            <div
              className="relative overflow-hidden rounded-3xl border border-ink/5 shadow-xl shadow-ink/10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Фото з ефектом перемикання (fade) */}
              {product.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${product.name} — ${i + 1}`}
                  className={`aspect-[4/5] w-full object-cover transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                  }`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}

              {/* Лічильник «2 / 5» */}
              <span className="absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-cream backdrop-blur-sm">
                {t.gallery.counter(active + 1, total)}
              </span>

              {/* Стрілка «назад» */}
              <button
                type="button"
                onClick={prev}
                aria-label={t.gallery.prevAria}
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl font-bold text-ink shadow-lg backdrop-blur-sm hover:bg-accent"
              >
                ‹
              </button>
              {/* Стрілка «вперед» */}
              <button
                type="button"
                onClick={next}
                aria-label={t.gallery.nextAria}
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-xl font-bold text-ink shadow-lg backdrop-blur-sm hover:bg-accent"
              >
                ›
              </button>
            </div>

            {/* Точки-індикатори */}
            <div className="mt-4 flex justify-center gap-2">
              {product.images.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={t.gallery.photoAria(i + 1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-accent-dark' : 'w-2 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>

            {/* Мініатюри */}
            <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1 sm:justify-center">
              {product.images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={t.gallery.photoAria(i + 1)}
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
              {t.gallery.sizeTip}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
