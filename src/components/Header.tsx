// ============================================================
// Header — фіксована шапка: логотип + перемикач мови + кнопка замовлення
// ============================================================
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useLanguage()
  // Чи прокручена сторінка (для ефекту «скляної» шапки)
  const [scrolled, setScrolled] = useState(false)

  // Слухаємо скрол
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
        {/* Логотип */}
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg font-black text-ink">
            M
          </span>
          <span className="font-display text-sm font-bold tracking-wide text-cream sm:text-base">
            MIST<span className="text-accent">.UA</span>
          </span>
        </a>

        {/* Права частина: Перемикач мови поруч із кнопкою замовлення */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          {/* CTA — веде до форми замовлення */}
          <a
            href="#order"
            className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-ink shadow-lg shadow-accent/25 hover:bg-accent-dark sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {t.header.order}
          </a>
        </div>
      </div>
    </header>
  )
}
