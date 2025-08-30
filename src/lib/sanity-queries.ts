import { client } from '@/sanity/client'
import { Service, TeamMember, Testimonial, BlogPost } from '@/types/sanity'

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
      featured
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
      order
    }
  `)
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
      seoTitle,
      seoDescription
    }
  `, { slug })
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