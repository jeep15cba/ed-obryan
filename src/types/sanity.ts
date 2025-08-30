export interface Service {
  _id: string
  title: string
  slug: { current: string }
  description: string
  shortDescription?: string
  icon?: string
  image?: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  features: string[]
  content: any[]
  featured: boolean
}

export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  title: string
  photo: {
    asset: {
      _ref: string
      url: string
    }
    alt?: string
  }
  bio: string
  specialties: string[]
  credentials: string[]
  education: {
    degree: string
    school: string
    year: string
  }[]
  experience: number
  featured: boolean
  order: number
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
  seoTitle?: string
  seoDescription?: string
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
  overview?: string
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
  seoTitle?: string
  seoDescription?: string
}