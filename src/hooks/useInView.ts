// ============================================================
// Хук useInView — відстежує, коли елемент з'являється у в'юпорті
// (потрібен для анімації появи секцій при скролі)
// ============================================================
import { useEffect, useRef, useState } from 'react'

/**
 * Повертає ref для елемента та boolean «чи елемент у в'юпорті».
 * Спрацьовує один раз (після появи елемент лишається видимим).
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback для дуже старих браузерів — показуємо одразу
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
