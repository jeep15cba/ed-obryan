import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'
import { getFooterConfig } from '@/lib/sanity-queries'

// Fallback data if Sanity is unavailable
const fallbackFooterData = {
  companyInfo: {
    logo: {
      text: 'Mr Edward O\'Bryan',
      initials: 'EO'
    },
    description: 'Expert orthopaedic surgeon specializing in hip and knee replacement, sports medicine, and comprehensive musculoskeletal care. Dedicated to getting you back to the activities you love.',
    contactInfo: {
      phone: '0405 556 622',
      email: 'admin@edwardobryan.com',
      address: '12 Linacre Road, Hampton 3188\n29 Hilda Crescent, Hawthorn 3122',
      hours: 'Mon-Fri: 8AM-5PM'
    }
  },
  navigation: {
    services: {
      title: 'Services',
      links: [
        { name: 'Hip & Knee Replacement', href: '/hip-and-knee-replacement' },
        { name: 'Sport Knee Surgery', href: '/sport-knee-surgery' },
        { name: 'Elite Athlete Support', href: '/elite-athlete-support' },
        { name: 'Conditions', href: '/conditions' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Edward O\'Bryan', href: '/about/edward-obryan' },
        { name: 'Fellowship Training', href: '/about/fellowship' },
        { name: 'Our Team', href: '/team' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Patient Information', href: '/patient-info' },
        { name: 'Patient Form', href: '/patient-form' },
        { name: 'Refer a Patient', href: '/refer' },
        { name: 'Privacy Policy', href: '/privacy' }
      ]
    }
  },
  cta: {
    buttonText: 'Book Consultation',
    buttonLink: '/contact'
  },
  socialMedia: [
    { platform: 'facebook', url: 'https://facebook.com/edwardobryan' },
    { platform: 'twitter', url: 'https://twitter.com/edwardobryan' },
    { platform: 'instagram', url: 'https://instagram.com/edwardobryan' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/edwardobryan' }
  ],
  bottomFooter: {
    copyrightText: '© 2024 Mr Edward O\'Bryan - Orthopaedic Surgeon. All rights reserved.',
    legalLinks: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Accessibility', href: '/accessibility' }
    ]
  }
}

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
}

export default async function Footer() {
  let footerData
  
  try {
    footerData = await getFooterConfig()
  } catch (error) {
    console.error('Failed to fetch footer data:', error)
    footerData = null
  }

  // Use Sanity data if available, otherwise use fallback
  const data = footerData || fallbackFooterData

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 gradient-blue-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{data.companyInfo.logo.initials}</span>
                </div>
                <span className="text-xl font-bold">{data.companyInfo.logo.text}</span>
              </Link>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {data.companyInfo.description}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{data.companyInfo.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{data.companyInfo.contactInfo.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span style={{ whiteSpace: 'pre-line' }}>{data.companyInfo.contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{data.companyInfo.contactInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-6">{data.navigation.services.title}</h3>
              <ul className="space-y-4">
                {data.navigation.services.links.map((item: any, index: number) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-6">{data.navigation.company.title}</h3>
              <ul className="space-y-4">
                {data.navigation.company.links.map((item: any, index: number) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & CTA */}
            <div>
              <h3 className="font-semibold mb-6">{data.navigation.resources.title}</h3>
              <ul className="space-y-4 mb-8">
                {data.navigation.resources.links.map((item: any, index: number) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-4">
                <Link href={data.cta.buttonLink}>
                  <Button className="w-full">
                    {data.cta.buttonText}
                  </Button>
                </Link>
                <div className="flex space-x-4">
                  {data.socialMedia.map((item: any, index: number) => {
                    const IconComponent = iconMap[item.platform as keyof typeof iconMap] || Facebook
                    return (
                      <Link
                        key={index}
                        href={item.url}
                        className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                      >
                        <IconComponent className="w-5 h-5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {data.bottomFooter.copyrightText}
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              {data.bottomFooter.legalLinks.map((link: any, index: number) => (
                <Link key={index} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}