'use client'

import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import hikesData from '../../Hikes.json'

export default function Home() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const carouselImages = [
    '/images/carousel/carouselHIH1.jpg',
    '/images/carousel/carouselHIH2.jpg',
    '/images/carousel/carouselHIH3.jpg'
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [carouselImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }
  return (
    <Layout>
      {/* Step 1: Full width carousel - no overlay yet */}
      <section className="relative w-full h-96 md:h-[500px]">
        <div className="relative w-full h-full">
          <img 
            src={carouselImages[currentSlide]}
            alt={`HikeinHimalaya Adventure ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Simple positioned buttons - no fancy styling yet */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 bg-blue-500 text-white px-3 py-2 rounded z-10"
          >
            ←
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 bg-blue-500 text-white px-3 py-2 rounded z-10"
          >
            →
          </button>
          
          {/* Simple dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white text-black">
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

      {/* Popular Treks Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Adventures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trek 1: Buran Ghati Trek */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{hikesData.activities[0].name}</h3>
                <p className="text-gray-600 mb-2">{hikesData.activities[0].location} • {hikesData.activities[0].duration}</p>
                <p className="text-sm text-gray-500 mb-4">Difficulty: {hikesData.activities[0].difficulty}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{hikesData.activities[0].price.formatted}</span>
                  <Link href={`/treks/${hikesData.activities[0].name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="text-blue-600 hover:text-blue-800">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Trek 2: Chandranahan Lake Trek */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{hikesData.activities[1].name}</h3>
                <p className="text-gray-600 mb-2">{hikesData.activities[1].location} • {hikesData.activities[1].duration}</p>
                <p className="text-sm text-gray-500 mb-4">Difficulty: {hikesData.activities[1].difficulty}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{hikesData.activities[1].price.formatted}</span>
                  <Link href={`/treks/${hikesData.activities[1].name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="text-blue-600 hover:text-blue-800">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Trek 4: Rupin Pass Trek */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{hikesData.activities[3].name}</h3>
                <p className="text-gray-600 mb-2">{hikesData.activities[3].location} • {hikesData.activities[3].duration}</p>
                <p className="text-sm text-gray-500 mb-4">Difficulty: {hikesData.activities[3].difficulty}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{hikesData.activities[3].price.formatted}</span>
                  <Link href={`/treks/${hikesData.activities[3].name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="text-blue-600 hover:text-blue-800">
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
                Don&apos;t have the gear? No problem! We offer high-quality equipment rentals 
                for all your trekking needs. From boots to sleeping bags, we&apos;ve got you covered.
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

      {/* Recognition & Association Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Recognition & Association</h2>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="flex flex-col items-center">
              <Image
                src="/images/logos/Himachal_Tourism.svg"
                alt="Himachal Tourism"
                width={200}
                height={120}
                className="mb-4"
              />
              <p className="text-sm text-gray-600 font-medium">Official Tourism Partner</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/logos/TripAdvisorLogo.svg"
                alt="TripAdvisor"
                width={200}
                height={120}
                className="mb-4"
              />
              <p className="text-sm text-gray-600 font-medium">Certified Excellence</p>
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