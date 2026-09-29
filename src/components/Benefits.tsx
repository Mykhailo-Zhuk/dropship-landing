// ============================================================
// Benefits — блок «Чому обирають нас» (сітка з 4 карток)
// ============================================================
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

export function Benefits() {
  const { t } = useLanguage()

  return (
    <section id="benefits" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Заголовок секції */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-widest text-ink/50 uppercase">
              {t.benefits.subtitle}
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              {t.benefits.titlePrefix}
              <span className="text-accent-dark">{t.benefits.titleAccent}</span>
            </h2>
          </div>
        </Reveal>

        {/* Сітка переваг */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((benefit, i) => (
            <Reveal key={benefit.id} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-ink/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {benefit.icon}
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {benefit.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
