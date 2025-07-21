import Link from 'next/link'
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/images/logos/logo.hikeinhimalaya.svg"
                  alt="HikeinHimalaya"
                  width={180}
                  height={40}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/treks">Treks</Link>
              <Link href="/gear">Gear Rental</Link>
              <Link href="/cart">Cart</Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}