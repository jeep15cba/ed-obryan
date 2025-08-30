import { notFound } from 'next/navigation'
import { getCondition, getConditions } from '@/lib/sanity-queries'
import { Condition } from '@/types/sanity'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  AlertTriangle, 
  ArrowRight, 
  Phone,
  Heart,
  Activity,
  Stethoscope
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getResponsiveImageProps } from '@/lib/sanity-image'
import { FAQItem } from '@/components/ui/faq-item'

interface ConditionPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all conditions
export async function generateStaticParams() {
  const conditions = await getConditions()
  return conditions.map((condition: Condition) => ({
    slug: condition.slug.current,
  }))
}

export default async function ConditionPage({ params }: ConditionPageProps) {
  const condition = await getCondition(params.slug)

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
            <div className="flex items-center text-blue-100 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link 
                href={`/services/${condition.service.slug.current}`}
                className="hover:text-white transition-colors"
              >
                {condition.service.title}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{condition.title}</span>
            </div>

            <div className="max-w-4xl">
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                {condition.title}
              </h1>

              {/* Overview */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {condition.overview}
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
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-400 text-white hover:bg-blue-600 px-8 py-4 h-auto text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0405 556 622
                </Button>
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
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                );
              })()}
            </div>
          </Container>
        </section>
      )}

      {/* Symptoms & Causes Section */}
      {(condition.symptoms?.length > 0 || condition.causes?.length > 0) && (
        <section className="py-20 bg-white">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Symptoms */}
              {condition.symptoms && condition.symptoms.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 font-sans">Common Symptoms</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {condition.symptoms.map((symptom: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Causes */}
              {condition.causes && condition.causes.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 font-sans">Common Causes</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {condition.causes.map((cause: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Diagnosis Section */}
      {condition.diagnosis && condition.diagnosis.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Stethoscope className="w-4 h-4" />
                  Diagnosis
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  How We Diagnose This Condition
                </h2>
              </div>

              <div className="space-y-6">
                {condition.diagnosis.map((method: {method: string; description?: string}, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{method.method}</h3>
                    {method.description && (
                      <p className="text-gray-600 leading-relaxed">{method.description}</p>
                    )}
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
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Treatment Options
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Treatment Approaches
                </h2>
              </div>

              <div className="grid gap-8">
                {condition.treatmentOptions.map((treatment: {title: string; description?: string; isRecommended?: boolean}, index: number) => (
                  <div 
                    key={index} 
                    className={`p-8 rounded-2xl border-2 ${
                      treatment.isRecommended 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{treatment.title}</h3>
                      {treatment.isRecommended && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    {treatment.description && (
                      <p className="text-gray-600 leading-relaxed">{treatment.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Surgical Procedure Details */}
      {condition.procedure && (
        <section className="py-20 bg-blue-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Surgical Procedure
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  About the Surgery
                </h2>
              </div>

              <div className="bg-white p-8 rounded-2xl">
                {condition.procedure.description && (
                  <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                    {condition.procedure.description}
                  </p>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                  {condition.procedure.duration && (
                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                      <p className="text-gray-600">{condition.procedure.duration}</p>
                    </div>
                  )}
                  {condition.procedure.anesthesia && (
                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Anesthesia</h4>
                      <p className="text-gray-600">{condition.procedure.anesthesia}</p>
                    </div>
                  )}
                  {condition.procedure.hospitalStay && (
                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                      <Heart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Hospital Stay</h4>
                      <p className="text-gray-600">{condition.procedure.hospitalStay}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Recovery Information */}
      {condition.recovery && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Activity className="w-4 h-4" />
                  Recovery Process
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Your Recovery Journey
                </h2>
                {condition.recovery.timeline && (
                  <p className="text-xl text-gray-600">
                    Expected recovery time: <span className="font-semibold text-gray-900">{condition.recovery.timeline}</span>
                  </p>
                )}
              </div>

              {condition.recovery.phases && condition.recovery.phases.length > 0 && (
                <div className="space-y-6">
                  {condition.recovery.phases.map((phase: {phase: string; timeframe: string; activities?: string[]}, index: number) => (
                    <div key={index} className="bg-green-50 p-8 rounded-2xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-green-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                          <p className="text-green-600 font-medium">{phase.timeframe}</p>
                        </div>
                      </div>
                      
                      {phase.activities && phase.activities.length > 0 && (
                        <div className="ml-14">
                          <h4 className="font-semibold text-gray-900 mb-3">Allowed Activities:</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.activities.map((activity: string, actIdx: number) => (
                              <span 
                                key={actIdx}
                                className="bg-white px-3 py-1 rounded-full text-sm text-gray-700"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Success Rate & Risks */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Success Rate */}
            {condition.successRate && (
              <div className="text-center">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Success Rate</h3>
                <p className="text-4xl font-bold text-green-600 mb-4">{condition.successRate}</p>
                <p className="text-gray-600">High success rate with experienced surgical care</p>
              </div>
            )}

            {/* Risks */}
            {condition.risks && condition.risks.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-sans">Potential Risks</h3>
                </div>
                
                <div className="space-y-3">
                  {condition.risks.map((risk: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      {condition.faq && condition.faq.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                {condition.faq.map((item: {question: string; answer: string}, index: number) => (
                  <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Ready to Start Your Treatment?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with Mr O&apos;Bryan to discuss your {condition.title.toLowerCase()} treatment options.
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

