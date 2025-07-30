'use client'

import { useState, useEffect } from 'react'

interface TrekContentClientProps {
  trekId: number
  trekName: string
}

export default function TrekContentClient({ trekId, trekName }: TrekContentClientProps) {
  // State for trek content
  const [trekContent, setTrekContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load trek content from Treks_descr file
  useEffect(() => {
    const loadTrekContent = async () => {
      try {
        const response = await fetch(`/api/trek-content/${trekId}`)
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
  }, [trekId])

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
          // Narrow banner with description text to the right for Brief Itinerary (no numbered dial)
          processedLines.push(`
            <div class="flex items-start gap-4 mt-4 mb-3">
              <div class="flex items-center p-3 rounded-lg border-l-4 shadow-sm" style="background-color: #c1c9ceff; border-left-color: #4a5568; width: fit-content;">
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
          // Larger format for Detailed Itinerary (no numbered dial)
          processedLines.push(`
            <div class="flex items-start gap-4 mt-6 mb-4 p-4 rounded-xl border-l-4 shadow-sm" style="background-color: #c1c9ceff; border-left-color: #4a5568;">
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

  const getDetailedInfo = (trekName: string) => {
    const baseInfo = {
      overview: `Experience the breathtaking beauty of ${trekName}. This carefully crafted itinerary takes you through some of the most spectacular landscapes in the Himalayas, offering a perfect blend of adventure, natural beauty, and cultural immersion.`,
      highlights: [
        'Stunning panoramic mountain views',
        'Expert local guides with extensive knowledge',
        'Cultural interaction with local communities',
        'Professional safety equipment and protocols',
        'All meals and accommodation included'
      ]
    }
    return baseInfo
  }

  const detailedInfo = getDetailedInfo(trekName)

  return (
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
  )
}