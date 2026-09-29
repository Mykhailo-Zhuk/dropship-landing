// ============================================================
// Footer — підвал: бренд, контакти, способи оплати, копірайт
// ============================================================
import { useLanguage } from '../i18n'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-cream/10 bg-ink py-12 text-cream/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg font-black text-ink">
                M
              </span>
              <span className="font-display text-sm font-bold text-cream">
                MIST<span className="text-accent">.UA</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Навігація по сторінці */}
          <nav aria-label={t.footer.sectionsTitle}>
            <h3 className="text-sm font-bold text-cream">{t.footer.sectionsTitle}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#benefits" className="hover:text-accent">
                  {t.footer.navBenefits}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-accent">
                  {t.footer.navGallery}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-accent">
                  {t.footer.navReviews}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent">
                  {t.footer.navFaq}
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-accent">
                  {t.footer.navOrder}
                </a>
              </li>
            </ul>
          </nav>

          {/* Контакти */}
          <div>
            <h3 className="text-sm font-bold text-cream">{t.footer.contactsTitle}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://t.me/your_brand" className="hover:text-accent">
                  ✈️ Telegram
                </a>
              </li>
              <li>
                <a href="https://instagram.com/your_brand" className="hover:text-accent">
                  📸 Instagram
                </a>
              </li>
              <li>
                <a href="tel:+380000000000" className="hover:text-accent">
                  📞 0 800 000 000
                </a>
              </li>
            </ul>
          </div>

          {/* Способи оплати та доставка */}
          <div>
            <h3 className="text-sm font-bold text-cream">
              {t.footer.paymentDeliveryTitle}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{t.footer.payCard}</li>
              <li>{t.footer.payCod}</li>
              <li>{t.footer.deliveryNp}</li>
            </ul>
          </div>
        </div>

        {/* Нижній рядок */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
