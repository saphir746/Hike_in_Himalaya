import Layout from '../../../components/Layout'
import Link from 'next/link'

export default function GearPage() {
  const gearCategories = [
    {
      id: 'footwear',
      name: 'Footwear',
      description: 'Professional hiking and climbing boots',
      items: [
        { id: 1, name: 'Hiking Boots - Waterproof', price: 15, image: 'from-brown-500 to-brown-700', description: 'Durable waterproof boots for all terrains' },
        { id: 2, name: 'Climbing Boots', price: 20, image: 'from-gray-600 to-gray-800', description: 'Technical boots for rock and ice climbing' },
        { id: 3, name: 'Trekking Shoes', price: 12, image: 'from-blue-500 to-blue-700', description: 'Lightweight shoes for day hiking' },
      ]
    },
    {
      id: 'backpacks',
      name: 'Backpacks',
      description: 'High-quality backpacks for all adventure lengths',
      items: [
        { id: 4, name: 'Day Pack (30L)', price: 8, image: 'from-green-500 to-green-700', description: 'Perfect for day hikes and short treks' },
        { id: 5, name: 'Trekking Pack (65L)', price: 15, image: 'from-red-500 to-red-700', description: 'Multi-day trekking with ample storage' },
        { id: 6, name: 'Expedition Pack (85L)', price: 25, image: 'from-purple-500 to-purple-700', description: 'Extended expeditions and base camp treks' },
      ]
    },
    {
      id: 'sleeping',
      name: 'Sleeping Gear',
      description: 'Comfortable and warm sleeping equipment',
      items: [
        { id: 7, name: 'Sleeping Bag (-10°C)', price: 12, image: 'from-orange-500 to-orange-700', description: 'Warm sleeping bag for cold conditions' },
        { id: 8, name: 'Sleeping Pad', price: 8, image: 'from-yellow-500 to-yellow-600', description: 'Insulated sleeping pad for comfort' },
        { id: 9, name: '4-Season Tent', price: 30, image: 'from-teal-500 to-teal-700', description: 'Durable tent for all weather conditions' },
      ]
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Technical clothing for mountain conditions',
      items: [
        { id: 10, name: 'Rain Jacket', price: 10, image: 'from-indigo-500 to-indigo-700', description: 'Waterproof and breathable rain protection' },
        { id: 11, name: 'Insulated Jacket', price: 15, image: 'from-pink-500 to-pink-700', description: 'Warm down jacket for cold weather' },
        { id: 12, name: 'Trekking Pants', price: 8, image: 'from-gray-500 to-gray-700', description: 'Durable and flexible hiking pants' },
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Essential gear and accessories',
      items: [
        { id: 13, name: 'Headlamp', price: 5, image: 'from-yellow-400 to-yellow-600', description: 'Bright LED headlamp with long battery life' },
        { id: 14, name: 'Trekking Poles', price: 8, image: 'from-gray-400 to-gray-600', description: 'Adjustable poles for stability and support' },
        { id: 15, name: 'Water Bottle', price: 3, image: 'from-blue-400 to-blue-600', description: 'Insulated water bottle keeps drinks cold/hot' },
      ]
    }
  ]

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
              <div className="text-2xl font-bold">500+</div>
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
                Minimum 3-day rental period. Prices shown are per day. Free delivery to trek starting points. 
                Damage protection and cleaning included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {gearCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 bg-gradient-to-r ${item.image} flex items-center justify-center`}>
                      <span className="text-white text-lg font-semibold">{item.name}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-green-600">${item.price}</span>
                          <span className="text-gray-500">/day</span>
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
              <p className="text-gray-600">Pick up or get free delivery to your trek starting point</p>
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