// ============================================================
// Reviews — відгуки покупців (сітка карток з рейтингом)
// ============================================================
import { useLanguage } from '../i18n'
import { Reveal } from './Reveal'

/** Маленький компонент зірок рейтингу (0–5) */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      className="flex gap-0.5"
      aria-label={`Rating ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i < rating ? 'text-amber-400' : 'text-ink/15'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export function Reviews() {
  const { t } = useLanguage()

  return (
    <section id="reviews" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Заголовок секції */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-widest text-ink/50 uppercase">
              {t.reviews.subtitle}
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              {t.reviews.titlePrefix}
              <span className="text-accent-dark">{t.reviews.titleAccent}</span>
            </h2>
            <p className="mt-3 text-ink/60">
              {t.reviews.averageScore}
            </p>
          </div>
        </Reveal>

        {/* Сітка відгуків */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.reviews.items.map((review, i) => (
            <Reveal key={review.id} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-6 shadow-sm">
                {/* Аватар з ініціалом */}
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-sm font-extrabold text-accent">
                    {review.name[0]}
                  </span>
                  <figcaption>
                    <p className="text-sm font-extrabold">{review.name}</p>
                    <p className="text-xs text-ink/50">{review.city}</p>
                  </figcaption>
                  {/* Бейдж «покупка підтверджена» */}
                  {review.verified && (
                    <span
                      className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700"
                      title={t.reviews.verifiedBadge}
                    >
                      {t.reviews.verifiedBadge}
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <Stars rating={review.rating} />
                </div>

                <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
                  {review.text}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
