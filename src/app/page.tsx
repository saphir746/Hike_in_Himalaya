'use client'

import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import hikesData from '../../Hikes.json'

export default function Home() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)

  // Function to get matching image for the trek
  const getTrekImage = (trekName: string) => {
    const imageMap: { [key: string]: string } = {
      'Buran Ghati Trek': '/images/treks/buran-ghati3.jpg',
      'Chandranahan Lake Trek': '/images/treks/chandernahan3.jpg',
      'Pin Parvati Pass': '/images/treks/pin-parvati6.jpg',
      'Rupin Pass Trek': '/images/treks/rupin-pass9.jpg',
      'Kedarkantha Trek': '/images/treks/Kedarkantha-Trek.jpg',
      'Pin Bhaba Pass Trek': '/images/treks/pin-bhaba.png',
      'Hampta Pass Trek': '/images/treks/hamptaPass.jpg',
      'Friendship Peak Trek': '/images/treks/friendship-peak.jpg',
      'Kashmir Great Lakes Trek': '/images/treks/Kashmir-Great-Lakes.jpg',
      'Parang La Expedition': '/images/treks/parang-la-trek.jpg',
      'Bhrigu Lake Trek': '/images/treks/bhrigu-lake.png',
      'Kang Yatse II Peak EXPEDITION': '/images/treks/kang-yatse.jpg',
      'Everest Base Camp Trek': '/images/treks/EverestBaseCamp.jpg',
      'Annapurna Circuit Trek': '/images/treks/AnnapurnaBaseCamp.png',
      'Black Peak Expedition': '/images/treks/BlackPeakExpedition.png'
    }
    
    return imageMap[trekName] || '/images/treks/buran-ghati3.jpg' // fallback image
  }
  
  const carouselImages = [
    '/images/carousel/carouselHIH1.jpg',
    '/images/carousel/carouselHIH2.jpg',
    '/images/carousel/carouselHIH3.jpg'
  ]

  const mobileCarouselImages = [
    '/images/carousel/carouselHIH1_mobile.jpg',
    '/images/carousel/carouselHIH2_mobile.jpg',
    '/images/carousel/carouselHIH3_mobile.jpg'
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
      {/* Desktop Carousel - Hidden on mobile */}
      <section className="relative w-full h-96 md:h-[500px] hidden md:block">
        <div className="relative w-full h-full">
          <img 
            src={carouselImages[currentSlide]}
            alt={`HikeinHimalaya Adventure ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Simple positioned buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full hover:bg-white hover:bg-opacity-20 z-10"
          >
            ←
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full hover:bg-white hover:bg-opacity-20 z-10"
          >
            →
          </button>
          
          {/* Simple dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-white ${
                  index === currentSlide ? 'bg-white' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Carousel - Visible only on mobile */}
      <section className="relative w-full h-64 md:hidden">
        <div className="relative w-full h-full">
          <img 
            src={mobileCarouselImages[currentSlide]}
            alt={`HikeinHimalaya Mobile Adventure ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Mobile carousel buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 z-10"
          >
            ←
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 z-10"
          >
            →
          </button>
          
          {/* Mobile carousel dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {mobileCarouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full border-2 border-white ${
                  index === currentSlide ? 'bg-white' : 'bg-transparent'
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
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={getTrekImage(hikesData.activities[0].name)} 
                  alt={hikesData.activities[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
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
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={getTrekImage(hikesData.activities[1].name)} 
                  alt={hikesData.activities[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
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
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={getTrekImage(hikesData.activities[3].name)} 
                  alt={hikesData.activities[3].name}
                  className="w-full h-full object-cover"
                />
              </div>
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

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Customer Rating */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">Customer Rating</div>
            </div>

            {/* Group Sizes */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">8-12</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">Perfect Group Sizes</div>
            </div>

            {/* Years of Experience */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">8+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">Years of Experience</div>
            </div>

            {/* Expert Guides */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">30</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">Expert Guides</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16" style={{ backgroundColor: '#111827ff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#c1c9ceff' }}>Popular Categories</h2>
            <p style={{ color: '#c1c9ceff' }}>
              Discover treks by your preferred criteria and adventure level
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Under Rs10000 */}
            <Link href="/treks?priceRange=budget" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Under Rs10000</h3>
                <p className="text-gray-500 text-xs">Budget-friendly treks</p>
              </div>
            </Link>

            {/* Himachal Treks */}
            <Link href="/treks?region=Himachal" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Himachal Treks</h3>
                <p className="text-gray-500 text-xs">Scenic mountain trails</p>
              </div>
            </Link>

            {/* 5500m+ Peaks */}
            <Link href="/treks?altitude=high" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364l2.828-2.828m0 0l2.829-2.829m-2.829 2.829L5.636 12.95m2.828 2.828L11.293 18.707M18.364 5.636l-2.828 2.828m0 0l-2.829 2.829m2.829-2.829L18.364 12.95m-2.828-2.828L12.707 7.293" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">5500m+ Peaks</h3>
                <p className="text-gray-500 text-xs">High altitude challenges</p>
              </div>
            </Link>

            {/* Nepal Treks */}
            <Link href="/treks?region=Nepal" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Nepal Treks</h3>
                <p className="text-gray-500 text-xs">Himalayan adventures</p>
              </div>
            </Link>

            {/* Uttarakhand Treks */}
            <Link href="/treks?region=Uttarakhand" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Uttarakhand Treks</h3>
                <p className="text-gray-500 text-xs">Spiritual & scenic routes</p>
              </div>
            </Link>

            {/* Under 7 Days */}
            <Link href="/treks?durationRange=short" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group block">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Under 7 Days</h3>
                <p className="text-gray-500 text-xs">Short duration treks</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Adventure Videos</h2>
            <p className="text-gray-600 mb-6">
              Experience the thrill of our trekking adventures through these captivating videos
            </p>
            <a 
              href="https://www.youtube.com/@HikeinHimalaya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Hike in Himalaya
            </a>
          </div>
          
          {/* YouTube Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Video 1 - YouTube Short */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video bg-gray-100">
                <iframe
                  src="https://www.youtube.com/embed/Bu8h-j62M9Q"
                  title="Himalaya Trekking Short"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                  Himalayan Trek Highlights
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  A quick glimpse into the breathtaking beauty of our Himalayan adventures
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span>YouTube Short</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 2 - Main Video */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video bg-gray-100">
                <iframe
                  src="https://www.youtube.com/embed/t3i86kMhcM8"
                  title="Hike in Himalaya Adventure"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                  Complete Trek Experience
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join us on an unforgettable journey through the majestic Himalayan landscapes
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </svg>
                    <span>Full Video</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 3 - Main Video */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video bg-gray-100">
                <iframe
                  src="https://www.youtube.com/embed/CW67ofEUMLk"
                  title="Himalayan Adventure Journey"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                  Himalayan Adventure Journey
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover the raw beauty and challenges of high-altitude trekking in the Himalayas
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                    </svg>
                    <span>Featured Video</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://www.youtube.com/@HikeinHimalaya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-semibold border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              View More Videos
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Adventurers Say</h2>
            <p className="text-gray-600 mb-6">
              Real experiences from trekkers who have joined our Himalayan adventures
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">Based on Google Reviews</span>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="ml-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">
                &quot;Amazing experience with Hike in Himalaya! The guides were knowledgeable and the trek was well organized. The views were absolutely breathtaking and the team made sure everyone was safe and comfortable throughout the journey.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 text-sm">Rajesh Kumar</p>
                  <p className="text-gray-500 text-xs">Local Guide</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="ml-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">
                &quot;Professional service and incredible hospitality! The team went above and beyond to ensure our trek was memorable. Highly recommend for anyone looking for an authentic Himalayan adventure.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 text-sm">Sarah Mitchell</p>
                  <p className="text-gray-500 text-xs">Adventure Traveler</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="ml-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">
                &quot;Outstanding organization and safety measures. The guides were experienced and made the challenging trek feel achievable. Equipment quality was excellent and the food was surprisingly good for mountain conditions.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 text-sm">Amit Sharma</p>
                  <p className="text-gray-500 text-xs">Mountain Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="ml-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">
                &quot;Life-changing experience! The team&apos;s expertise and passion for the mountains really showed. From logistics to safety, everything was perfectly managed. Would definitely book another trek with them.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900 text-sm">Priya Patel</p>
                  <p className="text-gray-500 text-xs">Nature Photographer</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Reviews CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-gray-900">Google Reviews</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">4.9/5 • 150+ Reviews</span>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Read more reviews on Google Maps and share your own adventure story
            </p>
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