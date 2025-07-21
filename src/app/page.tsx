import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
            Discover Your Next Adventure
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the thrill of the Himalayas with our expertly guided tours. From beginner to expert, we offer unforgettable adventures for all skill levels.
            </p>
            <div className="space-x-4">
              <Link 
                href="/treks"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Treks
              </Link>
              <Link 
                href="/gear"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
              >
                Rent Gear
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HikeinHimalaya?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Professional, certified guides with years of mountain experience</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Equipment</h3>
              <p className="text-gray-600">High-quality gear rental and safety equipment included</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unforgettable Experience</h3>
              <p className="text-gray-600">Carefully crafted itineraries for maximum adventure and safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treks Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Adventures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Everest Base Camp</h3>
                <p className="text-gray-600 mb-4">14-day journey to the world&apos;s highest peak base camp</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$2,499</span>
                  <Link href="/treks/everest-base-camp" className="text-blue-600 hover:text-blue-800">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Buran Ghati Trek</h3>
              <p className="text-gray-600">Himachal Pradesh</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$1,899</span>
                  <Link href="/treks/buran-ghati-trek" className="text-blue-600 hover:text-blue-800">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Kilimanjaro Summit</h3>
                <p className="text-gray-600 mb-4">7-day expedition to Africa's highest peak</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$3,299</span>
                  <Link href="/treks/kilimanjaro" className="text-blue-600 hover:text-blue-800">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/treks"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View All Treks
            </Link>
          </div>
        </div>
      </section>

      {/* Gear Rental Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Professional Gear Rental</h2>
              <p className="text-gray-600 mb-6">
                Don't have the gear? No problem! We offer high-quality equipment rentals 
                for all your trekking needs. From boots to sleeping bags, we've got you covered.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional hiking boots
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  High-quality backpacks
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sleeping bags and mats
                </li>
              </ul>
              <Link 
                href="/gear"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Gear
              </Link>
            </div>
            <div className="h-96 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">Gear Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8">
            Join thousands of adventurers who have trusted us with their Himalayan dreams.
          </p>
          <Link 
            href="/treks"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your Trek Today
          </Link>
        </div>
      </section>
    </Layout>
  )
}