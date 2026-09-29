// ============================================================
// OrderForm — форма замовлення
// ============================================================
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n'
import { createPayment } from '../lib/payment'
import type { OrderData } from '../types'
import { Reveal } from './Reveal'

export function OrderForm() {
  const { t, product, lang } = useLanguage()
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US'

  const [order, setOrder] = useState<OrderData>({
    name: '',
    phone: '',
    size: '',
    color: product.colors[0],
    city: '',
    postOffice: '',
    paymentMethod: 'cod',
    quantity: 1,
  })

  // Оновлюємо колір при зміні мови, якщо поточний колір не знайдено в списку
  useEffect(() => {
    if (!product.colors.includes(order.color ?? '')) {
      setOrder((prev) => ({ ...prev, color: product.colors[0] }))
    }
  }, [product.colors, order.color])

  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  // Перевірка повернення після оплати (якщо провайдер або заглушка повернули в хеш)
  useEffect(() => {
    if (
      window.location.hash === '#payment-success' ||
      window.location.hash === '#order-success'
    ) {
      setSuccess(true)
    }
  }, [])

  /** Оновлення одного поля форми */
  const update = (field: keyof OrderData, value: string | number) =>
    setOrder((o) => ({ ...o, [field]: value }))

  /** Валідація: обов'язкові поля заповнені, телефон коректний */
  const validate = (): string => {
    if (order.name.trim().length < 2) return t.order.errors.name
    const rawDigits = order.phone.replace(/\D/g, '')
    const validFormat = /^[+\d\s().-]+$/.test(order.phone.trim())
    if (!validFormat || rawDigits.length < 10 || rawDigits.length > 15)
      return t.order.errors.phone
    if (!order.size) return t.order.errors.size
    if (order.city.trim().length < 2) return t.order.errors.city
    if (order.postOffice.trim().length < 2) return t.order.errors.postOffice
    return ''
  }

  /** Обробник відправки форми */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSending(true)
    try {
      if (order.paymentMethod === 'card') {
        const payment = await createPayment(order)
        if (
          payment.url.startsWith('http://') ||
          payment.url.startsWith('https://')
        ) {
          window.location.href = payment.url
          return
        }
        window.location.hash = payment.url
        setSuccess(true)
        return
      }

      console.info('[order] New order:', order)
      await new Promise((r) => setTimeout(r, 500))
      setSuccess(true)
    } catch {
      setError(t.order.errors.generic)
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-accent-dark focus:ring-2 focus:ring-accent/40'

  return (
    <section id="order" className="bg-ink py-16 text-cream sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Ліва колонка — мотиваційний блок */}
          <Reveal>
            <div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">
                {t.order.subtitle}
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
                {t.order.title}
              </h2>
              <ul className="mt-6 space-y-4 text-cream/80">
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    1
                  </span>
                  <p>{t.order.step1}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    2
                  </span>
                  <p>{t.order.step2}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    3
                  </span>
                  <p>{t.order.step3}</p>
                </li>
              </ul>

              {/* Ціна та кількість */}
              <div className="mt-8 rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-cream/60">{t.order.pricePerItem}</span>
                  <span className="font-display text-xl font-bold text-accent">
                    {product.price.toLocaleString(locale)} ₴
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-cream/60">{t.order.quantity}</span>
                  {/* Степпер кількості */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        update('quantity', Math.max(1, order.quantity - 1))
                      }
                      aria-label={t.order.decreaseQtyAria}
                      className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-lg font-bold hover:bg-accent hover:text-ink"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold">
                      {order.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => update('quantity', order.quantity + 1)}
                      aria-label={t.order.increaseQtyAria}
                      className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-lg font-bold hover:bg-accent hover:text-ink"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-4">
                  <span className="font-bold">{t.order.total}</span>
                  <span className="font-display text-2xl font-bold text-accent">
                    {(product.price * order.quantity).toLocaleString(locale)} ₴
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Права колонка — сама форма */}
          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-cream p-6 text-ink shadow-2xl sm:p-8"
            >
              {/* Стан успіху — замінює форму після замовлення */}
              {success ? (
                <div className="py-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-3xl">
                    ✅
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold">
                    {t.order.successTitle}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
                    {t.order.successDesc(order.name || '')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false)
                      setOrder({
                        name: '',
                        phone: '',
                        size: '',
                        color: product.colors[0],
                        city: '',
                        postOffice: '',
                        paymentMethod: 'cod',
                        quantity: 1,
                      })
                    }}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream hover:bg-ink/80"
                  >
                    {t.order.orderAgainBtn}
                  </button>
                </div>
              ) : (
                <>
                  {/* Поле: ім'я */}
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold">
                      {t.order.nameLabel}
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={order.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder={t.order.namePlaceholder}
                      className={inputCls}
                      autoComplete="name"
                      required
                    />
                  </label>

                  {/* Поле: телефон */}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-bold">
                      {t.order.phoneLabel}
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={order.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder={t.order.phonePlaceholder}
                      className={inputCls}
                      autoComplete="tel"
                      required
                    />
                  </label>

                  {/* Розмір + колір в один рядок */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">
                        {t.order.sizeLabel}
                      </span>
                      <select
                        name="size"
                        value={order.size}
                        onChange={(e) => update('size', e.target.value)}
                        className={inputCls}
                        required
                      >
                        <option value="">{t.order.sizeSelectPlaceholder}</option>
                        {product.sizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">
                        {t.order.colorLabel}
                      </span>
                      <select
                        name="color"
                        value={order.color}
                        onChange={(e) => update('color', e.target.value)}
                        className={inputCls}
                      >
                        {product.colors.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Поле: місто */}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-bold">
                      {t.order.cityLabel}
                    </span>
                    <input
                      type="text"
                      name="city"
                      value={order.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder={t.order.cityPlaceholder}
                      className={inputCls}
                      autoComplete="address-level2"
                      required
                    />
                  </label>

                  {/* Поле: відділення */}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-bold">
                      {t.order.postOfficeLabel}
                    </span>
                    <input
                      type="text"
                      name="postOffice"
                      value={order.postOffice}
                      onChange={(e) => update('postOffice', e.target.value)}
                      placeholder={t.order.postOfficePlaceholder}
                      className={inputCls}
                      required
                    />
                  </label>

                  {/* Спосіб оплати */}
                  <div className="mt-4">
                    <span className="mb-1.5 block text-sm font-bold">
                      {t.order.paymentLabel}
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-bold transition-colors ${
                          order.paymentMethod === 'card'
                            ? 'border-accent-dark bg-accent/15'
                            : 'border-ink/15 bg-white hover:border-ink/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={order.paymentMethod === 'card'}
                          onChange={() => update('paymentMethod', 'card')}
                          className="sr-only"
                        />
                        {t.order.payCard}
                      </label>
                      <label
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-bold transition-colors ${
                          order.paymentMethod === 'cod'
                            ? 'border-accent-dark bg-accent/15'
                            : 'border-ink/15 bg-white hover:border-ink/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={order.paymentMethod === 'cod'}
                          onChange={() => update('paymentMethod', 'cod')}
                          className="sr-only"
                        />
                        {t.order.payCod}
                      </label>
                    </div>
                    {order.paymentMethod === 'card' && (
                      <p className="mt-2 text-xs text-ink/50">
                        {t.order.payCardNote}
                      </p>
                    )}
                  </div>

                  {/* Помилка валідації */}
                  {error && (
                    <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      ⚠️ {error}
                    </p>
                  )}

                  {/* Кнопка відправки */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 w-full rounded-full bg-accent px-8 py-4 text-base font-extrabold text-ink shadow-lg shadow-accent/25 hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending
                      ? t.order.submitting
                      : t.order.submitBtn(
                          (product.price * order.quantity).toLocaleString(locale)
                        )}
                  </button>

                  <p className="mt-3 text-center text-xs text-ink/45">
                    {t.order.termsText}
                  </p>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
