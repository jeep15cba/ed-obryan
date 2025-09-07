import { Metadata } from 'next'

export interface SEOData {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export interface GenerateMetadataProps {
  title: string
  description: string
  seo?: SEOData
  slug?: string
  type?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
  imageUrl?: string
  authorName?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://edosdoctors.com.au'
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.jpg`

export function generateMetadata({
  title,
  description,
  seo,
  slug = '',
  type = 'website',
  publishedAt,
  modifiedAt,
  imageUrl,
  authorName
}: GenerateMetadataProps): Metadata {
  
  const metaTitle = seo?.metaTitle || title
  const metaDescription = seo?.metaDescription || description
  const canonical = seo?.canonicalUrl || `${SITE_URL}${slug}`
  const ogImage = seo?.ogImage || imageUrl || DEFAULT_IMAGE
  
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords,
    
    // Open Graph
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: 'Mr Edward O\'Bryan - Orthopaedic Surgeon',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        }
      ],
      type: type,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
      creator: authorName ? `@${authorName}` : '@edosdoctors',
    },
    
    // Additional tags
    alternates: {
      canonical: canonical,
    },
    
    // Robots
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
      googleBot: {
        index: !seo?.noIndex,
        follow: !seo?.noIndex,
      },
    },
    
    // Medical/Health specific
    other: {
      'medical-specialty': 'Orthopaedic Surgery',
      'geo.region': 'AU-VIC',
      'geo.placename': 'Melbourne',
    },
  }
  
  return metadata
}

export function generateMedicalStructuredData(
  title: string,
  description: string,
  url: string,
  imageUrl?: string,
  publishedAt?: string,
  authorName?: string
) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Mr Edward O\'Bryan - Orthopaedic Surgeon',
    'description': description,
    'url': SITE_URL,
    'telephone': '0405556622',
    'email': 'ed@edosdoctors.com.au',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'AU',
      'addressRegion': 'VIC',
      'addressLocality': 'Melbourne'
    },
    'medicalSpecialty': [
      'Orthopaedic Surgery',
      'Joint Replacement',
      'Sports Medicine',
      'Robotic Surgery'
    ],
    'priceRange': '$$$$',
    'image': imageUrl || DEFAULT_IMAGE,
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Orthopaedic Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalProcedure',
            'name': 'Hip & Knee Joint Replacement',
            'description': 'Advanced robotic-assisted joint replacement procedures'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalProcedure',
            'name': 'Sports Knee Surgery',
            'description': 'Specialized surgical treatments for sports-related knee injuries'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalTherapy',
            'name': 'Orthopaedic Consultation',
            'description': 'Comprehensive evaluation and treatment planning'
          }
        }
      ]
    }
  }
  
  // For articles/blog posts, add Article structured data
  if (publishedAt && authorName) {
    return [
      baseStructuredData,
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'description': description,
        'url': url,
        'datePublished': publishedAt,
        'dateModified': publishedAt,
        'author': {
          '@type': 'Person',
          'name': authorName,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Mr Edward O\'Bryan - Orthopaedic Surgeon',
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/images/logo.png`
          }
        },
        'image': imageUrl || DEFAULT_IMAGE,
        'medicalAudience': {
          '@type': 'MedicalAudience',
          'audienceType': 'Patient'
        }
      }
    ]
  }
  
  return [baseStructuredData]
}

export const defaultSEOConfig = {
  title: 'Mr Edward O\'Bryan - Leading Orthopaedic Surgeon Melbourne',
  description: 'Expert orthopaedic care with Mr Edward O\'Bryan. Specializing in robotic-assisted joint replacement, sports knee surgery, and comprehensive orthopaedic treatment in Melbourne.',
  keywords: [
    'orthopaedic surgeon',
    'melbourne',
    'joint replacement',
    'knee surgery',
    'hip replacement',
    'sports medicine',
    'robotic surgery',
    'edward obryan',
    'orthopedic doctor',
    'arthroscopic surgery'
  ],
  siteUrl: SITE_URL,
}