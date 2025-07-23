'use client'

import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useState } from 'react'
import hikesData from '../../../Hikes.json'

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

// Helper function to determine best trekking months based on location and difficulty
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

  // Get base months for the location
  let months = baseMonths[location] || baseMonths['Himachal'] // Default to Himachal if location not found
  
  // Adjust for difficulty level
  if (difficulty === 'Challenging') {
    // Challenging treks have shorter seasons (avoid extreme months)
    months = months.filter(month => 
      !['March', 'November', 'December'].includes(month)
    )
  }
  
  return months
}

export default function TreksPage() {
  // Filter state
  const [filters, setFilters] = useState({
    region: 'all',
    difficulty: 'all',
    priceRange: 'all',
    durationRange: 'all',
    month: 'all'
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

  // Create slug from trek name
  const createSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  // Filter function
  const getFilteredTreks = () => {
    return hikesData.activities.filter((trek: Trek) => {
      // Region filter
      if (filters.region !== 'all' && trek.location !== filters.region) {
        return false
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && trek.difficulty !== filters.difficulty) {
        return false
      }

      // Price range filter
      if (filters.priceRange !== 'all') {
        const price = trek.price.amount
        switch (filters.priceRange) {
          case 'budget':
            if (price > 15000) return false
            break
          case 'mid':
            if (price <= 15000 || price > 30000) return false
            break
          case 'premium':
            if (price <= 30000) return false
            break
        }
      }

      // Duration range filter
      if (filters.durationRange !== 'all') {
        const days = parseInt(trek.duration.split(' ')[0])
        switch (filters.durationRange) {
          case 'short':
            if (days > 7) return false
            break
          case 'medium':
            if (days <= 7 || days > 12) return false
            break
          case 'long':
            if (days <= 12) return false
            break
        }
      }

      // Month filter - best trekking seasons
      if (filters.month !== 'all') {
        const bestMonths = getBestTrekkingMonths(trek.location, trek.difficulty)
        if (!bestMonths.includes(filters.month)) {
          return false
        }
      }

      return true
    })
  }

  const filteredTreks = getFilteredTreks()

  // Reset filters
  const resetFilters = () => {
    setFilters({
      region: 'all',
      difficulty: 'all',
      priceRange: 'all',
      durationRange: 'all',
      month: 'all'
    })
  }

  return (
    <Layout>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-6">Find Your Perfect Trek</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
              {/* Region Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Regions</option>
                  {hikesData.metadata.regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Levels</option>
                  {Object.entries(hikesData.metadata.difficulty_distribution).map(([difficulty, count]) => (
                    <option key={difficulty} value={difficulty}>{difficulty} ({count})</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (Under ₹15,000)</option>
                  <option value="mid">Mid-range (₹15,000 - ₹30,000)</option>
                  <option value="premium">Premium (Above ₹30,000)</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.durationRange}
                  onChange={(e) => setFilters({ ...filters, durationRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1-7 days)</option>
                  <option value="medium">Medium (8-12 days)</option>
                  <option value="long">Long (13+ days)</option>
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Month</label>
                <select
                  value={filters.month}
                  onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Months</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>

            {/* Filter Actions and Results */}
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing {filteredTreks.length} of {hikesData.metadata.total_activities} treks
                </span>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
              
              {/* Active filters display */}
              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                {filters.region !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {filters.region}
                    <button
                      onClick={() => setFilters({ ...filters, region: 'all' })}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.difficulty !== 'all' && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {filters.difficulty}
                    <button
                      onClick={() => setFilters({ ...filters, difficulty: 'all' })}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.priceRange !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {filters.priceRange === 'budget' ? 'Budget' : filters.priceRange === 'mid' ? 'Mid-range' : 'Premium'}
                    <button
                      onClick={() => setFilters({ ...filters, priceRange: 'all' })}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.durationRange !== 'all' && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {filters.durationRange === 'short' ? 'Short' : filters.durationRange === 'medium' ? 'Medium' : 'Long'}
                    <button
                      onClick={() => setFilters({ ...filters, durationRange: 'all' })}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.month !== 'all' && (
                  <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                    {filters.month}
                    <button
                      onClick={() => setFilters({ ...filters, month: 'all' })}
                      className="ml-1 text-teal-600 hover:text-teal-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {filteredTreks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.084-2.291l-.08-.084C6.915 13.543 9.352 14 12 14s5.085-.457 6.164-1.375l-.08.084z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No treks found</h3>
              <p className="text-gray-600 mb-6">
                No treks match your current filter criteria. Try adjusting your filters to see more results.
              </p>
              <button
                onClick={resetFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreks.map((trek: Trek) => (
              <div key={trek.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Trek Image */}
                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trek.difficulty)} bg-opacity-90`}>
                      {trek.difficulty}
                    </span>
                  </div>
                </div>

                {/* Trek Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {trek.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {trek.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {trek.duration}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {trek.group_size}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        {trek.price.formatted}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <Link 
                      href={`/treks/${createSlug(trek.name)}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trek Statistics</h2>
            <p className="text-gray-600">Our comprehensive collection of Himalayan adventures</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2">{hikesData.metadata.total_activities}</div>
              <div className="text-gray-600">Total Treks</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2">{hikesData.metadata.regions.length}</div>
              <div className="text-gray-600">Regions Covered</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2">{hikesData.metadata.duration_range.min_days}-{hikesData.metadata.duration_range.max_days}</div>
              <div className="text-gray-600">Days Range</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2">₹{Math.round(hikesData.metadata.price_range.average / 1000)}k</div>
              <div className="text-gray-600">Average Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Himalayan Adventure?</h2>
          <p className="text-xl mb-8">
            Choose from our carefully curated collection of treks and start your journey today.
          </p>
          <div className="space-x-4">
            <Link 
              href="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Plan My Trek
            </Link>
            <Link 
              href="/gear"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              Rent Gear
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}