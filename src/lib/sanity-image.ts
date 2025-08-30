import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to generate responsive image props
export function getResponsiveImageProps(image: any, alt: string) {
  if (!image || !image.asset) return null

  const baseUrl = urlFor(image)
  
  return {
    src: baseUrl.width(1200).height(800).format('webp').url(),
    srcSet: [
      `${baseUrl.width(320).height(213).format('webp').url()} 320w`,
      `${baseUrl.width(640).height(427).format('webp').url()} 640w`,
      `${baseUrl.width(768).height(512).format('webp').url()} 768w`,
      `${baseUrl.width(1024).height(683).format('webp').url()} 1024w`,
      `${baseUrl.width(1280).height(853).format('webp').url()} 1280w`,
      `${baseUrl.width(1920).height(1280).format('webp').url()} 1920w`,
    ].join(', '),
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw',
    alt: alt || image.alt || '',
    loading: 'eager' as const, // For hero images
  }
}

// Helper for hero background images
export function getHeroImageUrl(image: any, width: number = 1920, height: number = 1080) {
  if (!image || !image.asset) return null
  
  return urlFor(image)
    .width(width)
    .height(height)
    .format('webp')
    .quality(85)
    .url()
}