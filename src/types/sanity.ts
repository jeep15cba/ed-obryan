export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  description: string
  shortDescription?: string
  icon?: string
  image?: string
  features: string[]
  content: any[]
  featured: boolean
  seo?: SEO
}

export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  title: string
  photo?: string
  bio: any[]
  specialties: string[]
  credentials: string[]
  education: string[]
  experience: string[]
  featured: boolean
  order: number
  seo?: SEO
}

export interface Testimonial {
  _id: string
  patientName: string
  age?: number
  location?: string
  procedure: string
  testimonial: string
  rating: number
  featured: boolean
  approved: boolean
  dateSubmitted: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  author?: TeamMember
  publishedAt: string
  category: string
  tags: string[]
  content: any[]
  featured: boolean
  seo?: SEO
}

export interface Condition {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  service?: {
    title: string
    slug: { current: string }
  }
  heroImage?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  overview?: any[]
  symptoms?: string[]
  causes?: string[]
  diagnosis?: Array<{
    method: string
    description?: string
  }>
  treatmentOptions?: Array<{
    title: string
    description?: string
    isRecommended?: boolean
  }>
  procedure?: any
  recovery?: {
    phases?: Array<{
      phase: string
      timeframe: string
      activities?: string[]
    }>
  }
  risks?: string[]
  successRate?: string
  faq?: Array<{
    question: string
    answer: string
  }>
  featured?: boolean
  seo?: SEO
}

export interface NavigationDropdownItem {
  name: string
  href: string
  description?: string
}

export interface NavigationItem {
  name: string
  href: string
  dropdown?: NavigationDropdownItem[]
}

export interface SanityNavigationService {
  _id: string
  title: string
  slug: {
    current: string
  }
  conditions: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
    featured: boolean
  }>
}

export interface SanityNavigationItem {
  title: string
  href: string
  order: number
  hasDropdown: boolean
  dropdownItems: Array<{
    _key: string
    title: string
    href: string
  }> | null
  autoPopulate: {
    enabled: boolean
    contentType: string
    pathPrefix: string
    limit: number
  } | null
  isActive: boolean
}

export interface SanityNavigationData {
  navigationItems?: SanityNavigationItem[]
  services: SanityNavigationService[]
}

export interface Navigation {
  _id: string
  title: string
  items: NavigationItem[]
  isActive: boolean
  lastUpdated: string
}

export interface AboutPage {
  _id: string
  title: string
  slug: { current: string }
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImage?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  mainContent?: any[]
  achievements?: Array<{
    title: string
    description: string
    icon?: string
  }>
  philosophyTitle?: string
  philosophySubtitle?: string
  philosophyDescription?: string
  philosophyPoints?: Array<{
    title: string
    description: string
    icon?: string
  }>
  statistics?: Array<{
    number: string
    label: string
    icon?: string
  }>
  ctaTitle?: string
  ctaDescription?: string
  featured?: boolean
  seo?: SEO
}

export interface FellowshipMentor {
  _id: string
  name: string
  title: string
  slug: { current: string }
  description: string
  expertise: string[]
  photo?: string
  order: number
}

export interface FellowshipLocation {
  _id: string
  city: string
  country: string
  flag: string
  latitude: number
  longitude: number
  description: string
  color: string
  mentors: FellowshipMentor[]
  order: number
  isActive: boolean
}

export interface FellowshipPage {
  _id: string
  title: string
  subtitle: string
  description: string[]
  badgeText: string
  globeTitle: string
  globeDescription: string
  locationsTitle: string
  locationsDescription: string
  fellowshipLocations: FellowshipLocation[]
  isActive: boolean
  seo?: SEO
}