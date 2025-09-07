'use client'

import { useEffect } from 'react'

interface SEOData {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonicalUrl?: string
}

interface SEOHeadProps {
  seo?: SEOData
  defaultTitle: string
  defaultDescription: string
  slug?: string
  siteUrl?: string
}

export function SEOHead({ 
  seo, 
  defaultTitle, 
  defaultDescription, 
  slug = '', 
  siteUrl = 'https://edosdoctors.com.au' 
}: SEOHeadProps) {
  
  const title = seo?.metaTitle || defaultTitle
  const description = seo?.metaDescription || defaultDescription
  const canonical = seo?.canonicalUrl || `${siteUrl}${slug}`
  const ogImage = seo?.ogImage || `${siteUrl}/api/og?title=${encodeURIComponent(title)}`
  
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }
    
    // Basic meta tags
    updateMeta('description', description)
    if (seo?.keywords && seo.keywords.length > 0) {
      updateMeta('keywords', seo.keywords.join(', '))
    }
    
    // Open Graph tags
    updateMeta('og:title', title, true)
    updateMeta('og:description', description, true)
    updateMeta('og:image', ogImage, true)
    updateMeta('og:url', canonical, true)
    updateMeta('og:type', 'website', true)
    
    // Twitter tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', ogImage)
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical
    
    // Robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.name = 'robots'
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.content = seo?.noIndex ? 'noindex, nofollow' : 'index, follow'
    
    // Medical/Health specific structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      'name': 'Mr Edward O\'Bryan - Orthopaedic Surgeon',
      'description': description,
      'url': siteUrl,
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
      'priceRange': '$$$$'
    }
    
    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
  }, [seo, title, description, canonical, ogImage])
  
  return null
}