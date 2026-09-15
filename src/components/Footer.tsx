// ============================================================
// Footer — підвал: бренд, контакти, способи оплати, копірайт
// ============================================================

export function Footer() {
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
              Український бренд oversize-одягу. Виробляємо власними силами,
              відправляємо по всій Україні.
            </p>
          </div>

          {/* Навігація по сторінці */}
          <nav aria-label="Навігація">
            <h3 className="text-sm font-bold text-cream">Розділи</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#benefits" className="hover:text-accent">Переваги</a></li>
              <li><a href="#gallery" className="hover:text-accent">Галерея</a></li>
              <li><a href="#reviews" className="hover:text-accent">Відгуки</a></li>
              <li><a href="#faq" className="hover:text-accent">Питання</a></li>
              <li><a href="#order" className="hover:text-accent">Замовити</a></li>
            </ul>
          </nav>

          {/* Контакти — заміни на свої реальні посилання */}
          <div>
            <h3 className="text-sm font-bold text-cream">Контакти</h3>
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
            <h3 className="text-sm font-bold text-cream">Оплата та доставка</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>💳 LiqPay / Fondy / WayForPay</li>
              <li>📦 Оплата при отриманні</li>
              <li>🚚 Нова пошта — 1–3 дні</li>
            </ul>
          </div>
        </div>

        {/* Нижній рядок */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} MIST.UA. Всі права захищено.</p>
          <p>
            Зроблено з ❤️ в Україні · Шаблон лендінгу для дропшипінгу
          </p>
        </div>
      </div>
    </footer>
  )
}
