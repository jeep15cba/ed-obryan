import { notFound } from 'next/navigation'
import { getCondition, getConditionsByService } from '@/lib/sanity-queries'
import type { Condition } from '@/types/sanity'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Clock, Users, Award, ArrowRight, Phone, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const conditions = await getConditionsByService('hip-and-knee-replacement')
  return conditions.map((condition: Condition) => ({
    slug: condition.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const condition = await getCondition(slug)
  
  if (!condition) {
    return {
      title: 'Procedure Not Found',
      description: 'The requested procedure could not be found.',
    }
  }

  const title = condition.seo?.metaTitle || `${condition.title} - Hip & Knee Replacement | Mr Edward O'Bryan`
  const description = condition.seo?.metaDescription || `Advanced robotic-assisted ${condition.title} by Mr Edward O'Bryan. Latest technology for improved mobility and faster recovery.`

  return generateSEOMetadata({
    title,
    description,
    seo: condition.seo,
    slug: `/hip-and-knee-replacement/${slug}`,
    imageUrl: condition.heroImage,
  })
}

export default async function HipKneeReplacementProcedurePage({ params }: Props) {
  const { slug } = await params
  const condition = await getCondition(slug)

  if (!condition) {
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
            <nav className="flex items-center space-x-2 text-blue-100 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/hip-and-knee-replacement" className="hover:text-white transition-colors">
                Hip & Knee Replacement
              </Link>
              <span>/</span>
              <span className="text-white">{condition.title}</span>
            </nav>

            <Link 
              href="/hip-and-knee-replacement" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hip & Knee Replacement
            </Link>

            <div className="max-w-4xl">
              {/* Service Icon */}
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Settings className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                {condition.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {condition.shortDescription || 'Advanced robotic-assisted joint replacement procedure for improved mobility and quality of life.'}
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

      {/* Hero Image Section */}
      {condition.heroImage && (
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={condition.heroImage}
                alt={condition.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Overview Section */}
      {condition.overview && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Settings className="w-4 h-4" />
                  Hip & Knee Replacement
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Procedure Overview
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <PortableText value={condition.overview || []} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Symptoms Section */}
      {condition.symptoms && condition.symptoms.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Symptoms & Indications
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Key symptoms and indicators that may require joint replacement surgery.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {condition.symptoms.map((symptom: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{symptom}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Treatment Options */}
      {condition.treatmentOptions && condition.treatmentOptions.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Treatment Approach
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {condition.treatmentOptions.map((treatment: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{treatment}</h3>
                      <p className="text-gray-600 text-sm">
                        Advanced robotic-assisted technology for precise implant positioning and optimal joint function.
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
      {condition.content && (
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <PortableText value={condition.content || []} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Recovery Section */}
      {condition.recovery && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Recovery & Rehabilitation
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Your journey to improved mobility and quality of life.
                </p>
              </div>
              <div className="prose prose-lg max-w-none">
                <PortableText value={condition.recovery || []} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Robotic Surgery Benefits Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Benefits of Robotic-Assisted Surgery
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Experience the advantages of cutting-edge robotic technology for joint replacement procedures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Greater Precision</h3>
                <p className="text-gray-600 text-sm">
                  Robotic guidance ensures optimal implant positioning for better joint function.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Faster Recovery</h3>
                <p className="text-gray-600 text-sm">
                  Minimally invasive techniques lead to shorter hospital stays and quicker healing.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Better Outcomes</h3>
                <p className="text-gray-600 text-sm">
                  Improved implant longevity and joint function for enhanced quality of life.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Reduced Risk</h3>
                <p className="text-gray-600 text-sm">
                  Lower risk of complications and revision surgery with precise surgical planning.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600">Joint Replacements</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">Latest</div>
              <p className="text-gray-600">Robotic Technology</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Procedures */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Related Joint Replacement Procedures
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore other advanced robotic-assisted procedures we offer for hip and knee replacement.
              </p>
            </div>

            <div className="text-center">
              <Link href="/hip-and-knee-replacement">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 h-auto text-lg"
                >
                  View All Procedures
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Ready to Regain Your Mobility?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with Mr O&apos;Bryan to discuss your {condition.title.toLowerCase()} options and learn about our robotic-assisted procedures.
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