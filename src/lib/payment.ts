// ============================================================
// Інтеграція оплати: LiqPay / Fondy / WayForPay (ЗАГЛУШКА)
// ------------------------------------------------------------
// Цей файл містить заглушку, яка імітує створення платежу.
// Щоб підключити реальну платіжку — розкоментуй блок нижче
// відповідного провайдера та встав свої merchant-дані.
//
// Як це працює (загальна схема для всіх провайдерів):
//   1. Фронтенд надсилає дані замовлення на ТВІЙ бекенд
//      (наприклад, Vercel Serverless Function, див. /api).
//   2. Бекенд створює платіж у провайдера та повертає
//      checkout-URL (посилання на платіжну сторінку).
//   3. Фронтенд робить redirect на цей URL.
//   4. Після оплати провайдер повертає користувача на
//      сторінку успіху (callback / redirect URL).
//
// ⚠️ НІКОЛИ не зберігай секретний ключ (private key) у коді
//    фронтенду — тільки у змінних оточення на бекенді!
// ============================================================

import type { OrderData } from '../types'

/** Результат створення платежу */
export interface PaymentResult {
  /** Посилання на платіжну сторінку (для редиректу) */
  url: string
  /** ID платежу у провайдера */
  paymentId: string
}

/**
 * Створює платіж для замовлення.
 *
 * У шаблоні це ЗАГЛУШКА: повертає фейкове посилання,
 * щоб лендінг можна було запустити без бекенду.
 */
export async function createPayment(order: OrderData): Promise<PaymentResult> {
  // TODO: тут має бути виклик ТВОГО бекенду, наприклад:
  //
  //   const res = await fetch('/api/create-payment', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(order),
  //   })
  //   return await res.json()
  //
  // Приклад реалізації бекенду для кожного провайдера — нижче.

  console.info('[payment] Заглушка: створюю платіж для', order.name)
  await new Promise((r) => setTimeout(r, 600)) // імітуємо мережевий запит

  return {
    url: '#payment-success', // у реальному проєкті тут буде checkout-URL провайдера
    paymentId: `MOCK-${Date.now()}`,
  }
}

// ============================================================
// ПРИКЛАДИ РЕАЛЬНОЇ ІНТЕГРАЦІЇ (для бекенду, Node.js)
// ============================================================

/**
 * 1) LIQPAY — https://www.liqpay.ua
 * -----------------------------------
 * Реєстрація: кабінет LiqPay → «Налаштування» → Public key / Private key
 * Документація: https://www.liqpay.ua/documentation/api/aquiring/checkout
 *
 * Приклад (Node.js, бібліотека liqpay-sdk або власний запит):
 *
 *   const crypto = require('crypto')
 *   const publicKey = process.env.LIQPAY_PUBLIC_KEY   // «sandbox_...» у тестовому режимі
 *   const privateKey = process.env.LIQPAY_PRIVATE_KEY
 *
 *   const data = Buffer.from(JSON.stringify({
 *     public_key: publicKey,
 *     version: 3,
 *     action: 'pay',
 *     amount: orderTotal,
 *     currency: 'UAH',
 *     description: `Замовлення #${orderId}: ${productName}`,
 *     order_id: orderId,
 *     // серверний callback — сюди LiqPay пришле статус оплати:
 *     server_url: 'https://ТВІЙ-ДОМЕН/api/liqpay/callback',
 *     // куди повернути покупця після оплати:
 *     result_url: 'https://ТВІЙ-ДОМЕН/#order-success',
 *     // sandbox: 1, // увімкнути тестовий режим
 *   })).toString('base64')
 *
 *   const signature = crypto
 *     .createHash('sha1')
 *     .update(privateKey + data + privateKey)
 *     .digest('base64')
 *
 *   // Поверни клієнту HTML-форму або URL:
 *   // https://www.liqpay.ua/api/3/checkout?data=...&signature=...
 */

/**
 * 2) FONDY — https://fondy.eu (український еквайринг)
 * ---------------------------------------------------
 * Реєстрація: кабінет Fondy → Merchant ID + Secret key
 * Документація: https://docs.fondy.eu
 *
 * Приклад (Node.js):
 *
 *   const merchantId = process.env.FONDY_MERCHANT_ID
 *   const secretKey  = process.env.FONDY_SECRET_KEY
 *
 *   const res = await fetch('https://api.fondy.eu/api/checkout/url', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       merchant_id: merchantId,
 *       order_id: orderId,
 *       order_desc: `Замовлення #${orderId}`,
 *       amount: Math.round(orderTotal * 100), // у копійках!
 *       currency: 'UAH',
 *       signature: ..., // md5(secret_key|...|secret_key), див. docs.fondy.eu
 *       response_url: 'https://ТВІЙ-ДОМЕН/#order-success',
 *       server_callback_url: 'https://ТВІЙ-ДОМЕН/api/fondy/callback',
 *     }),
 *   })
 *   const { checkout_url } = await res.json() // → redirect на це посилання
 */

/**
 * 3) WAYFORPAY — https://wayforpay.com
 * ------------------------------------
 * Реєстрація: кабінет WayForPay → Merchant Account + Secret key
 * Документація: https://wiki.wayforpay.com
 *
 * Приклад (Node.js):
 *
 *   const merchantAccount = process.env.WFP_MERCHANT_ACCOUNT
 *   const secretKey        = process.env.WFP_SECRET_KEY
 *
 *   const res = await fetch('https://api.wayforpay.com/api', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       transactionType: 'CREATE_INVOICE',
 *       merchantAccount,
 *       merchantDomainName: 'ТВІЙ-ДОМЕН',
 *       orderReference: orderId,
 *       orderDate: Date.now(),
 *       amount: orderTotal,
 *       currency: 'UAH',
 *       productName: [productName],
 *       productPrice: [orderTotal],
 *       productCount: [1],
 *       merchantSignature: ..., // hmac_md5, див. wiki.wayforpay.com
 *       returnUrl: 'https://ТВІЙ-ДОМЕН/#order-success',
 *       serviceUrl: 'https://ТВІЙ-ДОМЕН/api/wayforpay/callback',
 *     }),
 *   })
 *   const { invoiceUrl } = await res.json() // → redirect на це посилання
 */
