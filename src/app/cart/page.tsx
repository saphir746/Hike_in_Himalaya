'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  type: 'trek' | 'gear'
  name: string
  // Trek-specific fields
  location?: string
  duration?: string
  difficulty?: string
  numberOfPeople?: number
  selectedMonth?: string
  pricePerPerson?: number
  // Gear-specific fields
  category?: string
  description?: string
  numberOfDays?: number
  pricePerDay?: number
  // Common fields
  totalPrice: number
  formattedPrice: string
  addedAt: number // timestamp
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart items
  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
    }

    loadCart()
  }, [])

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // Update number of people for trek items
  const updatePeopleCount = (itemId: string, newCount: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.type === 'trek' && item.pricePerPerson) {
        const newTotalPrice = item.pricePerPerson * newCount
        return {
          ...item,
          numberOfPeople: newCount,
          totalPrice: newTotalPrice,
          formattedPrice: `₹${newTotalPrice.toLocaleString()}`
        }
      }
      return item
    })
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // Update number of days for gear items
  const updateDaysCount = (itemId: string, newDays: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.type === 'gear' && item.pricePerDay) {
        const newTotalPrice = item.pricePerDay * newDays
        return {
          ...item,
          numberOfDays: newDays,
          totalPrice: newTotalPrice,
          formattedPrice: `₹${newTotalPrice.toLocaleString()}`
        }
      }
      return item
    })
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
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


  // Calculate total cart value
  const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5m0 0L4 8M7 13h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Start planning your adventure by browsing our available treks.
            </p>
            <Link
              href="/treks"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Browse Treks
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'trek' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type === 'trek' ? 'Trek' : 'Gear Rental'}
                        </span>
                      </div>
                      
                      {item.type === 'trek' ? (
                        <>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-sm text-gray-600">{item.location}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{item.duration}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty || '')}`}>
                              {item.difficulty}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Month:</strong> {item.selectedMonth}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-sm text-gray-600">{item.category}</span>
                          </div>
                          <div className="text-sm text-gray-500 mb-2">
                            {item.description}
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {item.type === 'trek' ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              People
                            </label>
                            <select
                              value={item.numberOfPeople}
                              onChange={(e) => updatePeopleCount(item.id, parseInt(e.target.value))}
                              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Price per person</div>
                            <div className="font-medium">₹{item.pricePerPerson?.toLocaleString()}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Days (Min 3)
                            </label>
                            <select
                              value={item.numberOfDays}
                              onChange={(e) => updateDaysCount(item.id, parseInt(e.target.value))}
                              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              {Array.from({ length: 28 }, (_, i) => i + 3).map(days => (
                                <option key={days} value={days}>{days}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Price per day</div>
                            <div className="font-medium">₹{item.pricePerDay?.toLocaleString()}</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{item.formattedPrice}</div>
                      <div className="text-xs text-gray-500">
                        {item.type === 'trek' 
                          ? `${item.numberOfPeople} × ₹${item.pricePerPerson?.toLocaleString()}`
                          : `${item.numberOfDays} days × ₹${item.pricePerDay?.toLocaleString()}`
                        }
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} {item.type === 'trek' 
                          ? `(${item.numberOfPeople} ${item.numberOfPeople === 1 ? 'person' : 'people'})`
                          : `(${item.numberOfDays} ${item.numberOfDays === 1 ? 'day' : 'days'})`
                        }
                      </span>
                      <span className="font-medium">₹{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    href="/treks"
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}