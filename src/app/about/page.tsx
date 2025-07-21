import Layout from '../../../components/Layout'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About HikeinHimalaya
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Hike in Himalaya, we believe that trekking is more than just a journey through the majestic landscapes of the Himalaya—it's an experience that connects you to nature, adventure, and the rich heritage of these mountains.

Our story began eight years ago, rooted in a deep love for the trails and peaks of the Himalayas. Founded by locals who grew up exploring these awe-inspiring landscapes, Hike in Himalaya started as a humble trek equipment rental service. Fueled by a passion for sharing the wonders of the region, we soon began guiding small groups on local treks, introducing them to hidden gems and untouched beauty that only seasoned locals know.

As word spread, our adventure naturally evolved. What started as small group treks grew into a professional trekking service dedicated to offering personalized and authentic Himalayan experiences. Today, we are proud to provide not only expertly guided treks but also high-quality trekking equipment rentals to ensure you have a safe and memorable journey.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At HikeinHimalaya, our mission is to provide authentic, safe, and transformative 
              mountain experiences that inspire a deep connection with the Himalayas. We believe 
              that every trek should be more than just a journey - it should be a life-changing adventure.
            </p>
            <p className="text-gray-600 mb-6">
              We are committed to sustainable tourism practices that respect local communities 
              and preserve the pristine mountain environment for future generations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Expert local guides with decades of experience
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Small group sizes for personalized attention
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Comprehensive safety protocols and equipment
              </li>
            </ul>
          </div>
          <div className="h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">Mission Image Placeholder</span>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 mb-4">
              Founded in 2010 by passionate mountaineer Ranjeet, HikeinHimalaya began as a dream 
              to share the incredible beauty and spiritual essence of the Himalayas with fellow 
              adventure seekers. What started as small group treks with friends has grown into 
              a trusted adventure company serving trekkers from around the world.
            </p>
            <p className="text-gray-600 mb-4">
              Based in the heart of Himachal Pradesh, we have intimate knowledge of the region&apos;s 
              hidden gems, secret trails, and local communities. Our team of certified guides 
              brings together decades of mountain experience with a deep respect for the 
              environment and local culture.
            </p>
            <p className="text-gray-600">
              Today, HikeinHimalaya is proud to be a leader in sustainable mountain tourism, 
              offering everything from challenging high-altitude expeditions to gentle family 
              treks, all while maintaining our core values of safety, authenticity, and respect 
              for the mountains we call home.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-lg">Photo</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sanjay Negi</h3>
              <p className="text-green-600 font-medium mb-2">Founder</p>
              <p className="text-gray-600 text-sm">
              8+ years of mountaineering experience in the Himalayas
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-lg">Photo</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ranjeet Negi</h3>
              <p className="text-green-600 font-medium mb-2">Co-Founder</p>
              <p className="text-gray-600 text-sm">
              Expert in adventure tour planning and logistics
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-lg">Photo</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ashish Negi</h3>
              <p className="text-green-600 font-medium mb-2">Co-Founder</p>
              <p className="text-gray-600 text-sm">
              xpert in adventure tour planning and logistics
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.818-4.954A9 9 0 1112 21a9 9 0 018.818-9.046z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety First</h3>
            <p className="text-gray-600 text-sm">
              Your safety is our top priority. We maintain the highest safety standards and emergency protocols.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Authentic Experiences</h3>
            <p className="text-gray-600 text-sm">
              We create genuine connections with local culture and pristine mountain environments.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Environmental Care</h3>
            <p className="text-gray-600 text-sm">
              We practice Leave No Trace principles and support conservation efforts in the region.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600 text-sm">
              We work with local communities to ensure tourism benefits everyone in the region.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-6">
            Join us for an unforgettable journey through the world&apos;s most spectacular mountains.
          </p>
          <div className="space-x-4">
            <a 
              href="/treks"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Explore Treks
            </a>
            <a 
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}