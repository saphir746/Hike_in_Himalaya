'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
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


export default function GearPage() {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Rental dialog state
  const [isRentalDialogOpen, setIsRentalDialogOpen] = useState(false)
  const [selectedGearItem, setSelectedGearItem] = useState<GearItem | null>(null)
  const [rentalData, setRentalData] = useState({
    numberOfDays: 3, // Minimum 3 days as mentioned in the rental info
    totalPrice: 0
  })


  // Get filtered gear items as a flat array
  const getFilteredGearItems = (): GearItem[] => {
    if (selectedCategory === 'all') {
      return rentalGearData.rental_gear as GearItem[]
    }
    return (rentalGearData.rental_gear as GearItem[]).filter(item => item.category === selectedCategory)
  }

  const filteredGearItems = getFilteredGearItems()

  // Get total items count for selected category
  const getTotalItemsCount = () => {
    return filteredGearItems.length
  }

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

  // Rental functions
  const calculateTotalPrice = (item: GearItem, days: number) => {
    return item.price.amount * days
  }

  const openRentalDialog = (item: GearItem) => {
    setSelectedGearItem(item)
    setRentalData({
      numberOfDays: 3,
      totalPrice: calculateTotalPrice(item, 3)
    })
    setIsRentalDialogOpen(true)
  }

  const handleRentalSubmit = () => {
    if (!selectedGearItem) return

    const cartItem = {
      id: `gear-${selectedGearItem.id}-${Date.now()}`,
      type: 'gear',
      name: selectedGearItem.name,
      category: selectedGearItem.category,
      description: selectedGearItem.description,
      numberOfDays: rentalData.numberOfDays,
      pricePerDay: selectedGearItem.price.amount,
      totalPrice: calculateTotalPrice(selectedGearItem, rentalData.numberOfDays),
      formattedPrice: `₹${calculateTotalPrice(selectedGearItem, rentalData.numberOfDays).toLocaleString()}`,
      addedAt: Date.now()
    }

    // Get existing cart or create new one
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    existingCart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // Close dialog and show success message
    setIsRentalDialogOpen(false)
    alert(`${selectedGearItem.name} has been added to your cart for ${rentalData.numberOfDays} days!`)
    
    // Reset rental data
    setRentalData({
      numberOfDays: 3,
      totalPrice: 0
    })
    setSelectedGearItem(null)
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Professional Gear Rental</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
          Quality equipment for your Hike in Himalaya adventures. All gear is professionally maintained and tested for high-altitude conditions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-6">Browse by Category</h2>
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories ({rentalGearData.metadata.total_items})
              </button>
              {rentalGearData.metadata.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({rentalGearData.metadata.category_distribution[category as keyof typeof rentalGearData.metadata.category_distribution] || 0})
                </button>
              ))}
            </div>

            {/* Filter Results Summary */}
            <div className="text-center">
              <span className="text-gray-600">
                {selectedCategory === 'all' 
                  ? `Showing all ${rentalGearData.metadata.total_items} items`
                  : `Showing ${getTotalItemsCount()} items in ${selectedCategory}`
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filteredGearItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No gear found</h3>
              <p className="text-gray-600 mb-6">
                No gear items are available in this category.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All Categories
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredGearItems.map((item: GearItem) => (
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    
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
                        <span className="text-xl font-bold text-green-600">
                          {item.price.formatted}
                        </span>
                      </div>
                      <button 
                        onClick={() => openRentalDialog(item)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Rental Dialog */}
      {isRentalDialogOpen && selectedGearItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Rent Equipment</h3>
              <button
                onClick={() => setIsRentalDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Gear Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">{selectedGearItem.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedGearItem.category}</p>
                <p className="text-xs text-gray-500 mb-3">{selectedGearItem.description}</p>
                <p className="text-lg font-bold text-green-600">{selectedGearItem.price.formatted}</p>
              </div>

              {/* Number of Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days (Minimum 3 days)
                </label>
                <select
                  value={rentalData.numberOfDays}
                  onChange={(e) => {
                    const days = parseInt(e.target.value)
                    setRentalData({
                      numberOfDays: days,
                      totalPrice: calculateTotalPrice(selectedGearItem, days)
                    })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 3).map(days => (
                    <option key={days} value={days}>
                      {days} {days === 1 ? 'Day' : 'Days'}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum rental period is 3 days. Maximum 30 days.
                </p>
              </div>

              {/* Total Price */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Rental Cost:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{calculateTotalPrice(selectedGearItem, rentalData.numberOfDays).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {rentalData.numberOfDays} {rentalData.numberOfDays === 1 ? 'day' : 'days'} × {selectedGearItem.price.formatted}
                </p>
              </div>

              {/* Rental Terms */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">Rental Terms</h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Pick up at trek starting points</li>
                  <li>• Damage protection included</li>
                  <li>• Professional cleaning included</li>
                  <li>• Return required at end of trek</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsRentalDialogOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRentalSubmit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}