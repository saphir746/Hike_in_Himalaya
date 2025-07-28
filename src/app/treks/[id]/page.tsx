'use client'

import Layout from '../../../../components/Layout'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import hikesData from '../../../../Hikes.json'

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

export default function TrekDetailPage() {
  const params = useParams()
  const id = params.id as string
  
  // Booking dialog state
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    numberOfPeople: 1,
    selectedMonth: '',
    totalPrice: 0
  })
  
  // Convert slug back to find matching trek
  const findTrekBySlug = (slug: string) => {
    return hikesData.activities.find((trek: Trek) => {
      const trekSlug = trek.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return trekSlug === slug
    })
  }

  const trek = findTrekBySlug(id)
  
  if (!trek) {
    notFound()
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

  // State for trek content
  const [trekContent, setTrekContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load trek content from Treks_descr file
  useEffect(() => {
    const loadTrekContent = async () => {
      try {
        const response = await fetch(`/api/trek-content/${trek.id}`)
        if (response.ok) {
          const content = await response.text()
          setTrekContent(content)
        }
      } catch (error) {
        console.error('Error loading trek content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrekContent()
  }, [trek.id])

  // Trek content including base content from markdown file
  const getDetailedInfo = (trekName: string) => {
    const baseInfo = {
      overview: `Experience the breathtaking beauty of ${trekName}. This carefully crafted itinerary takes you through some of the most spectacular landscapes in the Himalayas, offering a perfect blend of adventure, natural beauty, and cultural immersion.`,
      highlights: [
        'Stunning panoramic mountain views',
        'Expert local guides with extensive knowledge',
        'Cultural interaction with local communities',
        'Professional safety equipment and protocols',
        'All meals and accommodation included'
      ],
      included: [
        'Professional trek guide',
        'All necessary permits and entry fees',
        'Camping equipment (tents, sleeping bags)',
        'All meals during the trek',
        'First aid kit and basic medical supplies',
        'Transportation to and from trek starting point'
      ],
      not_included: [
        'Personal hiking gear and clothing',
        'Travel insurance',
        'Personal expenses',
        'Tips for guides and porters',
        'Any items not mentioned in inclusions'
      ],
      best_time: 'March to June and September to November',
      equipment: {
        trekking_gear: [
          'Ruck sack bag with rain cover. Qty -1',
          'Day Pack Bag - Recommended for treks with summit day',
          'Head Torch with spare Batteries. Qty -1',
          'U V protection sunglasses. Qty -1',
          'Water Bottles: 2 bottles of 1 liter each'
        ],
        clothing: [
          'Quick Dry Warm lower or Track Pants. Qty - 2',
          'Full sleeves T-shirts/ Sweatshirts. 1 for every 2 days of trekking',
          'Pair of thick woolen socks. 1 pair for every two days of trekking',
          'Thermal Body warmer Upper & Lower. Qty-1',
          'Undergarments. Qty - 1 for every day of trekking',
          'Warm jacket closed at wrist & neck .Qty-1',
          'Full sleeves sweater. Qty -1',
          'Rain wear ( Jacket & Pants ) . Qty-1',
          'Pair of waterproof, warm gloves. Qty-1',
          'Woolen cap. Qty-1',
          'Sun shielding Hat. Qty -1'
        ],
        footwear: [
          'Non-skid, deep treaded, high-ankle trekking shoes Qty -1',
          'Pair of light weight Slipper/Sandals Qty -1',
          'Camp Sandals (Optional)'
        ],
        toiletries: [
          'Personal toiletries kit (Small Towel, Toilet paper, paper soap, Bar soap, toothbrush, toothpaste, cold cream, etc.)',
          'Sun screen lotion small pack. Qty -1',
          'Lip Balm small pack. Qty-1'
        ],
        utensils: [
          'Small size, Light weight & Leak proof lunch box. Qty-1',
          'Plate. Qty-1',
          'Spoon. Qty-1',
          'Tea/Coffee (plastic) Mug. Qty-1'
        ],
        miscellaneous: [
          'Camera(Optional)',
          'Carry your medicines in plenty in case you have any specific ailment. Consult your doctor before joining the trek.',
          'Dry fruits, Nuts, Chocolate bars(Optional)'
        ]
      }
    }
    return baseInfo
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

  // Function to format trek content for display
  const formatTrekContent = (content: string) => {
    // Split content into lines and process
    const lines = content.split('\n')
    const processedLines: string[] = []
    let currentSection = ''
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (!line) {
        processedLines.push('<br>')
        continue
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        const title = line.substring(2)
        processedLines.push(`<h1 class="text-4xl font-bold mb-6 text-gray-900">${title}</h1>`)
      } else if (line.startsWith('## ')) {
        const title = line.substring(3)
        currentSection = title.toLowerCase()
        const isItinerary = title.toLowerCase().includes('itinerary')
        if (isItinerary) {
          processedLines.push(`
            <div class="mb-8 mt-8">
              <h2 class="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                ${title}
              </h2>
              <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>
            </div>
          `)
        } else {
          processedLines.push(`<h2 class="text-3xl font-bold mb-6 text-gray-900">${title}</h2>`)
        }
      } else if (line.startsWith('### ')) {
        const title = line.substring(4)
        processedLines.push(`<h3 class="text-2xl font-bold mb-4 text-gray-900">${title}</h3>`)
      } else if (line.startsWith('Day ')) {
        const dayNumber = line.match(/Day (\d+)/)?.[1] || ''
        const dayTitle = line.substring(line.indexOf(':') + 1).trim()
        
        // Different formatting for Brief vs Detailed Itinerary
        if (currentSection.includes('brief')) {
          // Narrow banner with description text to the right for Brief Itinerary
          processedLines.push(`
            <div class="flex items-start gap-4 mt-4 mb-3">
              <div class="flex items-center gap-3 p-3 rounded-lg border-l-4 shadow-sm" style="background-color: #c1c9ceff; border-left-color: #4a5568; width: fit-content;">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-xs" style="background-color: #111827ff">
                    ${dayNumber}
                  </div>
                </div>
                <div>
                  <span class="font-bold text-gray-900 text-base whitespace-nowrap">Day ${dayNumber}</span>
                </div>
              </div>
              <div class="flex-1 pt-3">
                <p class="text-gray-700 font-medium">${dayTitle}</p>
              </div>
            </div>
          `)
        } else {
          // Original larger format for Detailed Itinerary
          processedLines.push(`
            <div class="flex items-start gap-4 mt-6 mb-4 p-4 rounded-xl border-l-4 shadow-sm" style="background-color: #c1c9ceff; border-left-color: #4a5568;">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-sm" style="background-color: #111827ff">
                  ${dayNumber}
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-900 text-lg mb-1">Day ${dayNumber}</h4>
                <p class="text-gray-700 font-medium">${dayTitle}</p>
              </div>
            </div>
          `)
        }
      } else {
        // Regular paragraphs
        processedLines.push(`<p class="text-gray-600 leading-relaxed mb-4">${line}</p>`)
      }
    }
    
    return processedLines.join('')
  }

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
    
    return imageMap[trekName] || '/images/treks/buran-ghati3.jpg'
  }

  const detailedInfo = getDetailedInfo(trek.name)

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-200">
        <img 
          src={getTrekImage(trek.name)} 
          alt={trek.name}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => console.log(`Successfully loaded banner image for ${trek.name}: ${getTrekImage(trek.name)}`)}
          onError={(e) => {
            console.error(`Failed to load banner image for ${trek.name}:`, getTrekImage(trek.name))
            const target = e.target as HTMLImageElement
            target.src = '/images/treks/buran-ghati3.jpg'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white p-6 rounded-2xl" style={{ backgroundColor: '#111827b3' }}>
            <div className="mb-4">
              <Link href="/treks" className="text-white hover:text-gray-200 text-sm">
                ← Back to All Treks
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{trek.name}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(trek.difficulty)}`}>
                {trek.difficulty}
              </span>
              <span className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
                {trek.location}
              </span>
              <span className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
                {trek.duration}
              </span>
            </div>
            <div className="text-3xl font-bold">{trek.price.formatted} <span className="text-lg font-normal">per person</span></div>
          </div>
        </div>
      </section>

      {/* Trek Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Trek Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Trek Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-blue-800">Duration</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{trek.duration}</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center mb-3">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-green-800">Group Size</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{trek.group_size}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-3">
                      <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-purple-800">Maximum Altitude</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{trek.altitude}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-3">
                      <svg className="w-6 h-6 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-orange-800">Suitability</h3>
                    </div>
                    <p className="text-gray-700 font-medium">{trek.suitability}</p>
                  </div>
                </div>
              </div>

              {/* Trek Content from Treks_descr */}
              <div className="mb-12">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading trek details...</span>
                  </div>
                ) : trekContent ? (
                  <div className="max-w-none">
                    <div 
                      className="trek-content"
                      dangerouslySetInnerHTML={{ __html: formatTrekContent(trekContent) }}
                    />
                  </div>
                ) : (
                  <>
                    {/* Fallback to original content if no file found */}
                    <div className="mb-12">
                      <h2 className="text-3xl font-bold mb-6">Overview</h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {detailedInfo.overview}
                      </p>
                    </div>

                    <div className="mb-12">
                      <h3 className="text-2xl font-bold mb-6">Trek Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {detailedInfo.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* What&apos;s Included */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">What&apos;s Included</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    {detailedInfo.included.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What&apos;s Not Included */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">What&apos;s Not Included</h3>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    {detailedInfo.not_included.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Essential Trek Equipment */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Essential Trek Equipment</h3>
                <p className="text-gray-600 mb-6">
                  Here is a list of essential items for participants trekking with Hike In Himalayas. 
                  It includes only the items that participants must bring themselves, excluding those 
                  provided during the trek.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Trekking Gear */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-blue-800">Trekking Gear</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.trekking_gear.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clothing */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-green-800">Clothing</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.clothing.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footwear */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-purple-800">Footwear</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.footwear.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toiletries */}
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-orange-800">Toiletries</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.toiletries.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Utensils */}
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-teal-800">Utensils</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.utensils.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Miscellaneous */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Miscellaneous</h4>
                    <ul className="space-y-2">
                      {detailedInfo.equipment.miscellaneous.map((item, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <svg className="w-4 h-4 text-gray-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar */}
            <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Related Treks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Similar Treks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hikesData.activities
              .filter((t: Trek) => t.id !== trek.id && t.location === trek.location)
              .slice(0, 3)
              .map((similarTrek: Trek) => {
                const slug = similarTrek.name.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')
                
                return (
                  <div key={similarTrek.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 relative overflow-hidden">
                      <img 
                        src={getTrekImage(similarTrek.name)} 
                        alt={similarTrek.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{similarTrek.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{similarTrek.duration} • {similarTrek.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{similarTrek.price.formatted}</span>
                        <Link
                          href={`/treks/${slug}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

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
    </Layout>
  )
}