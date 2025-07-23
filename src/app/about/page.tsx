import Layout from '../../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About HikeinHimalaya
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-600 text-left">
              At Hike in Himalaya, we believe that trekking is more than just a journey through the majestic landscapes of the Himalaya—it&apos;s an experience that connects you to nature, adventure, and the rich heritage of these mountains.
              </p>
              <p className="text-xl text-gray-600 text-left">
              Our story began eight years ago, rooted in a deep love for the trails and peaks of the Himalayas. Founded by locals who grew up exploring these awe-inspiring landscapes, Hike in Himalaya started as a humble trek equipment rental service. Fueled by a passion for sharing the wonders of the region, we soon began guiding small groups on local treks, introducing them to hidden gems and untouched beauty that only seasoned locals know.
              </p>
              <p className="text-xl text-gray-600 text-left">
              As word spread, our adventure naturally evolved. What started as small group treks grew into a professional trekking service dedicated to offering personalized and authentic Himalayan experiences. Today, we are proud to provide not only expertly guided treks but also high-quality trekking equipment rentals to ensure you have a safe and memorable journey.
              </p>
            </div>
            <div className="h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/people/buran-ghati4.jpeg"
                alt="Buran Ghati Trek"
                width={500}
                height={400}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-64 rounded-lg mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/people/sanjay.png"
                  alt="Sanjay Negi"
                  width={292}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sanjay Negi</h3>
              <p className="text-green-600 font-medium mb-2">Founder</p>
              <p className="text-gray-600 text-sm">
              8+ years of mountaineering experience in the Himalayas
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-64 rounded-lg mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/people/ranjeet.jpg"
                  alt="Ranjeet Negi"
                  width={292}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ranjeet Negi</h3>
              <p className="text-green-600 font-medium mb-2">Co-Founder</p>
              <p className="text-gray-600 text-sm">
              Expert in adventure tour planning and logistics
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-64 rounded-lg mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/people/ashish.jpeg"
                  alt="Ashish Negi"
                  width={292}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ashish Negi</h3>
              <p className="text-green-600 font-medium mb-2">Co-Founder</p>
              <p className="text-gray-600 text-sm">
              Expert in adventure tour planning and logistics
              </p>
            </div>
          </div>
        </div>

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

        {/* Call to Action */}
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-6">
            Join us for an unforgettable journey through the world&apos;s most spectacular mountains.
          </p>
          <div className="space-x-4">
            <Link 
              href="/treks"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Explore Treks
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}