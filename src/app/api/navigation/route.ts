import { NextResponse } from 'next/server'
import { getNavigationData } from '@/lib/sanity-queries'

export const runtime = 'edge'
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const navigationData = await getNavigationData()
    
    const response = NextResponse.json(navigationData)
    
    // Add cache headers
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    
    return response
  } catch (error) {
    console.error('❌ [API] Error fetching navigation data:', error)
    return NextResponse.json({ error: 'Failed to fetch navigation data' }, { status: 500 })
  }
}