import { client } from '@/sanity/client'
import { Service, TeamMember, Testimonial, BlogPost, AboutPage } from '@/types/sanity'

// Hero Section
export async function getHeroSection() {
  return client.fetch(`
    *[_type == "heroSection"][0] {
      _id,
      title,
      secondTitle,
      subtitle,
      heroImage {
        asset->,
        alt
      },
      ctaButtonText,
      doctorName,
      credentials,
      description
    }
  `)
}

// About Section
export async function getAboutSection() {
  return client.fetch(`
    *[_type == "aboutSection"][0] {
      _id,
      badgeText,
      title,
      titleHighlight,
      description,
      specialties,
      ctaButtonText,
      statistics,
      qualifications,
      professionalImage {
        asset->,
        alt,
        objectPosition
      }
    }
  `)
}

// Services Section
export async function getServicesSection() {
  return client.fetch(`
    *[_type == "servicesSection"][0] {
      _id,
      badgeText,
      title,
      titleHighlight,
      description,
      featuredServices[]->{
        _id,
        title,
        slug,
        description,
        shortDescription,
        icon,
        features
      },
      ctaSection
    }
  `)
}

// Services
export async function getServices(): Promise<Service[]> {
  return client.fetch(`
    *[_type == "service"] | order(featured desc, title asc) {
      _id,
      title,
      slug,
      description,
      shortDescription,
      icon,
      "image": image.asset->url,
      features,
      content,
      featured
    }
  `)
}

export async function getService(slug: string): Promise<Service | null> {
  return client.fetch(`
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      shortDescription,
      icon,
      "image": image.asset->url,
      features,
      content,
      featured,
      seo
    }
  `, { slug })
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`
    *[_type == "teamMember"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      title,
      "photo": photo.asset->url,
      bio,
      specialties,
      credentials,
      education,
      experience,
      featured,
      order
    }
  `)
}

export async function getFeaturedDoctor(): Promise<TeamMember | null> {
  return client.fetch(`
    *[_type == "teamMember" && featured == true][0] {
      _id,
      name,
      slug,
      title,
      "photo": photo.asset->url,
      bio,
      specialties,
      credentials,
      education,
      experience,
      featured,
      order,
      seo
    }
  `)
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  return client.fetch(`
    *[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      title,
      "photo": photo.asset->url,
      bio,
      specialties,
      credentials,
      education,
      experience,
      featured,
      order,
      seo
    }
  `, { slug })
}

// Testimonials
export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const limitQuery = limit ? ` | limit(${limit})` : ''
  
  return client.fetch(`
    *[_type == "testimonial" && approved == true] | order(dateSubmitted desc)${limitQuery} {
      _id,
      patientName,
      age,
      location,
      procedure,
      testimonial,
      rating,
      featured,
      approved,
      dateSubmitted
    }
  `)
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`
    *[_type == "testimonial" && featured == true && approved == true] | order(dateSubmitted desc) {
      _id,
      patientName,
      age,
      location,
      procedure,
      testimonial,
      rating,
      featured,
      approved,
      dateSubmitted
    }
  `)
}

// Blog Posts
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const limitQuery = limit ? ` | limit(${limit})` : ''
  
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc)${limitQuery} {
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      "author": author->{
        name,
        title,
        "photo": photo.asset->url
      },
      publishedAt,
      category,
      tags,
      featured,
      seoTitle,
      seoDescription
    }
  `)
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "blogPost" && featured == true] | order(publishedAt desc) | limit(3) {
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      "author": author->{
        name,
        title,
        "photo": photo.asset->url
      },
      publishedAt,
      category,
      tags,
      featured,
      seoTitle,
      seoDescription
    }
  `)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      "author": author->{
        name,
        title,
        "photo": photo.asset->url,
        bio
      },
      publishedAt,
      category,
      tags,
      content,
      featured,
      seoTitle,
      seoDescription
    }
  `, { slug })
}

// Conditions/Procedures
export async function getConditions() {
  return client.fetch(`
    *[_type == "condition"] | order(featured desc, title asc) {
      _id,
      title,
      slug,
      shortDescription,
      "service": service->{
        title,
        slug
      },
      heroImage {
        asset->,
        alt
      },
      featured
    }
  `)
}

export async function getCondition(slug: string) {
  return client.fetch(`
    *[_type == "condition" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "service": service->{
        title,
        slug
      },
      shortDescription,
      heroImage {
        asset->,
        alt
      },
      overview,
      symptoms,
      causes,
      diagnosis,
      treatmentOptions,
      procedure,
      recovery,
      risks,
      successRate,
      faq,
      seo
    }
  `, { slug })
}

// Navigation - Optimized query with reduced nesting
export async function getNavigationData() {
  try {
    const result = await client.fetch(`
      {
        "navigationItems": *[_type == "navigation" && isActive == true][0].items[isActive != false] | order(order asc) {
          title,
          href,
          order,
          hasDropdown,
          dropdownItems,
          autoPopulate,
          isActive
        },
        "services": *[_type == "service" && slug.current in ["conditions", "sport-knee-surgery", "hip-and-knee-replacement"]] | order(order asc, title asc) {
          _id,
          title,
          slug,
          order,
          "conditions": *[_type == "condition" && service._ref == ^._id && featured == true] | order(title asc) | limit(10) {
            _id,
            title,
            slug
          }
        }
      }
    `, {}, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    return result;
  } catch (error) {
    console.error('❌ [SERVER] getNavigationData query failed:', error);
    throw error;
  }
}

export async function getConditionsByService(serviceSlug: string) {
  return client.fetch(`
    *[_type == "condition" && service->slug.current == $serviceSlug] | order(featured desc, title asc) {
      _id,
      title,
      slug,
      shortDescription,
      heroImage {
        asset->,
        alt
      },
      featured
    }
  `, { serviceSlug })
}

// Get Service by slug with its related conditions
export async function getServiceWithConditions(serviceSlug: string) {
  return client.fetch(`
    *[_type == "service" && slug.current == $serviceSlug][0] {
      _id,
      title,
      slug,
      description,
      shortDescription,
      icon,
      "image": image.asset->url,
      features,
      content,
      featured,
      seo,
      "conditions": *[_type == "condition" && service._ref == ^._id] | order(featured desc, title asc) {
        _id,
        title,
        slug,
        shortDescription,
        heroImage {
          asset->,
          alt
        },
        featured
      }
    }
  `, { serviceSlug })
}

// Site Settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      _id,
      title,
      description,
      url,
      defaultSeo,
      favicon {
        asset->
      },
      doctorInfo,
      socialMedia
    }
  `)
}

// Navigation
export async function getNavigation() {
  try {
    const navigation = await client.fetch(`
      *[_type == "navigation" && isActive == true][0] {
        _id,
        title,
        items[] {
          title,
          href,
          hasDropdown,
          dropdownItems[] {
            title,
            href,
            description
          },
          autoPopulate,
          order,
          isActive
        }
      }
    `)

    if (!navigation || !navigation.items) {
      console.log('No active navigation document found or no items')
      return null
    }

    // Process navigation items
    const processedItems = await Promise.all(
      navigation.items
        .filter((item: any) => item.isActive !== false)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        .map(async (item: any) => {
          const navItem: any = {
            name: item.title,
            href: item.href || '#'
          }

          // Handle dropdowns
          if (item.hasDropdown) {
            let dropdownItems = []

            // Auto-populate dropdown if enabled
            if (item.autoPopulate?.enabled && item.autoPopulate?.contentType) {
              const { contentType, pathPrefix, limit = 10 } = item.autoPopulate
              
              if (contentType === 'condition') {
                // Get all conditions for general conditions dropdown
                const conditions = await client.fetch(`
                  *[_type == "condition"] | order(featured desc, title asc) | limit($limit) {
                    title,
                    slug
                  }
                `, { limit })
                
                dropdownItems = conditions.map((condition: any) => ({
                  name: condition.title,
                  href: `${pathPrefix || '/conditions/'}${condition.slug.current}`
                }))
              } else if (contentType === 'service') {
                // Auto-populate with conditions that belong to this service
                // First, find the service that matches this navigation item
                const matchingService = await client.fetch(`
                  *[_type == "service" && title == $serviceTitle][0] {
                    _id,
                    title,
                    slug
                  }
                `, { serviceTitle: item.title })
                
                if (matchingService) {
                  const serviceConditions = await client.fetch(`
                    *[_type == "condition" && service._ref == $serviceId] | order(featured desc, title asc) | limit($limit) {
                      title,
                      slug
                    }
                  `, { serviceId: matchingService._id, limit })
                  
                  dropdownItems = serviceConditions.map((condition: any) => ({
                    name: condition.title,
                    href: `${pathPrefix}${condition.slug.current}`
                  }))
                }
              }
            }
            
            // Add manual dropdown items
            if (item.dropdownItems && item.dropdownItems.length > 0) {
              const manualItems = item.dropdownItems.map((dropItem: any) => ({
                name: dropItem.title,
                href: dropItem.href
              }))
              dropdownItems = [...dropdownItems, ...manualItems]
            }

            if (dropdownItems.length > 0) {
              navItem.dropdown = dropdownItems
            }
          }

          return navItem
        })
    )

    return processedItems

  } catch (error) {
    console.error('Error fetching navigation:', error)
    return null
  }
}

// About Pages
export async function getAboutPages(): Promise<AboutPage[]> {
  return client.fetch(`
    *[_type == "aboutPage"] | order(featured desc, title asc) {
      _id,
      title,
      slug,
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage {
        asset->,
        alt
      },
      featured,
      seo
    }
  `)
}

export async function getAboutPage(slug: string): Promise<AboutPage | null> {
  return client.fetch(`
    *[_type == "aboutPage" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage {
        asset->,
        alt
      },
      mainContent,
      achievements,
      philosophyTitle,
      philosophySubtitle,
      philosophyDescription,
      philosophyPoints,
      statistics,
      ctaTitle,
      ctaDescription,
      featured,
      seo
    }
  `, { slug })
}

export async function getFeaturedAboutPage(): Promise<AboutPage | null> {
  return client.fetch(`
    *[_type == "aboutPage" && featured == true][0] {
      _id,
      title,
      slug,
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage {
        asset->,
        alt
      },
      mainContent,
      achievements,
      philosophyTitle,
      philosophySubtitle,
      philosophyDescription,
      philosophyPoints,
      statistics,
      ctaTitle,
      ctaDescription,
      featured,
      seo
    }
  `)
}

// Fellowship Training
export async function getFellowshipPage() {
  return client.fetch(`
    *[_type == "fellowshipPage" && isActive == true][0] {
      _id,
      title,
      subtitle,
      description,
      badgeText,
      globeTitle,
      globeDescription,
      locationsTitle,
      locationsDescription,
      fellowshipLocations[]->{
        _id,
        city,
        country,
        flag,
        latitude,
        longitude,
        description,
        color,
        order,
        mentors[]->{
          _id,
          name,
          title,
          description,
          expertise,
          "photo": photo.asset->url,
          order
        }
      },
      seo
    }
  `)
}

export async function getFellowshipLocations() {
  return client.fetch(`
    *[_type == "fellowshipLocation" && isActive == true] | order(order asc) {
      _id,
      city,
      country,
      flag,
      latitude,
      longitude,
      description,
      color,
      order,
      mentors[]->{
        _id,
        name,
        title,
        description,
        expertise,
        "photo": photo.asset->url,
        order
      }
    }
  `)
}

export async function getFellowshipMentors() {
  return client.fetch(`
    *[_type == "fellowshipMentor"] | order(order asc) {
      _id,
      name,
      title,
      description,
      expertise,
      "photo": photo.asset->url,
      order
    }
  `)
}

// Elite Athlete Support Page
export async function getEliteAthletePage() {
  return client.fetch(`
    *[_type == "eliteAthletePage"][0] {
      _id,
      title,
      slug,
      heroSection {
        title,
        subtitle,
        backgroundImage {
          asset->
        }
      },
      introSection {
        title,
        content
      },
      approachSection {
        title,
        approaches[] {
          title,
          description,
          icon
        }
      },
      performanceGoalsSection {
        title,
        goals[] {
          title,
          description
        }
      },
      advancedTechniquesSection {
        title,
        techniques[] {
          title,
          description
        }
      },
      processSection {
        title,
        steps[] {
          stepNumber,
          title,
          description
        }
      },
      statisticsSection {
        title,
        statistics[] {
          number,
          label,
          description
        }
      },
      ctaSection {
        title,
        description,
        buttonText,
        buttonLink
      },
      seo
    }
  `)
}

// Patient Information Page
export async function getPatientInfoPage() {
  return client.fetch(`
    *[_type == "patientInfoPage"][0] {
      _id,
      title,
      slug,
      heroSection {
        title,
        subtitle,
        backgroundImage {
          asset->
        }
      },
      newPatientFormSection {
        title,
        description,
        buttonText,
        buttonLink
      },
      infoSections[] {
        title,
        icon,
        content
      },
      feesSection {
        title,
        description,
        consultingFees {
          title,
          fees[] {
            service,
            fee,
            rebate
          }
        },
        surgicalFees {
          title,
          fees[] {
            service,
            fee
          },
          notes
        }
      },
      contactSection {
        title,
        description,
        phoneNumber,
        phoneDisplay,
        email
      },
      seo
    }
  `)
}

// Contact Page
export async function getContactPage() {
  return client.fetch(`
    *[_type == "contactPage"][0] {
      _id,
      title,
      slug,
      heroSection {
        badge,
        title,
        subtitle,
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        },
        backgroundImage {
          asset->{
            _id,
            url
          },
          alt,
          hotspot,
          crop
        }
      },
      contactMethods {
        phone {
          title,
          description,
          number
        },
        email {
          title,
          description,
          address
        },
        locations {
          title,
          description,
          buttonText
        }
      },
      contactForm {
        badge,
        title,
        description,
        services,
        submitButton {
          text
        },
        privacyText
      },
      practiceInfo {
        badge,
        title,
        whyChooseUs[] {
          title,
          description
        },
        practiceHours {
          title,
          hours[] {
            day,
            time
          },
          emergencyText
        },
        reviews {
          title,
          rating,
          reviewCount,
          testimonial,
          testimonialAuthor
        }
      },
      locations {
        badge,
        title,
        description,
        locationList[] {
          name,
          address,
          phone,
          hours
        }
      },
      emergencySection {
        title,
        description,
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      seo {
        title,
        description,
        keywords,
        ogImage {
          asset->{
            _id,
            url
          }
        }
      }
    }
  `)
}

// Refer Page
export async function getReferPage() {
  return client.fetch(`
    *[_type == "referPage"][0] {
      _id,
      title,
      slug,
      heroSection {
        title,
        subtitle,
        backgroundImage {
          asset->
        }
      },
      introSection {
        title,
        description
      },
      contactMethods {
        title,
        healthlink,
        email,
        fax,
        postalAddresses
      },
      snapformSection {
        title,
        description,
        emailAddress
      },
      referralForm {
        title,
        practitionerFields {
          title,
          subtitle,
          fields[] {
            name,
            label,
            type,
            required,
            width
          }
        },
        patientFields {
          title,
          fields[] {
            name,
            label,
            type,
            required,
            width,
            options
          }
        },
        additionalFields[] {
          name,
          label,
          type,
          required,
          width
        },
        submitButton {
          text,
          processingText
        }
      },
      newPatientCTA {
        text,
        linkText,
        linkUrl
      },
      seo
    }
  `)
}



export async function getFooterConfig() {
  return client.fetch(`
    *[_type == "footerConfig"][0] {
      _id,
      title,
      companyInfo {
        logo {
          text,
          initials
        },
        description,
        contactInfo {
          phone,
          email,
          address,
          hours
        }
      },
      navigation {
        services {
          title,
          links[] {
            name,
            href
          }
        },
        company {
          title,
          links[] {
            name,
            href
          }
        },
        resources {
          title,
          links[] {
            name,
            href
          }
        }
      },
      cta {
        buttonText,
        buttonLink
      },
      socialMedia[] {
        platform,
        url
      },
      bottomFooter {
        copyrightText,
        legalLinks[] {
          name,
          href
        }
      },
      seo
    }
  `)
}
