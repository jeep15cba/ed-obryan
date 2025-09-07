import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Activity, Zap, Heart, Shield, Settings, Target } from 'lucide-react'
import { getServicesSection } from '@/lib/sanity-queries'
import Link from 'next/link'

interface ServiceSlug {
  current: string;
  _type: "slug";
}

interface FeaturedService {
  _id: string;
  title: string;
  slug: ServiceSlug;
  description?: string;
  shortDescription?: string;
  icon: string;
  features: string[];
}

interface CtaSection {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  phoneNumber: string;
}

interface ServicesData {
  badgeText: string;
  title: string;
  titleHighlight: string;
  description: string;
  featuredServices: FeaturedService[];
  ctaSection: CtaSection;
}

// Icon mapping function
function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Activity,
    Zap,
    Heart,
    Shield,
    Settings,
    Target,
  };
  return icons[iconName] || Activity;
}

export default async function Services() {
  let servicesData: ServicesData;

  try {
    const data = await getServicesSection();
    if (data && data.featuredServices?.length) {
      servicesData = data;
    } else {
      // Fallback to default data
      servicesData = {
        badgeText: "Our Services",
        title: "Comprehensive",
        titleHighlight: "Orthopaedic Care",
        description: "From robotic joint replacement to sports medicine, we provide cutting-edge orthopaedic solutions tailored to your individual needs and lifestyle.",
        featuredServices: [
          {
            _id: '1',
            title: 'Sport Knee Surgery',
            slug: { current: 'sport-knee-surgery', _type: 'slug' },
            shortDescription: 'Advanced arthroscopic procedures for ACL reconstruction, meniscal repair, and complex knee ligament injuries.',
            description: 'Advanced arthroscopic procedures for ACL reconstruction, meniscal repair, and complex knee ligament injuries.',
            icon: 'Activity',
            features: ['ACL Reconstruction', 'Meniscal Repair', 'Cartilage Reconstruction', 'Patella Stabilisation']
          },
          {
            _id: '2',
            title: 'Robotic Joint Replacement',
            slug: { current: 'robotic-joint-replacement', _type: 'slug' },
            shortDescription: 'State-of-the-art robotic-assisted hip and knee replacement surgery for optimal precision and outcomes.',
            description: 'State-of-the-art robotic-assisted hip and knee replacement surgery for optimal precision and outcomes.',
            icon: 'Settings',
            features: ['Robotic Hip Replacement', 'Robotic Knee Replacement', 'Revision Surgery', 'Partial Knee Replacement']
          },
          {
            _id: '3',
            title: 'Hip & Knee Conditions',
            slug: { current: 'hip-knee-conditions', _type: 'slug' },
            shortDescription: 'Comprehensive treatment for arthritis, osteonecrosis, fractures, and degenerative joint conditions.',
            description: 'Comprehensive treatment for arthritis, osteonecrosis, fractures, and degenerative joint conditions.',
            icon: 'Heart',
            features: ['Hip Arthritis', 'Knee Arthritis', 'Osteonecrosis', 'Complex Fractures']
          },
          {
            _id: '4',
            title: 'Elite Athlete Support',
            slug: { current: 'elite-athlete-support', _type: 'slug' },
            shortDescription: 'Specialised care for professional and elite athletes with rapid return-to-sport protocols.',
            description: 'Specialised care for professional and elite athletes with rapid return-to-sport protocols.',
            icon: 'Zap',
            features: ['Performance Optimisation', 'Injury Prevention', 'Rapid Recovery', 'Sport-Specific Rehab']
          }
        ],
        ctaSection: {
          title: "Ready to Get Back to What You Love?",
          description: "Schedule a consultation to discuss your treatment options",
          primaryButtonText: "Book Consultation",
          secondaryButtonText: "Call 0405 556 622",
          phoneNumber: "0405 556 622"
        }
      };
    }
  } catch (error) {
    console.error("Failed to fetch services data:", error);
    // Fallback to default data
    servicesData = {
      badgeText: "Our Services",
      title: "Comprehensive",
      titleHighlight: "Orthopaedic Care",
      description: "From robotic joint replacement to sports medicine, we provide cutting-edge orthopaedic solutions tailored to your individual needs and lifestyle.",
      featuredServices: [
        {
          _id: '1',
          title: 'Sport Knee Surgery',
          slug: { current: 'sport-knee-surgery', _type: 'slug' },
          shortDescription: 'Advanced arthroscopic procedures for ACL reconstruction, meniscal repair, and complex knee ligament injuries.',
          description: 'Advanced arthroscopic procedures for ACL reconstruction, meniscal repair, and complex knee ligament injuries.',
          icon: 'Activity',
          features: ['ACL Reconstruction', 'Meniscal Repair', 'Cartilage Reconstruction', 'Patella Stabilisation']
        },
        {
          _id: '2',
          title: 'Robotic Joint Replacement',
          slug: { current: 'robotic-joint-replacement', _type: 'slug' },
          shortDescription: 'State-of-the-art robotic-assisted hip and knee replacement surgery for optimal precision and outcomes.',
          description: 'State-of-the-art robotic-assisted hip and knee replacement surgery for optimal precision and outcomes.',
          icon: 'Settings',
          features: ['Robotic Hip Replacement', 'Robotic Knee Replacement', 'Revision Surgery', 'Partial Knee Replacement']
        },
        {
          _id: '3',
          title: 'Hip & Knee Conditions',
          slug: { current: 'hip-knee-conditions', _type: 'slug' },
          shortDescription: 'Comprehensive treatment for arthritis, osteonecrosis, fractures, and degenerative joint conditions.',
          description: 'Comprehensive treatment for arthritis, osteonecrosis, fractures, and degenerative joint conditions.',
          icon: 'Heart',
          features: ['Hip Arthritis', 'Knee Arthritis', 'Osteonecrosis', 'Complex Fractures']
        },
        {
          _id: '4',
          title: 'Elite Athlete Support',
          slug: { current: 'elite-athlete-support', _type: 'slug' },
          shortDescription: 'Specialised care for professional and elite athletes with rapid return-to-sport protocols.',
          description: 'Specialised care for professional and elite athletes with rapid return-to-sport protocols.',
          icon: 'Zap',
          features: ['Performance Optimisation', 'Injury Prevention', 'Rapid Recovery', 'Sport-Specific Rehab']
        }
      ],
      ctaSection: {
        title: "Ready to Get Back to What You Love?",
        description: "Schedule a consultation to discuss your treatment options",
        primaryButtonText: "Book Consultation",
        secondaryButtonText: "Call 0405 556 622",
        phoneNumber: "0405 556 622"
      }
    };
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            {servicesData.badgeText}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-sans">
            {servicesData.title} 
            <span className="text-blue-600"> {servicesData.titleHighlight}</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {servicesData.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {servicesData.featuredServices.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            const serviceDescription = service.shortDescription || service.description || '';
            
            return (
              <div key={service._id} className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {serviceDescription}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={`/${service.slug.current}`}>
                  <Button 
                    variant="ghost" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4 font-sans">
            {servicesData.ctaSection.title}
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            {servicesData.ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg"
            >
              {servicesData.ctaSection.primaryButtonText}
            </Button>
            <Link href={`tel:${servicesData.ctaSection.phoneNumber}`}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-400 text-white hover:bg-blue-600 px-8 py-4 h-auto text-lg"
              >
                {servicesData.ctaSection.secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}