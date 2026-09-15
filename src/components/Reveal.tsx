// ============================================================
// Reveal — обгортка, яка плавно показує контент при скролі.
// Використання: <Reveal delay={150}>...</Reveal>
// ============================================================
import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: ReactNode
  /** Затримка анімації, мс (для каскадної появи карток) */
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
