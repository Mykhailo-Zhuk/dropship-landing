// ============================================================
// App — головний компонент лендінгу
// ------------------------------------------------------------
// Односторінковий лендінг товару, секції зверху вниз:
//   Hero → Переваги → Галерея → Відгуки → FAQ → Форма → Footer
// ============================================================
import { LanguageProvider } from './i18n'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Gallery } from './components/Gallery'
import { Reviews } from './components/Reviews'
import { Faq } from './components/Faq'
import { OrderForm } from './components/OrderForm'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Benefits />
          <Gallery />
          <Reviews />
          <Faq />
          <OrderForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
