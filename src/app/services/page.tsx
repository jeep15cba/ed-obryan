import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'
import { getServices } from '@/lib/sanity-queries'
import Link from 'next/link'
import Image from 'next/image'

function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Activity: require('lucide-react').Activity,
    Zap: require('lucide-react').Zap,
    Heart: require('lucide-react').Heart,
    Shield: require('lucide-react').Shield,
    Settings: require('lucide-react').Settings,
    Target: require('lucide-react').Target,
  };
  return icons[iconName] || icons.Activity;
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute top-32 right-1/3 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-20 left-1/4 w-48 h-48 bg-white rounded-full"></div>
        </div>

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Our Services
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
              Comprehensive 
              <span className="block">Orthopaedic Care</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              From robotic joint replacement to sports medicine, we provide cutting-edge 
              orthopaedic solutions tailored to your individual needs and lifestyle.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon || 'Activity')
              
              return (
                <div 
                  key={service._id} 
                  className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  {/* Service Image */}
                  {service.image && (
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={service.image || ''}
                        alt={service.title}
                        width={400}
                        height={250}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span className="text-sm text-gray-600">
                            And {service.features.length - 3} more treatments
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Learn More Button */}
                  <Link href={`/services/${service.slug.current}`}>
                    <Button 
                      variant="ghost" 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Ready to Get Back to What You Love?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation to discuss your treatment options and develop a personalized care plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg font-semibold"
              >
                Book Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="tel:0405556622">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-400 text-white hover:bg-blue-600 px-8 py-4 h-auto text-lg w-full"
                >
                  Call 0405 556 622
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}