// ============================================================
// Hero — перший екран: заголовок, ціна, CTA та фото товару
// ============================================================
import { useLanguage } from '../i18n'

export function Hero() {
  const { t, product, lang } = useLanguage()
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US'

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-cream">
      {/* Декоративні градієнти на фоні */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pt-36 lg:pb-24">
        {/* Ліва колонка — текст */}
        <div className="text-center lg:text-left">
          {/* Бейдж хіта продажів */}
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-wide text-accent uppercase">
            {t.hero.badge}
          </span>

          {/* Заголовок — головний смисловий акцент */}
          <h1 className="animate-fade-in-up animation-delay-150 font-display mt-5 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            {t.hero.tagline}
            <span className="mt-1 block text-accent">{t.hero.taglineAccent}</span>
          </h1>

          {/* Короткий опис */}
          <p className="animate-fade-in-up animation-delay-300 mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg lg:mx-0">
            {t.hero.description}
          </p>

          {/* Ціна та стара ціна */}
          <div className="animate-fade-in-up animation-delay-300 mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="font-display text-4xl font-bold text-accent">
              {product.price.toLocaleString(locale)} ₴
            </span>
            {product.oldPrice && (
              <span className="text-lg text-cream/40 line-through">
                {product.oldPrice.toLocaleString(locale)} ₴
              </span>
            )}
            <span className="rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white">
              -32%
            </span>
          </div>

          {/* CTA-кнопки */}
          <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#order"
              className="w-full rounded-full bg-accent px-8 py-4 text-center text-base font-extrabold text-ink shadow-xl shadow-accent/30 hover:-translate-y-0.5 hover:bg-accent-dark sm:w-auto"
            >
              {t.hero.orderCta}
            </a>
            <a
              href="#gallery"
              className="w-full rounded-full border-2 border-cream/20 px-8 py-4 text-center text-base font-bold text-cream hover:border-accent hover:text-accent sm:w-auto"
            >
              {t.hero.viewPhotosCta}
            </a>
          </div>

          {/* Соціальні докази під CTA */}
          <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/60 lg:justify-start">
            <span>{t.hero.socialReviews}</span>
            <span>{t.hero.socialDelivery}</span>
            <span>{t.hero.socialPayment}</span>
          </div>
        </div>

        {/* Права колонка — фото товару */}
        <div className="animate-fade-in-up animation-delay-300 relative mx-auto w-full max-w-md">
          <img
            src={product.images[0]}
            alt={product.name}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full rounded-3xl border border-cream/10 object-cover shadow-2xl shadow-black/50"
            loading="eager"
          />
          {/* Плаваюча картка з матеріалом */}
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 text-ink shadow-xl">
            <span className="text-2xl">🧵</span>
            <div>
              <p className="text-xs font-bold">{t.hero.materialBadgeTitle}</p>
              <p className="text-[11px] text-ink/60">{t.hero.materialBadgeDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
