'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { emailConfig } from '../../../lib/emailConfig'

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

interface CustomerInfo {
  firstName: string
  surname: string
  email: string
  phoneNumber: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: number }>({})
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  // Load cart items and remove expired ones
  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const now = Date.now()
      const thirtyMinutes = 30 * 60 * 1000 // 30 minutes in milliseconds
      
      // Filter out expired items (older than 30 minutes)
      const validItems = cart.filter((item: CartItem) => {
        return now - item.addedAt < thirtyMinutes
      })
      
      // Update localStorage with valid items only
      localStorage.setItem('cart', JSON.stringify(validItems))
      setCartItems(validItems)
      
      // Calculate time remaining for each item
      const timeRemainingMap: { [key: string]: number } = {}
      validItems.forEach((item: CartItem) => {
        const elapsed = now - item.addedAt
        const remaining = Math.max(0, thirtyMinutes - elapsed)
        timeRemainingMap[item.id] = remaining
      })
      setTimeRemaining(timeRemainingMap)
    }

    loadCart()
    
    // Update every second
    const interval = setInterval(() => {
      loadCart()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100'
      case 'Challenging': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (60 * 1000))
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }


  // Calculate total cart value
  const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {}

    if (!customerInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!customerInfo.surname.trim()) {
      newErrors.surname = 'Surname is required'
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!customerInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(customerInfo.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare cart items for email
      const cartItemsText = cartItems.map(item => {
        if (item.type === 'trek') {
          return `• ${item.name}
  Location: ${item.location}
  Duration: ${item.duration}
  Difficulty: ${item.difficulty}
  Month: ${item.selectedMonth}
  Number of People: ${item.numberOfPeople}
  Price per Person: ₹${item.pricePerPerson?.toLocaleString()}
  Total: ${item.formattedPrice}
`
        } else {
          return `• ${item.name}
  Category: ${item.category}
  Description: ${item.description}
  Number of Days: ${item.numberOfDays}
  Price per Day: ₹${item.pricePerDay?.toLocaleString()}
  Total: ${item.formattedPrice}
`
        }
      }).join('\n')

      // Prepare email template parameters for admin notification
      const adminTemplateParams = {
        to_email: emailConfig.toEmail,
        customer_name: `${customerInfo.firstName} ${customerInfo.surname}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phoneNumber,
        cart_items: cartItemsText,
        total_amount: `₹${cartTotal.toLocaleString()}`,
        booking_date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // Prepare email template parameters for customer confirmation
      const customerTemplateParams = {
        to_email: customerInfo.email,
        customer_name: `${customerInfo.firstName} ${customerInfo.surname}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phoneNumber,
        cart_items: cartItemsText,
        total_amount: `₹${cartTotal.toLocaleString()}`,
        booking_date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // Initialize EmailJS
      emailjs.init(emailConfig.publicKey)
      
      // Send admin notification email
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.adminTemplateId,
        adminTemplateParams
      )

      // Send customer confirmation email
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.customerTemplateId,
        customerTemplateParams
      )

      // Clear cart after successful submission
      localStorage.removeItem('cart')
      
      // Store customer name and success flag in session storage for confirmation page
      sessionStorage.setItem('bookingSuccess', 'true')
      sessionStorage.setItem('customerName', `${customerInfo.firstName} ${customerInfo.surname}`)
      
      // Redirect to confirmation page
      router.push('/confirmation')

    } catch (error) {
      console.error('Email sending failed:', error)
      alert('There was an error submitting your booking request. Please try again or contact us directly at +91 98052 03783.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/cart" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block">
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
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
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/treks"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Browse Treks
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-6 mb-8">
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
                              <strong>Month:</strong> {item.selectedMonth} • <strong>People:</strong> {item.numberOfPeople}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.numberOfPeople} × ₹{item.pricePerPerson?.toLocaleString()} per person
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
                            <div className="text-sm text-gray-600">
                              {item.numberOfDays} days × ₹{item.pricePerDay?.toLocaleString()} per day
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{item.formattedPrice}</div>
                      </div>
                    </div>

                    {/* Timer for each item */}
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-800">Time remaining:</span>
                        <span className="text-sm font-mono font-bold text-orange-800">
                          {formatTimeRemaining(timeRemaining[item.id] || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total Amount</span>
                  <span className="text-3xl font-bold text-green-600">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  All items expire in 30 minutes from when they were added to cart
                </p>
              </div>
            </div>

            {/* Eligibility Criteria and Policies */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Eligibility Criteria */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Eligibility Criteria</h3>
                  <div className="text-blue-800">
                    <p className="mb-4 text-sm">Please read carefully the following criteria before completing your booking.</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <div className="text-sm">
                          <strong>BMI Requirement:</strong> Upper limit is 28. Your BMI will be checked at the base camp.
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <div className="text-sm">
                          <strong>Age Criteria:</strong> Lower age limit is 8 years. Those above 50 must show proof of current fitness before registration.
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <div className="text-sm">
                          <strong>Fitness Requirement:</strong> A trek requires considerable preparation. We expect trekkers to prepare well.
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Expected Preparation Guidelines:</h4>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span><strong>For those below 45:</strong> Should be able to jog 5 km in 35 mins, 4 times a week.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span><strong>For those above 45:</strong> Brisk walk at 9 minutes per kilometer. Must cover 3 km in 27 mins.</span>
                        </li>
                      </ul>
                      <p className="text-xs mt-2">
                        <strong>Need help with preparation?</strong> Please talk to us before registering. Call us on +91 98052 03783.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Cancellation Policy</h3>
                  <div className="text-red-800 space-y-3">
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Trek Cancellation by Organizer:</h4>
                      <p className="text-xs">
                        If a trek is canceled due to natural disasters or unforeseeable circumstances (floods, earthquakes, landslides, etc.), 
                        Hike In Himalaya will provide a trek voucher for the full amount. The voucher can be used for any trek within the next year.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Cancellation by Participant:</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-start">
                          <svg className="w-3 h-3 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span><strong>More than 30 days before trek:</strong> Complete refund</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-3 h-3 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span><strong>20-30 days before trek:</strong> 50% refund</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-3 h-3 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span><strong>Less than 20 days before trek:</strong> No refund</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-100 rounded-lg text-xs">
                      <h5 className="font-semibold mb-1">Important Notes:</h5>
                      <ul className="space-y-0.5">
                        <li>• All refunds include a 4% cancellation charge deduction</li>
                        <li>• Trek insurance purchases are non-refundable</li>
                        <li>• Hike In Himalaya is not responsible for damage to personal belongings during the trek</li>
                        <li>• The trek fee covers all expenses from start to finish as mentioned in inclusions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Surname */}
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                    Surname *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    value={customerInfo.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.surname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your surname"
                  />
                  {errors.surname && (
                    <p className="text-red-600 text-sm mt-1">{errors.surname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={customerInfo.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll use this number to contact you about your booking
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : `Send Booking Request - ₹${cartTotal.toLocaleString()}`}
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By completing this booking, you agree to our terms and conditions
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}