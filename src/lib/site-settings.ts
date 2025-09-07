import { getSiteSettings } from './sanity-queries'

export interface SiteSettings {
  _id: string
  title: string
  description: string
  url: string
  defaultSeo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: string
    noIndex?: boolean
    canonicalUrl?: string
  }
  favicon?: {
    asset: {
      _ref: string
      url: string
    }
  }
  doctorInfo: {
    name: string
    title: string
    phone: string
    email: string
    address?: string
    credentials?: string[]
    specialties?: string[]
    yearsExperience?: number
  }
  statistics?: {
    patientsCount?: string
    proceduresCount?: string
    successRate?: string
    athletesSupportedCount?: string
  }
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

// Cache for site settings to avoid repeated API calls
let cachedSettings: SiteSettings | null = null
let cacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get site settings with caching
 * Uses cached data if available and fresh, otherwise fetches from Sanity
 */
export async function getCachedSiteSettings(): Promise<SiteSettings> {
  const now = Date.now()
  
  // Return cached data if available and fresh
  if (cachedSettings && (now - cacheTime) < CACHE_DURATION) {
    return cachedSettings
  }

  try {
    const settings = await getSiteSettings()
    
    if (settings) {
      cachedSettings = settings
      cacheTime = now
      return settings
    }
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  // Return fallback settings if fetch fails
  return getFallbackSettings()
}

/**
 * Get fallback settings when Sanity is unavailable
 */
function getFallbackSettings(): SiteSettings {
  return {
    _id: 'fallback',
    title: 'Mr Edward O\'Bryan - Orthopaedic Surgeon',
    description: 'Leading orthopaedic surgeon specialising in hip and knee surgery, sports medicine, and advanced robotic joint replacement procedures.',
    url: 'https://edwardobryan.com.au',
    doctorInfo: {
      name: 'Mr Edward O\'Bryan',
      title: 'Orthopaedic Surgeon',
      phone: '0405 556 622',
      email: 'ed@edosdoctors.com.au',
      address: 'Melbourne, Australia',
      credentials: ['MBBS (Honours)', 'FRACS', 'FAOrthA', 'PG Dip SurgAnat'],
      specialties: [
        'Hip & Knee Joint Replacement',
        'Robotic-Assisted Surgery',
        'Sports Knee Surgery',
        'ACL Reconstruction',
        'Arthroscopic Surgery'
      ],
      yearsExperience: 15
    },
    statistics: {
      patientsCount: '3000+',
      proceduresCount: '2000+',
      successRate: '98%',
      athletesSupportedCount: '500+'
    }
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any existing formatting
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as: 0405 556 622
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }
  
  return phone // Return original if not standard Australian mobile format
}

/**
 * Format phone number for tel: links
 */
export function formatPhoneForTel(phone: string): string {
  // Remove spaces and non-digits for tel: links
  return phone.replace(/\D/g, '')
}

/**
 * Get doctor's full credentials as formatted string
 */
export function getFormattedCredentials(credentials?: string[]): string {
  if (!credentials || credentials.length === 0) {
    return 'MBBS (Honours), FRACS'
  }
  
  return credentials.join(', ')
}

/**
 * Get years of experience with suffix
 */
export function getFormattedExperience(years?: number): string {
  if (!years) return '15+'
  
  return `${years}+`
}

/**
 * Clear the settings cache (useful for testing or forced refresh)
 */
export function clearSettingsCache(): void {
  cachedSettings = null
  cacheTime = 0
}