import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import { LANGUAGES, translations } from './translations'
import type { Language } from './types'

const STORAGE_KEY = 'dropship_landing_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'uk') {
        return stored
      }
    }
    // English is the default language
    return 'en'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch {
      // Ignore storage errors if private mode/disabled
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
    const metaDesc = document.querySelector('meta[name="description"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    const ogTitle = document.querySelector('meta[property="og:title"]')

    if (lang === 'uk') {
      const title = 'Худі Oversize «MIST» — замовити з доставкою по Україні'
      const desc =
        'Худі oversize «MIST» — щільний футер 400 г/м², доставка 1–3 дні по Україні, оплата при отриманні.'
      document.title = title
      if (metaDesc) metaDesc.setAttribute('content', desc)
      if (ogDesc) ogDesc.setAttribute('content', desc)
      if (ogTitle) ogTitle.setAttribute('content', title)
    } else {
      const title = 'MIST Oversize Hoodie — Premium Streetwear with Delivery'
      const desc =
        'MIST Oversize Hoodie — heavyweight 400 g/m² fleece, 1–3 days delivery, cash on delivery.'
      document.title = title
      if (metaDesc) metaDesc.setAttribute('content', desc)
      if (ogDesc) ogDesc.setAttribute('content', desc)
      if (ogTitle) ogTitle.setAttribute('content', title)
    }
  }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        product: t.product,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
