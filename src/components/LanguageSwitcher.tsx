import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'

export function LanguageSwitcher() {
  const { lang, setLang, languages, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentOption =
    languages.find((item) => item.id === lang) ?? languages[0]

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t.header.languageSwitcherAria}
        className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/10 px-3 py-1.5 text-xs font-bold text-cream backdrop-blur-md transition-all duration-200 hover:border-accent/60 hover:bg-cream/20 focus:outline-none focus:ring-2 focus:ring-accent/50 sm:px-3.5 sm:py-2 sm:text-sm"
      >
        <span className="text-sm sm:text-base" role="img" aria-hidden="true">
          {currentOption.flag}
        </span>
        <span className="tracking-wider">{currentOption.code}</span>
        <svg
          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent' : 'text-cream/70'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t.header.languageSwitcherAria}
          className="absolute right-0 top-full mt-2 w-40 origin-top-right overflow-hidden rounded-2xl border border-cream/15 bg-ink/95 p-1.5 shadow-2xl backdrop-blur-xl animate-fade-in-up z-50"
        >
          {languages.map((item) => {
            const isSelected = item.id === lang
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLang(item.id)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors sm:text-sm ${
                  isSelected
                    ? 'bg-accent font-bold text-ink shadow-sm'
                    : 'text-cream/80 hover:bg-cream/10 hover:text-cream'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-hidden="true">
                    {item.flag}
                  </span>
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <span
                    className="text-xs font-extrabold text-ink"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
