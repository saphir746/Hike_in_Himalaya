import Layout from '../../../../components/Layout'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import hikesData from '../../../../Hikes.json'
import { Metadata } from 'next'
import TrekBookingClient from './TrekBookingClient'
import TrekContentClient from './TrekContentClient'
import TrekHeroImage from './TrekHeroImage'

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

// Helper function to find trek by slug
const findTrekBySlug = (slug: string) => {
  return hikesData.activities.find((trek: Trek) => {
    const trekSlug = trek.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    return trekSlug === slug
  })
}

// Generate metadata for the trek page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const trek = findTrekBySlug(id)
  
  if (!trek) {
    return {
      title: 'Trek Not Found | Hike in Himalaya'
    }
  }

  const title = `${trek.name} | ${trek.duration} ${trek.location} Adventure | Hike in Himalaya`
  const description = `Experience the ${trek.name} - a ${trek.difficulty.toLowerCase()} ${trek.duration} trek in ${trek.location}. Book your Himalayan adventure starting from ${trek.price.formatted}. Expert guides, all equipment included.`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    }
  }
}

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  // Trek detailed info
  const getDetailedInfo = () => {
    const baseInfo = {
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

  const detailedInfo = getDetailedInfo()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-200">
        <TrekHeroImage 
          src={getTrekImage(trek.name)} 
          alt={trek.name}
          className="absolute inset-0 w-full h-full object-cover"
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
              <TrekContentClient trekId={trek.id} trekName={trek.name} />

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
              <TrekBookingClient trek={trek} />
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

    </Layout>
  )
}