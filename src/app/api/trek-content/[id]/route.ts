import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const trekId = params.id
    
    // Construct the file path based on trek ID
    const treksDescrDir = path.join(process.cwd(), 'Treks_descr')
    
    // Find the matching file
    const files = fs.readdirSync(treksDescrDir)
    const matchingFile = files.find(file => file.startsWith(`${trekId}_`))
    
    if (!matchingFile) {
      return new NextResponse('Trek content not found', { status: 404 })
    }
    
    const filePath = path.join(treksDescrDir, matchingFile)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Error reading trek content:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}