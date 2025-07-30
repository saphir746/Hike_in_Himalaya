'use client'

import { useState } from 'react'
import Link from 'next/link'

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
  altitude: string
  suitability: string
}

interface TrekBookingClientProps {
  trek: Trek
}

export default function TrekBookingClient({ trek }: TrekBookingClientProps) {
  // Booking dialog state
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    numberOfPeople: 1,
    selectedMonth: '',
    totalPrice: 0
  })

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100'
      case 'Challenging': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Booking functions
  const getBestTrekkingMonths = (location: string, difficulty: string): string[] => {
    const baseMonths: { [key: string]: string[] } = {
      'Himachal': ['April', 'May', 'June', 'September', 'October'],
      'Uttarakhand': ['April', 'May', 'June', 'September', 'October', 'November'],
      'Kashmir': ['May', 'June', 'July', 'August', 'September'],
      'Nepal': ['March', 'April', 'May', 'October', 'November', 'December'],
      'Ladakh': ['June', 'July', 'August', 'September'],
      'Manali, Himachal': ['April', 'May', 'June', 'September', 'October'],
      'Garhwal Himalayas, Uttarakhand': ['April', 'May', 'June', 'September', 'October']
    }

    let months = baseMonths[location] || baseMonths['Himachal']
    
    if (difficulty === 'Challenging') {
      months = months.filter(month => 
        !['March', 'November', 'December'].includes(month)
      )
    }
    
    return months
  }

  const availableMonths = getBestTrekkingMonths(trek.location, trek.difficulty)

  const calculateTotalPrice = (numberOfPeople: number) => {
    return trek.price.amount * numberOfPeople
  }

  const handleBookingSubmit = () => {
    if (!bookingData.selectedMonth) {
      alert('Please select a month for your trek')
      return
    }

    const cartItem = {
      id: `trek-${trek.id}-${Date.now()}`,
      type: 'trek',
      name: trek.name,
      location: trek.location,
      duration: trek.duration,
      difficulty: trek.difficulty,
      numberOfPeople: bookingData.numberOfPeople,
      selectedMonth: bookingData.selectedMonth,
      pricePerPerson: trek.price.amount,
      totalPrice: calculateTotalPrice(bookingData.numberOfPeople),
      formattedPrice: `₹${calculateTotalPrice(bookingData.numberOfPeople).toLocaleString()}`,
      addedAt: Date.now()
    }

    // Get existing cart or create new one
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    existingCart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // Close dialog and show success message
    setIsBookingDialogOpen(false)
    alert(`${trek.name} has been added to your cart for ${bookingData.numberOfPeople} ${bookingData.numberOfPeople === 1 ? 'person' : 'people'} in ${bookingData.selectedMonth}!`)
    
    // Reset booking data
    setBookingData({
      numberOfPeople: 1,
      selectedMonth: '',
      totalPrice: 0
    })
  }

  const detailedInfo = {
    best_time: 'March to June and September to November'
  }

  return (
    <>
      {/* Booking Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
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
          <button
            onClick={() => setIsBookingDialogOpen(true)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
          >
            Book This Trek
          </button>
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

        {/* Gear Rental CTA */}
        <div className="mt-6 pt-6 border-t bg-blue-50 p-4 rounded-lg">
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

      {/* Booking Dialog */}
      {isBookingDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Book Your Trek</h3>
              <button
                onClick={() => setIsBookingDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Trek Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">{trek.name}</h4>
                <p className="text-sm text-gray-600">{trek.location} • {trek.duration}</p>
                <p className="text-lg font-bold text-green-600">{trek.price.formatted} per person</p>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <select
                  value={bookingData.numberOfPeople}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    numberOfPeople: parseInt(e.target.value),
                    totalPrice: calculateTotalPrice(parseInt(e.target.value))
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>

              {/* Month Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Month
                </label>
                <select
                  value={bookingData.selectedMonth}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    selectedMonth: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a month</option>
                  {availableMonths.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Showing best months for {trek.location} ({trek.difficulty} difficulty)
                </p>
              </div>

              {/* Total Price */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{calculateTotalPrice(bookingData.numberOfPeople).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {bookingData.numberOfPeople} {bookingData.numberOfPeople === 1 ? 'person' : 'people'} × {trek.price.formatted}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsBookingDialogOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookingSubmit}
                  disabled={!bookingData.selectedMonth}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}