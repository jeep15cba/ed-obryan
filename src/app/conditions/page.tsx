import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, CheckCircle } from 'lucide-react'
import { getConditions } from '@/lib/sanity-queries'
import Link from 'next/link'
import Image from 'next/image'
import { getResponsiveImageProps } from '@/lib/sanity-image'

export default async function ConditionsPage() {
  const conditions = await getConditions()

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
              Conditions & Procedures
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
              Orthopaedic Conditions
              <span className="block">We Treat</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              From sports injuries to joint conditions, we provide expert diagnosis and 
              advanced treatment options tailored to get you back to your active lifestyle.
            </p>
          </div>
        </Container>
      </section>

      {/* Conditions Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditions.map((condition: any) => (
              <div 
                key={condition._id} 
                className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                {/* Condition Image */}
                {condition.heroImage && (
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                    {(() => {
                      const imageProps = getResponsiveImageProps(
                        condition.heroImage,
                        condition.heroImage.alt || condition.title
                      );

                      if (!imageProps) return null;

                      return (
                        <Image
                          src={imageProps.src}
                          alt={imageProps.alt}
                          width={400}
                          height={250}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      );
                    })()}
                  </div>
                )}

                {/* Service Category */}
                {condition.service && (
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <CheckCircle className="w-3 h-3" />
                    {condition.service.title}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">
                  {condition.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {condition.shortDescription}
                </p>

                {/* Learn More Button */}
                <Link href={`/conditions/${condition.slug.current}`}>
                  <Button 
                    variant="ghost" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {conditions.length === 0 && (
            <div className="text-center py-16">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No conditions found</h3>
              <p className="text-gray-600">Conditions and procedures will appear here once they are added.</p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Not Sure Which Condition You Have?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation for a comprehensive evaluation and personalized treatment plan.
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