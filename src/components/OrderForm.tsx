// ============================================================
// OrderForm — форма замовлення
// ------------------------------------------------------------
// Поля: ім'я, телефон, розмір, колір, місто та відділення
// Нової пошти, спосіб оплати (картка онлайн / при отриманні).
//
// Після сабміту:
//  - дані валідуються (проста перевірка + маска телефону);
//  - якщо обрано «Карткою онлайн» — викликається createPayment()
//    із src/lib/payment.ts (заглушка) і робиться redirect;
//  - якщо «При отриманні» — замовлення вважається створеним.
//
// Щоб зберігати замовлення, додай виклик свого бекенду:
//   await fetch('/api/order', { method: 'POST', body: JSON.stringify(order) })
// ============================================================
import { useState } from 'react'
import { PRODUCT } from '../data/product'
import { createPayment } from '../lib/payment'
import type { OrderData } from '../types'
import { Reveal } from './Reveal'

/** Початковий стан форми */
const initialOrder: OrderData = {
  name: '',
  phone: '',
  size: '',
  color: PRODUCT.colors[0],
  city: '',
  postOffice: '',
  paymentMethod: 'cod',
  quantity: 1,
}

export function OrderForm() {
  const [order, setOrder] = useState<OrderData>(initialOrder)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  /** Оновлення одного поля форми */
  const update = (field: keyof OrderData, value: string | number) =>
    setOrder((o) => ({ ...o, [field]: value }))

  /** Проста валідація: обов'язкові поля заповнені, телефон коректний */
  const validate = (): string => {
    if (order.name.trim().length < 2) return 'Вкажи своє ім’я'
    if (!/^\+?[\d\s()-]{10,17}$/.test(order.phone.trim()))
      return 'Вкажи коректний номер телефону, наприклад 067 123 45 67'
    if (!order.size) return 'Обери розмір'
    if (order.city.trim().length < 2) return 'Вкажи місто'
    if (order.postOffice.trim().length < 2) return 'Вкажи відділення Нової пошти'
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
        // Оплата карткою онлайн — створюємо платіж у платіжки
        // (заглушка; реальна інтеграція — див. src/lib/payment.ts)
        const payment = await createPayment(order)
        // Редирект на платіжну сторінку провайдера
        window.location.href = payment.url
        return
      }

      // Оплата при отриманні — просто показуємо успіх.
      // TODO: тут відправ замовлення на бекенд / у Telegram-бот.
      console.info('[order] Нове замовлення:', order)
      await new Promise((r) => setTimeout(r, 500)) // імітація запиту
      setSuccess(true)
    } catch {
      setError('Щось пішло не так. Спробуй ще раз або напиши нам у Telegram.')
    } finally {
      setSending(false)
    }
  }

  /** Спільні класи для полів вводу */
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
                Оформлення замовлення
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
                Замовляй за 1 хвилину
              </h2>
              <ul className="mt-6 space-y-4 text-cream/80">
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    1
                  </span>
                  <p>
                    Заповни форму — ми зателефонуємо для підтвердження протягом
                    15 хвилин.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    2
                  </span>
                  <p>
                    Відправимо Новою поштою у день замовлення. Доставка 1–3 дні.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                    3
                  </span>
                  <p>
                    Оплати при отриманні або карткою онлайн — як зручніше.
                  </p>
                </li>
              </ul>

              {/* Ціна та кількість */}
              <div className="mt-8 rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-cream/60">Ціна за 1 шт:</span>
                  <span className="font-display text-xl font-bold text-accent">
                    {PRODUCT.price.toLocaleString('uk-UA')} ₴
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-cream/60">Кількість:</span>
                  {/* Степпер кількості */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        update('quantity', Math.max(1, order.quantity - 1))
                      }
                      aria-label="Зменшити кількість"
                      className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-lg font-bold hover:bg-accent hover:text-ink"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold">{order.quantity}</span>
                    <button
                      type="button"
                      onClick={() => update('quantity', order.quantity + 1)}
                      aria-label="Збільшити кількість"
                      className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-lg font-bold hover:bg-accent hover:text-ink"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-4">
                  <span className="font-bold">Разом:</span>
                  <span className="font-display text-2xl font-bold text-accent">
                    {(PRODUCT.price * order.quantity).toLocaleString('uk-UA')} ₴
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
                    Замовлення прийнято!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
                    Дякуємо, {order.name}! Ми зателефонуємо тобі протягом 15
                    хвилин для підтвердження. Трек-номер надішлемо в SMS.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false)
                      setOrder(initialOrder)
                    }}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream hover:bg-ink/80"
                  >
                    Оформити ще одне замовлення
                  </button>
                </div>
              ) : (
                <>
                  {/* Поле: ім'я */}
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold">Ім'я *</span>
                    <input
                      type="text"
                      value={order.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Тарас"
                      className={inputCls}
                      autoComplete="name"
                    />
                  </label>

                  {/* Поле: телефон */}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-bold">
                      Телефон *
                    </span>
                    <input
                      type="tel"
                      value={order.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="067 123 45 67"
                      className={inputCls}
                      autoComplete="tel"
                    />
                  </label>

                  {/* Розмір + колір в один рядок */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">Розмір *</span>
                      <select
                        value={order.size}
                        onChange={(e) => update('size', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Обери…</option>
                        {PRODUCT.sizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-bold">Колір</span>
                      <select
                        value={order.color}
                        onChange={(e) => update('color', e.target.value)}
                        className={inputCls}
                      >
                        {PRODUCT.colors.map((c) => (
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
                      Місто (Нова пошта) *
                    </span>
                    <input
                      type="text"
                      value={order.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Київ"
                      className={inputCls}
                      autoComplete="address-level2"
                    />
                  </label>

                  {/* Поле: відділення */}
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-bold">
                      Відділення Нової пошти *
                    </span>
                    <input
                      type="text"
                      value={order.postOffice}
                      onChange={(e) => update('postOffice', e.target.value)}
                      placeholder="№ 123, вул. Хрещатик, 1"
                      className={inputCls}
                    />
                  </label>

                  {/* Спосіб оплати */}
                  <div className="mt-4">
                    <span className="mb-1.5 block text-sm font-bold">
                      Спосіб оплати
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
                        💳 Карткою онлайн
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
                        📦 При отриманні
                      </label>
                    </div>
                    {order.paymentMethod === 'card' && (
                      <p className="mt-2 text-xs text-ink/50">
                        Оплата через LiqPay / Fondy / WayForPay — захищене
                        з'єднання. Підключення описане у{' '}
                        <code className="rounded bg-ink/5 px-1">src/lib/payment.ts</code>.
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
                    {sending ? 'Обробляємо…' : `Замовити за ${(PRODUCT.price * order.quantity).toLocaleString('uk-UA')} ₴`}
                  </button>

                  <p className="mt-3 text-center text-xs text-ink/45">
                    Натискаючи кнопку, ти погоджуєшся з умовами обробки
                    персональних даних.
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
