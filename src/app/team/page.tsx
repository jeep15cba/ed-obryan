import { getTeamMembers } from '@/lib/sanity-queries'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, ArrowLeft, Award, Users, Activity } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Our Medical Team - Expert Orthopaedic Surgeons Melbourne'
  const description = 'Meet our team of expert orthopaedic surgeons and medical professionals. Led by Mr Edward O\'Bryan, providing world-class care in Melbourne.'
  
  return generateSEOMetadata({
    title,
    description,
    slug: '/team',
  })
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

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
                <Users className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                Our Medical Team
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Meet our team of expert orthopaedic surgeons and medical professionals, 
                dedicated to providing world-class care and innovative treatment solutions.
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

      {/* Team Members Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Expert Medical Professionals
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Excellence in Orthopaedic Care
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our team combines extensive experience, advanced training, and a commitment to 
                providing personalized care for every patient.
              </p>
            </div>

            {teamMembers && teamMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Link key={member._id} href={`/team/${member.slug.current}`}>
                    <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-200 border border-transparent hover:border-blue-100">
                      {/* Photo */}
                      <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                        {member.photo && (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        {member.featured && (
                          <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mb-3">
                            <Award className="w-3 h-3" />
                            Leading Surgeon
                          </div>
                        )}
                        
                        <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-900">
                          {member.name}
                        </h3>
                        
                        <p className="text-blue-600 font-medium mb-3">
                          {member.title}
                        </p>

                        <p className="text-gray-600 text-sm mb-4">
                          {member.credentials?.join(' • ')}
                        </p>

                        {/* Specialties */}
                        {member.specialties && member.specialties.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                              Specialties
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {member.specialties.slice(0, 3).map((specialty, index) => (
                                <span 
                                  key={index}
                                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                                >
                                  {specialty}
                                </span>
                              ))}
                              {member.specialties.length > 3 && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                                  +{member.specialties.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-6 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="text-sm font-medium">View Profile</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Fallback if no team members in Sanity */
              <div className="grid md:grid-cols-1 gap-8">
                <Link href="/team/edward-obryan">
                  <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-200 border border-transparent hover:border-blue-100">
                    <div className="max-w-4xl mx-auto">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Photo */}
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          {/* Placeholder for photo */}
                        </div>

                        {/* Info */}
                        <div>
                          <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            <Award className="w-4 h-4" />
                            Leading Surgeon
                          </div>
                          
                          <h3 className="font-bold text-gray-900 text-3xl mb-3 group-hover:text-blue-900">
                            Mr Edward O'Bryan
                          </h3>
                          
                          <p className="text-blue-600 font-medium text-xl mb-4">
                            Orthopaedic Surgeon
                          </p>

                          <p className="text-gray-600 mb-6">
                            MBBS • FRACS (Orthopaedics) • FAOrthA
                          </p>

                          <p className="text-gray-600 mb-6 leading-relaxed">
                            Leading orthopaedic surgeon specialising in advanced joint replacement and 
                            sports injury treatment. Expert in robotic-assisted surgery and minimally invasive techniques.
                          </p>

                          {/* Specialties */}
                          <div className="space-y-3 mb-6">
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                              Key Specialties
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {[
                                'Hip & Knee Joint Replacement',
                                'Robotic-Assisted Surgery',
                                'Sports Knee Surgery',
                                'ACL Reconstruction'
                              ].map((specialty, index) => (
                                <span 
                                  key={index}
                                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span className="font-medium">View Full Profile</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Excellence Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Why Choose Our Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our commitment to excellence is reflected in our qualifications, experience, and patient outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Expert Qualifications</h3>
                <p className="text-gray-600 text-sm">
                  Fellowship-trained surgeons with advanced specializations in orthopaedic surgery and sports medicine.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Advanced Techniques</h3>
                <p className="text-gray-600 text-sm">
                  Utilizing the latest robotic-assisted surgery and minimally invasive procedures for optimal outcomes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Patient-Focused</h3>
                <p className="text-gray-600 text-sm">
                  Personalized care with comprehensive support throughout your treatment and recovery journey.
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
              Ready to Meet Our Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation to discuss your orthopaedic needs with our expert medical professionals.
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