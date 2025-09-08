import { NextResponse } from 'next/server'
import { getFellowshipPage } from '@/lib/sanity-queries'

export const runtime = 'edge'

export async function GET() {
  try {
    const fellowshipData = await getFellowshipPage()
    return NextResponse.json(fellowshipData)
  } catch (error) {
    console.error('❌ [API] Error fetching fellowship data:', error)
    return NextResponse.json({ error: 'Failed to fetch fellowship data' }, { status: 500 })
  }
}