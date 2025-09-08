import { NextResponse } from 'next/server'
import { getFellowshipLocations } from '@/lib/sanity-queries'

export const runtime = 'edge'

export async function GET() {
  try {
    const fellowshipLocations = await getFellowshipLocations()
    return NextResponse.json(fellowshipLocations)
  } catch (error) {
    console.error('❌ [API] Error fetching fellowship locations:', error)
    return NextResponse.json({ error: 'Failed to fetch fellowship locations' }, { status: 500 })
  }
}