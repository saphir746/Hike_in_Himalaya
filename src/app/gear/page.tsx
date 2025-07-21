'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import rentalGearData from '../../../rental_gear.json'

interface GearItem {
  id: number
  name: string
  category: string
  price: {
    amount: number
    currency: string
    formatted: string
    per: string
  }
  description: string
  specifications?: Record<string, string | boolean | string[]>
  availability: string
}

interface CategorizedGear {
  [category: string]: GearItem[]
}

export default function GearPage() {
  // Group items by category
  const categorizedGear: CategorizedGear = rentalGearData.rental_gear.reduce<CategorizedGear>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item as GearItem)
    return acc
  }, {})

  // Get image path for gear item
  const getImagePath = (gearName: string) => {
    // Convert gear name to filename format
    const filename = gearName.toLowerCase()
      .replace(/\s+/g, '')
      .replace('sunglass', 'sunglasses')
      .replace('trekkingshoes', 'treckingshoes')
      .replace('trekkingpoles', 'trekkingpole')
      .replace('headtorch', 'headtorch')
      .replace('hotwaterbag', 'hotwaterbottle')
      .replace('tiffinbox', 'tiffin')
      .replace('powerbank', 'powerbank')
    
    return `/images/gear/${filename}.jpeg`
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Professional Gear Rental</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            High-quality equipment for your mountain adventures. All gear is professionally maintained and sanitized.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{rentalGearData.metadata.total_items}+</div>
              <div className="text-sm">Items Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Free</div>
              <div className="text-sm">Delivery to Base</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Info */}
      <section className="py-8 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-800">Rental Information</h3>
              <p className="text-yellow-700">
                Minimum 3-day rental period. Prices shown are per day. Pick up at trek starting points. 
                Damage protection and cleaning included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {Object.entries(categorizedGear).map(([categoryName, items]: [string, GearItem[]]) => (
            <div key={categoryName} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{categoryName}</h2>
                <p className="text-gray-600">
                  {items.length} item{items.length !== 1 ? 's' : ''} available in this category
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item: GearItem) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={getImagePath(item.name)}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center"><span class="text-white text-lg font-semibold">${item.name}</span></div>`
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      {/* Specifications */}
                      {item.specifications && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(item.specifications).slice(0, 2).map(([key, value]: [string, string | boolean | string[]]) => (
                              <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {typeof value === 'string' ? value : value.toString()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            {item.price.formatted}
                          </span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Gear Rental Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Gear</h3>
              <p className="text-gray-600">Select the equipment you need for your adventure</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">Secure your rental dates and complete payment</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive Gear</h3>
              <p className="text-gray-600">Pick up at trek starting point</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Return</h3>
              <p className="text-gray-600">Return the gear after your adventure - cleaning included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Rent With Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Professional Grade Equipment</h3>
                    <p className="text-gray-600">All gear is maintained to the highest standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Sanitized & Clean</h3>
                    <p className="text-gray-600">Every item is thoroughly cleaned and sanitized</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Damage Protection</h3>
                    <p className="text-gray-600">Normal wear and tear is covered</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Expert Support</h3>
                    <p className="text-gray-600">Get advice on gear selection and usage</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">Gear Collection Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Gear Up?</h2>
          <p className="text-xl mb-8">
            Browse our complete gear collection and reserve your equipment today.
          </p>
          <Link 
            href="/cart"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Cart & Checkout
          </Link>
        </div>
      </section>
    </Layout>
  )
}