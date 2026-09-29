import type { Benefit, FaqItem, Product, Review } from '../types'

export type Language = 'en' | 'uk'

export interface LanguageOption {
  id: Language
  code: string
  label: string
  flag: string
}

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
  product: Translations['product']
  languages: LanguageOption[]
}

export interface Translations {
  header: {
    order: string
    languageSwitcherAria: string
  }
  hero: {
    badge: string
    tagline: string
    taglineAccent: string
    description: string
    orderCta: string
    viewPhotosCta: string
    socialReviews: string
    socialDelivery: string
    socialPayment: string
    materialBadgeTitle: string
    materialBadgeDesc: string
  }
  benefits: {
    subtitle: string
    titlePrefix: string
    titleAccent: string
    items: Benefit[]
  }
  gallery: {
    subtitle: string
    titlePrefix: string
    titleAccent: string
    hint: string
    sizeTip: string
    prevAria: string
    nextAria: string
    counter: (active: number, total: number) => string
    photoAria: (index: number) => string
  }
  reviews: {
    subtitle: string
    titlePrefix: string
    titleAccent: string
    averageScore: string
    verifiedBadge: string
    items: Review[]
  }
  faq: {
    subtitle: string
    titlePrefix: string
    titleAccent: string
    items: FaqItem[]
  }
  order: {
    subtitle: string
    title: string
    step1: string
    step2: string
    step3: string
    pricePerItem: string
    quantity: string
    decreaseQtyAria: string
    increaseQtyAria: string
    total: string
    successTitle: string
    successDesc: (name: string) => string
    orderAgainBtn: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    sizeLabel: string
    sizeSelectPlaceholder: string
    colorLabel: string
    cityLabel: string
    cityPlaceholder: string
    postOfficeLabel: string
    postOfficePlaceholder: string
    paymentLabel: string
    payCard: string
    payCod: string
    payCardNote: string
    submitting: string
    submitBtn: (totalPrice: string) => string
    termsText: string
    errors: {
      name: string
      phone: string
      size: string
      city: string
      postOffice: string
      generic: string
    }
  }
  footer: {
    brandDesc: string
    sectionsTitle: string
    navBenefits: string
    navGallery: string
    navReviews: string
    navFaq: string
    navOrder: string
    contactsTitle: string
    paymentDeliveryTitle: string
    payCard: string
    payCod: string
    deliveryNp: string
    copyright: (year: number) => string
    madeIn: string
  }
  product: Product
}
