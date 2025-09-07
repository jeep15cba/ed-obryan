import { notFound } from 'next/navigation'
import { getServiceWithConditions } from '@/lib/sanity-queries'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Clock, Users, Award, ArrowRight, Phone, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const serviceData = await getServiceWithConditions('conditions')
  
  const title = serviceData?.seo?.metaTitle || `${serviceData?.title || 'Orthopaedic Conditions'} - Expert Diagnosis & Treatment Melbourne`
  const description = serviceData?.seo?.metaDescription || `Expert diagnosis and treatment of orthopaedic conditions by Mr Edward O'Bryan. Comprehensive care for arthritis, joint problems, and bone conditions in Melbourne.`
  
  return generateSEOMetadata({
    title,
    description,
    seo: serviceData?.seo,
    slug: '/conditions',
    imageUrl: serviceData?.image,
  })
}

export default async function ConditionsPage() {
  const serviceData = await getServiceWithConditions('conditions')

  if (!serviceData) {
    notFound()
  }

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
          <div className="relative z-10">
            {/* Breadcrumb */}
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="max-w-4xl">
              {/* Service Icon */}
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                {serviceData.title || 'Conditions'}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {serviceData.description || 'Comprehensive diagnosis and treatment of orthopaedic conditions including arthritis, joint degeneration, and structural problems.'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
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
                    <Phone className="w-5 h-5 mr-2" />
                    Call 0405 556 622
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Image Section */}
      {serviceData.image && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={serviceData.image}
                alt={serviceData.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Related Conditions/Procedures Section */}
      {serviceData.conditions && serviceData.conditions.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Conditions We Treat
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Orthopaedic Conditions
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Expert diagnosis and treatment for a wide range of orthopaedic conditions affecting joints, bones, and surrounding tissues.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData.conditions.map((condition: any) => (
                  <Link key={condition._id} href={`/conditions/${condition.slug.current}`}>
                    <div className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-6 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-blue-100">
                      {condition.heroImage && (
                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={condition.heroImage.asset.url}
                            alt={condition.heroImage.alt || condition.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-900">
                            {condition.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {condition.shortDescription}
                          </p>
                          {condition.featured && (
                            <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mt-3">
                              <Award className="w-3 h-3" />
                              Featured Condition
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Features Section */}
      {serviceData.features && serviceData.features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Our Treatment Approach
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {serviceData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature}</h3>
                      <p className="text-gray-600 text-sm">
                        Comprehensive evaluation and personalized treatment plans for optimal outcomes.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Detailed Content Section */}
      {serviceData.content && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <PortableText value={serviceData.content || []} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">2500+</div>
              <p className="text-gray-600">Conditions Treated</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">97%</div>
              <p className="text-gray-600">Patient Satisfaction</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Diagnostic Excellence Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Excellence in Diagnosis & Treatment
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our comprehensive approach ensures accurate diagnosis and effective treatment for all orthopaedic conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Expert Diagnosis</h3>
                <p className="text-gray-600 text-sm">
                  Advanced imaging and clinical assessment for accurate condition identification.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Personalized Care</h3>
                <p className="text-gray-600 text-sm">
                  Treatment plans tailored to your specific condition and lifestyle needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Timely Treatment</h3>
                <p className="text-gray-600 text-sm">
                  Prompt intervention to prevent progression and optimize outcomes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Proven Results</h3>
                <p className="text-gray-600 text-sm">
                  Successful treatment outcomes with focus on long-term joint health.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Get an Accurate Diagnosis Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with Mr O&apos;Bryan for expert evaluation of your orthopaedic condition and personalized treatment options.
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
                  <Phone className="w-5 h-5 mr-2" />
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