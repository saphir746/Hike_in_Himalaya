'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmationPage() {
  const [customerName, setCustomerName] = useState<string>('')
  const [isValidAccess, setIsValidAccess] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user accessed this page through successful booking
    const bookingSuccess = sessionStorage.getItem('bookingSuccess')
    const storedCustomerName = sessionStorage.getItem('customerName')
    
    if (bookingSuccess === 'true' && storedCustomerName) {
      setCustomerName(storedCustomerName)
      setIsValidAccess(true)
      
      // Clear the session storage to prevent reuse
      sessionStorage.removeItem('bookingSuccess')
      sessionStorage.removeItem('customerName')
    } else {
      // Redirect to home if accessed directly
      router.push('/')
    }
  }, [router])

  // Show loading or redirect if invalid access
  if (!isValidAccess) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Thank you {customerName}!
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your booking request has been submitted successfully. We will contact you shortly to confirm your adventure.
          </p>

          {/* What's Next Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8 text-left max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">What happens next?</h2>
            <div className="space-y-3 text-blue-800">
              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <span>Our team will review your booking request within 24 hours</span>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <span>We&apos;ll contact you via email or phone to discuss trek details</span>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <span>Once confirmed, you&apos;ll receive preparation guidelines and payment information</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need immediate assistance?</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Phone:</strong> +91 98052 03783</p>
              <p><strong>Email:</strong> info@hikeinhimalaya.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/treks"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Explore More Treks
            </Link>
            <Link
              href="/"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-sm text-gray-500">
            <p>You should receive a confirmation email shortly. If you don&apos;t see it, please check your spam folder.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}