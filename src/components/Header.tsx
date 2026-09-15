// ============================================================
// Header — фіксована шапка: логотип + кнопка «Замовити»
// ============================================================
import { useEffect, useState } from 'react'

export function Header() {
  // Чи прокручена сторінка (для ефекту «скляної» шапки)
  const [scrolled, setScrolled] = useState(false)

  // Слухаємо скрол — це найпростіший спосіб без бібліотек
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/90 shadow-lg shadow-black/10 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Логотип — заміни на свій бренд */}
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg font-black text-ink">
            M
          </span>
          <span
            className={`font-display text-sm font-bold tracking-wide sm:text-base ${
              scrolled ? 'text-cream' : 'text-ink'
            }`}
          >
            MIST<span className="text-accent">.UA</span>
          </span>
        </a>

        {/* CTA — веде до форми замовлення */}
        <a
          href="#order"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-ink shadow-lg shadow-accent/25 hover:bg-accent-dark"
        >
          Замовити
        </a>
      </div>
    </header>
  )
}
