// ============================================================
// FAQ — акордеон із частими питаннями
// ============================================================
import { useState } from 'react'
import { FAQS } from '../data/product'
import { Reveal } from './Reveal'

export function Faq() {
  // Індекс відкритого питання (null = все закрито)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Заголовок секції */}
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-ink/50 uppercase">
              FAQ
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              Часті <span className="text-accent-dark">питання</span>
            </h2>
          </div>
        </Reveal>

        {/* Список питань-відповідей */}
        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={item.id} delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? 'border-accent-dark/50 bg-accent/5' : 'border-ink/10 bg-cream/50'
                  }`}
                >
                  {/* Клікабельний заголовок питання */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-bold sm:text-lg">{item.question}</span>
                    {/* Іконка «+» / «×» */}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-accent text-ink'
                          : 'bg-ink/10 text-ink'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Відповідь — плавно розгортається через grid-трюк */}
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
