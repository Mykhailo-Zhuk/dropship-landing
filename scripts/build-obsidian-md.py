#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Збирає /home/hermes/Obsidian/_inbox/dropship-landing-template.md
з реальних файлів проєкту dropship-landing (код у fenced-блоках).
"""
import os
from datetime import date

ROOT = '/home/hermes/dropship-landing'
OUT  = '/home/hermes/Obsidian/_inbox/dropship-landing-template.md'

# (шлях у проєкті, назва мови для підсвітки, короткий опис)
FILES = [
    ('package.json', 'json', 'Манифест залежностей і скрипти'),
    ('vite.config.ts', 'ts', 'Конфіг Vite + Tailwind v4'),
    ('tsconfig.json', 'json', 'Конфіг TypeScript'),
    ('index.html', 'html', 'HTML-обгортка: meta, шрифти, title'),
    ('src/main.tsx', 'tsx', 'Точка входу застосунку'),
    ('src/index.css', 'css', 'Тема Tailwind (кольори, шрифти), анімації'),
    ('src/App.tsx', 'tsx', 'Збірка всіх секцій лендінгу'),
    ('src/types.ts', 'ts', 'Типи даних (товар, відгук, замовлення)'),
    ('src/data/product.ts', 'ts', 'ВСІ тексти/ціни/відгуки — головний файл для редагування'),
    ('src/lib/payment.ts', 'ts', 'Заглушка оплати + приклади LiqPay/Fondy/WayForPay'),
    ('src/hooks/useInView.ts', 'ts', 'Хук появи елементів у в’юпорті'),
    ('src/components/Reveal.tsx', 'tsx', 'Обгортка анімації появи при скролі'),
    ('src/components/Header.tsx', 'tsx', 'Шапка з CTA'),
    ('src/components/Hero.tsx', 'tsx', 'Перший екран: заголовок, ціна, CTA'),
    ('src/components/Benefits.tsx', 'tsx', 'Переваги'),
    ('src/components/Gallery.tsx', 'tsx', 'Слайдер фото'),
    ('src/components/Reviews.tsx', 'tsx', 'Відгуки'),
    ('src/components/Faq.tsx', 'tsx', 'FAQ-акордеон'),
    ('src/components/OrderForm.tsx', 'tsx', 'Форма замовлення'),
    ('src/components/Footer.tsx', 'tsx', 'Підвал'),
    ('scripts/gen-placeholders.py', 'python', 'Генератор SVG-плейсхолдерів фото'),
]

def read(rel: str) -> str:
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read()

# Короткий опис структури папок (текстом, без код-блоку)
TREE = """```
dropship-landing/
├── public/
│   ├── img/                    # Фото товару (SVG-плейсхолдери, заміни на реальні)
│   │   ├── hoodie-1-front.svg  #   вид спереду (графіт)
│   │   ├── hoodie-2-back.svg   #   вид ззаду (чорний)
│   │   ├── hoodie-3-detail.svg #   крупний план тканини
│   │   ├── hoodie-4-color.svg  #   варіант кольору (пісочний)
│   │   └── hoodie-5-model.svg  #   худі на вішалці (олива)
│   └── favicon.svg
├── scripts/
│   └── gen-placeholders.py     # Генератор SVG-плейсхолдерів (python3)
├── src/
│   ├── components/             # Секції лендінгу (кожна — окремий компонент)
│   │   ├── Header.tsx          #   Фіксована «скляна» шапка з CTA
│   │   ├── Hero.tsx            #   Заголовок, ціна, 2 CTA, соц.докази
│   │   ├── Benefits.tsx        #   4 картки переваг
│   │   ├── Gallery.tsx         #   Слайдер: свайпи, стрілки, точки, мініатюри
│   │   ├── Reviews.tsx         #   Відгуки з рейтингом ★
│   │   ├── Faq.tsx             #   Акордеон питань
│   │   ├── OrderForm.tsx       #   Форма: ім'я, телефон, розмір, Нова пошта
│   │   ├── Footer.tsx          #   Контакти, оплата, копірайт
│   │   └── Reveal.tsx          #   Анімація появи при скролі
│   ├── data/
│   │   └── product.ts          # ⭐ ВСІ тексти, ціни, відгуки — редагуй тут
│   ├── hooks/
│   │   └── useInView.ts        # Хук IntersectionObserver
│   ├── lib/
│   │   └── payment.ts          # ⭐ Заглушка оплати + приклади інтеграції
│   ├── types.ts                # Типи TypeScript
│   ├── App.tsx                 # Збірка секцій
│   ├── main.tsx                # Точка входу
│   └── index.css               # Тема Tailwind v4, шрифти, анімації
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```"""

parts = []
parts.append(f"""---
title: "Лендінг-шаблон дропшипінг-магазину одягу (T2)"
aliases: [dropship-landing-template, mist-landing]
status: unread
tags: [dropship, landing, react, vite, typescript, tailwind, шаблон, ecommerce, веб-розробка]
date: {date.today().isoformat()}
---

# 🛍️ Лендінг-шаблон дропшипінг-магазину одягу (T2)

Готовий лендінг односторінкового магазину одягу (**худі oversize «MIST»**) на
**React + Vite + TypeScript + Tailwind CSS v4**. Мобільний-first, українською,
з усіма конверсійними секціями та заглушкою оплати LiqPay / Fondy / WayForPay.

> **Статус завдання:** T2 — landing page template. Код нижче повністю
> робочий: збірка `npm run build` проходить, dev-сервер віддає сторінку.
> Секції: Hero → Переваги → Галерея (слайдер) → Відгуки → FAQ → Форма → Footer.

---

## 📁 Структура папок

{TREE}

---

## 🚀 Швидкий старт

```bash
# 1. Встанови залежності
npm install

# 2. Режим розробки — http://localhost:5173
npm run dev

# 3. Продакшн-збірка (папка dist/)
npm run build

# 4. Перегляд збірки
npm run preview
```

Потрібні **Node.js 18+** та npm. Усі тексти/ціни/відгуки редагуються в
**одному файлі** — `src/data/product.ts`. Фото: поклади файли у `public/img/`
та онови `PRODUCT.images` (рекомендовано 1000×1250 WebP).

---

## 📄 Код проєкту (файл за файлом)
""")

for rel, lang, desc in FILES:
    code = read(rel)
    parts.append(f"### `{rel}` — {desc}\n")
    parts.append(f"````{lang}\n{code}\n````\n")

# --- README (інструкції: запуск, платіжка, Vercel) ---
parts.append("""
---

## 📖 README проєкту (запуск · платіжка · деплой)

Нижче — повний README, який лежить у корені проєкту.

""")
parts.append(f"````markdown\n{read('README.md')}\n````\n")

parts.append("""
---

## ✅ Чек-лист запуску в продакшен

1. [ ] Замінити тексти/ціни/відгуки у `src/data/product.ts`
2. [ ] Замінити SVG-плейсхолдери на реальні фото у `public/img/`
3. [ ] Оновити контакти та соцмережі у `src/components/Footer.tsx`
4. [ ] Підключити платіжку: зареєструватись у LiqPay/Fondy/WayForPay,
      створити бекенд-функцію та замінити заглушку у `src/lib/payment.ts`
5. [ ] Задеплоїти на Vercel (Build: `npm run build`, Output: `dist`)

---

*Згенеровано агентом (T2). Перевірено: `npm run build` — успішно, dev-сервер відповідає 200.*
""")

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(parts))

print('WRITTEN', OUT, os.path.getsize(OUT), 'bytes')
