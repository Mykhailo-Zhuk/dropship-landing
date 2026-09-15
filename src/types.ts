// ============================================================
// Типи даних лендінгу
// ============================================================

/** Товар, який продаємо на лендінгу */
export interface Product {
  id: string
  /** Назва товару */
  name: string
  /** Короткий опис для Hero-секції */
  tagline: string
  /** Повний опис */
  description: string
  /** Ціна у гривнях */
  price: number
  /** Стара ціна (для знижки) */
  oldPrice?: number
  /** Доступні розміри */
  sizes: string[]
  /** Доступні кольори */
  colors: string[]
  /** Шляхи до фото товару (папка public/img) */
  images: string[]
  /** Склад тканини */
  material: string
  /** Час доставки */
  deliveryTime: string
}

/** Відгук покупця */
export interface Review {
  id: number
  /** Ім'я покупця */
  name: string
  /** Місто */
  city: string
  /** Оцінка від 1 до 5 */
  rating: number
  /** Текст відгуку */
  text: string
  /** Чи підтверджена покупка */
  verified: boolean
}

/** Питання для FAQ-акордеону */
export interface FaqItem {
  id: number
  question: string
  answer: string
}

/** Перевага товару / магазину */
export interface Benefit {
  id: number
  /** Emoji-іконка (у шаблоні) */
  icon: string
  title: string
  text: string
}

/** Дані замовлення з форми */
export interface OrderData {
  /** Ім'я покупця */
  name: string
  /** Номер телефону */
  phone: string
  /** Розмір одягу */
  size: string
  /** Колір (необов'язково) */
  color?: string
  /** Місто для Нової пошти */
  city: string
  /** Відділення Нової пошти */
  postOffice: string
  /** Спосіб оплати */
  paymentMethod: 'card' | 'cod'
  /** Кількість одиниць */
  quantity: number
}
