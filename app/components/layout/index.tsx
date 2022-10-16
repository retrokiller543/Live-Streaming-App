import { Footer } from './Footer'
import { Header } from './Header'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
