import { NextResponse } from 'next/server'
import { getNavigationData } from '@/lib/sanity-queries'

export const runtime = 'edge'

export async function GET() {
  try {
    const navigationData = await getNavigationData()
    return NextResponse.json(navigationData)
  } catch (error) {
    console.error('❌ [API] Error fetching navigation data:', error)
    return NextResponse.json({ error: 'Failed to fetch navigation data' }, { status: 500 })
  }
}