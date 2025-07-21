'use client'

import Layout from '../../../../components/Layout'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import hikesData from '../../../../Hikes.json'

interface Trek {
  id: number
  name: string
  location: string
  duration: string
  group_size: string
  price: {
    amount: number
    currency: string
    formatted: string
  }
  difficulty: string
}

export default function TrekDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  // Convert slug back to find matching trek
  const findTrekBySlug = (slug: string) => {
    return hikesData.activities.find((trek: Trek) => {
      const trekSlug = trek.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return trekSlug === slug
    })
  }

  const trek = findTrekBySlug(id)
  
  if (!trek) {
    notFound()
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100'
      case 'Challenging': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Mock detailed data (in a real app, this would come from a more detailed JSON or CMS)
  const getDetailedInfo = (trekName: string) => {
    const baseInfo = {
      overview: `Experience the breathtaking beauty of ${trekName}. This carefully crafted itinerary takes you through some of the most spectacular landscapes in the Himalayas, offering a perfect blend of adventure, natural beauty, and cultural immersion.`,
      highlights: [
        'Stunning panoramic mountain views',
        'Expert local guides with extensive knowledge',
        'Cultural interaction with local communities',
        'Professional safety equipment and protocols',
        'All meals and accommodation included'
      ],
      included: [
        'Professional trek leader and local guides',
        'All meals during the trek',
        'Accommodation (tents/guesthouses)',
        'Transportation from base to trek start',
        'Safety equipment and first aid kit',
        'Permits and entry fees'
      ],
      not_included: [
        'Personal trekking equipment',
        'Travel insurance',
        'Personal expenses',
        'Tips for guides and staff',
        'Emergency evacuation costs'
      ],
      best_time: 'March to June and September to November'
    }
    return baseInfo
  }

  const detailedInfo = getDetailedInfo(trek.name)

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="mb-4">
              <Link href="/treks" className="text-white hover:text-gray-200 text-sm">
                ← Back to All Treks
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{trek.name}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trek.difficulty)}`}>
                {trek.difficulty}
              </span>
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {trek.location}
              </span>
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {trek.duration}
              </span>
            </div>
            <div className="text-3xl font-bold">{trek.price.formatted} <span className="text-lg font-normal">per person</span></div>
          </div>
        </div>
      </section>

      {/* Trek Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {detailedInfo.overview}
                </p>
              </div>

              {/* Trek Highlights */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Trek Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {detailedInfo.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What&apos;s Included */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">What&apos;s Included</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    {detailedInfo.included.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What&apos;s Not Included */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">What&apos;s Not Included</h3>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    {detailedInfo.not_included.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {trek.price.formatted}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                {/* Trek Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{trek.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-medium">{trek.group_size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trek.difficulty)}`}>
                      {trek.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Time:</span>
                    <span className="font-medium text-right">{detailedInfo.best_time}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                  >
                    Book This Trek
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full border border-green-600 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center block"
                  >
                    Ask Questions
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help planning?</p>
                  <p className="text-green-600 font-semibold">+91 98052 03783</p>
                </div>
              </div>

              {/* Gear Rental CTA */}
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Need Gear?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Rent professional trekking equipment for your adventure.
                </p>
                <Link
                  href="/gear"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
                >
                  Browse Gear
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Similar Treks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hikesData.activities
              .filter((t: Trek) => t.id !== trek.id && t.location === trek.location)
              .slice(0, 3)
              .map((similarTrek: Trek) => {
                const slug = similarTrek.name.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')
                
                return (
                  <div key={similarTrek.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{similarTrek.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{similarTrek.duration} • {similarTrek.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{similarTrek.price.formatted}</span>
                        <Link
                          href={`/treks/${slug}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </Layout>
  )
}