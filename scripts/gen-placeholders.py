#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор SVG-плейсхолдерів фото товару (худі oversize).
Заміни ці файли реальними фото товару перед запуском у продакшен.
"""
import os

ACCENT = "#d9f24b"      # фірмовий лайм
DARK   = "#101418"      # чорнильний

def front(body, hood, bg1, bg2, label="MIST"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg1}"/>
      <stop offset="100%" stop-color="{bg2}"/>
    </linearGradient>
    <linearGradient id="bodyG" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="{hood}"/>
      <stop offset="100%" stop-color="{body}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <!-- тінь на підлозі -->
  <ellipse cx="400" cy="925" rx="230" ry="28" fill="{DARK}" opacity="0.08"/>
  <!-- капюшон (задній шар) -->
  <path d="M 250 350 C 225 170 575 170 550 350 C 525 315 465 285 400 285 C 335 285 275 315 250 350 Z" fill="{hood}"/>
  <!-- рукави -->
  <path d="M 285 335 L 168 432 L 152 530 L 232 478 L 305 425 Z" fill="{body}"/>
  <path d="M 515 335 L 632 432 L 648 530 L 568 478 L 495 425 Z" fill="{body}"/>
  <!-- манжети -->
  <rect x="138" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <rect x="580" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- тіло -->
  <path d="M 285 335 Q 400 282 515 335 L 545 470 L 540 815 Q 400 855 260 815 L 255 470 Z" fill="url(#bodyG)"/>
  <!-- низ (гумка) -->
  <rect x="255" y="792" width="290" height="44" rx="22" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- кишеня кенгуру -->
  <path d="M 300 625 L 500 625 Q 505 625 505 630 L 505 745 Q 505 755 495 755 L 305 755 Q 295 755 295 745 L 295 630 Q 295 625 300 625 Z" fill="{body}" stroke="{DARK}" stroke-opacity="0.18" stroke-width="4"/>
  <!-- шнурки -->
  <path d="M 372 300 L 364 505" stroke="{ACCENT}" stroke-width="7" stroke-linecap="round"/>
  <path d="M 428 300 L 436 505" stroke="{ACCENT}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="362" cy="513" r="9" fill="{ACCENT}"/>
  <circle cx="438" cy="513" r="9" fill="{ACCENT}"/>
  <!-- логотип на грудях -->
  <text x="400" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="800" letter-spacing="8" fill="{ACCENT}">{label}</text>
</svg>
'''

def back(body, hood, bg1, bg2, label="MIST"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg1}"/>
      <stop offset="100%" stop-color="{bg2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <ellipse cx="400" cy="925" rx="230" ry="28" fill="{DARK}" opacity="0.08"/>
  <!-- капюшон (вид ззаду — повний) -->
  <path d="M 240 355 C 205 150 595 150 560 355 C 540 330 460 305 400 305 C 340 305 260 330 240 355 Z" fill="{hood}"/>
  <!-- рукави -->
  <path d="M 285 335 L 168 432 L 152 530 L 232 478 L 305 425 Z" fill="{body}"/>
  <path d="M 515 335 L 632 432 L 648 530 L 568 478 L 495 425 Z" fill="{body}"/>
  <rect x="138" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <rect x="580" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- тіло -->
  <path d="M 285 335 Q 400 282 515 335 L 545 470 L 540 815 Q 400 855 260 815 L 255 470 Z" fill="{body}"/>
  <rect x="255" y="792" width="290" height="44" rx="22" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- центральний шов -->
  <path d="M 400 340 L 400 805" stroke="{DARK}" stroke-opacity="0.12" stroke-width="3" stroke-dasharray="10 8"/>
  <!-- принт на спині -->
  <text x="400" y="640" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="800" letter-spacing="14" fill="{ACCENT}">{label}</text>
  <text x="400" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="10" fill="{ACCENT}" opacity="0.7">OVERSIZE</text>
</svg>
'''

def detail(body, bg1, bg2):
    # Крупний план тканини: футер із начосом + бейдж складу
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg1}"/>
      <stop offset="100%" stop-color="{bg2}"/>
    </linearGradient>
    <pattern id="knit" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="46" height="46" fill="none"/>
      <path d="M 0 23 Q 11.5 0 23 23 T 46 23" fill="none" stroke="{body}" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
      <path d="M 0 46 Q 11.5 23 23 46 T 46 46" fill="none" stroke="{body}" stroke-width="6" stroke-linecap="round" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <!-- полотно тканини -->
  <rect x="70" y="70" width="660" height="860" rx="48" fill="{body}" opacity="0.92"/>
  <rect x="70" y="70" width="660" height="860" rx="48" fill="url(#knit)"/>
  <!-- складка тканини -->
  <path d="M 180 130 C 260 300 200 420 260 560" fill="none" stroke="{DARK}" stroke-opacity="0.15" stroke-width="14" stroke-linecap="round"/>
  <!-- бейдж із характеристиками -->
  <g transform="translate(400 640)">
    <circle r="150" fill="{ACCENT}"/>
    <circle r="150" fill="none" stroke="{DARK}" stroke-opacity="0.15" stroke-width="4"/>
    <text y="-58" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="{DARK}">400 г/м²</text>
    <text y="-14" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="{DARK}">Футер 3-нитка</text>
    <text y="24" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="{DARK}" opacity="0.75">80% бавовна</text>
    <text y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="{DARK}" opacity="0.75">20% поліестер</text>
  </g>
</svg>
'''

def color_variant(body, hood, bg1, bg2):
    # Варіант кольору — та сама фронтальна модель, інший колір
    return front(body, hood, bg1, bg2, label="MIST")

def model(body, hood, bg1, bg2):
    # «Модель» — худі на вішалці
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg1}"/>
      <stop offset="100%" stop-color="{bg2}"/>
    </linearGradient>
    <linearGradient id="bodyG" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="{hood}"/>
      <stop offset="100%" stop-color="{body}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <ellipse cx="400" cy="915" rx="225" ry="26" fill="{DARK}" opacity="0.08"/>
  <!-- гачок вішалки -->
  <path d="M 400 128 C 400 96 432 92 432 118 C 432 140 400 146 400 172" fill="none" stroke="{DARK}" stroke-width="8" stroke-linecap="round"/>
  <!-- вішалка -->
  <path d="M 292 196 L 400 172 L 508 196" fill="none" stroke="{DARK}" stroke-width="8" stroke-linecap="round"/>
  <!-- капюшон -->
  <path d="M 250 350 C 225 170 575 170 550 350 C 525 315 465 285 400 285 C 335 285 275 315 250 350 Z" fill="{hood}"/>
  <!-- рукави -->
  <path d="M 285 335 L 168 432 L 152 530 L 232 478 L 305 425 Z" fill="{body}"/>
  <path d="M 515 335 L 632 432 L 648 530 L 568 478 L 495 425 Z" fill="{body}"/>
  <rect x="138" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <rect x="580" y="512" width="82" height="36" rx="18" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- тіло -->
  <path d="M 285 335 Q 400 282 515 335 L 545 470 L 540 815 Q 400 855 260 815 L 255 470 Z" fill="url(#bodyG)"/>
  <rect x="255" y="792" width="290" height="44" rx="22" fill="{body}" stroke="{DARK}" stroke-opacity="0.15"/>
  <!-- кишеня -->
  <path d="M 300 625 L 500 625 Q 505 625 505 630 L 505 745 Q 505 755 495 755 L 305 755 Q 295 755 295 745 L 295 630 Q 295 625 300 625 Z" fill="{body}" stroke="{DARK}" stroke-opacity="0.18" stroke-width="4"/>
  <path d="M 372 300 L 364 505" stroke="{ACCENT}" stroke-width="7" stroke-linecap="round"/>
  <path d="M 428 300 L 436 505" stroke="{ACCENT}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="362" cy="513" r="9" fill="{ACCENT}"/>
  <circle cx="438" cy="513" r="9" fill="{ACCENT}"/>
  <text x="400" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="800" letter-spacing="8" fill="{ACCENT}">MIST</text>
</svg>
'''

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')
os.makedirs(OUT, exist_ok=True)

images = {
    'hoodie-1-front.svg':  front('#232a35', '#2b3341', '#e9e5db', '#f5f2eb'),
    'hoodie-2-back.svg':   back('#15181d', '#1c2027', '#ece8df', '#f7f4ee'),
    'hoodie-3-detail.svg': detail('#2b3341', '#e5e1d7', '#f3f0e9'),
    'hoodie-4-color.svg':  color_variant('#c9b896', '#d6c8a9', '#1d2128', '#262b33'),
    'hoodie-5-model.svg':  model('#59624a', '#6a7457', '#e3dfd5', '#f1eee7'),
}

for name, svg in images.items():
    path = os.path.join(OUT, name)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg)
    print('OK', name)
