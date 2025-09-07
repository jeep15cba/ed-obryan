import { notFound } from 'next/navigation'
import { getTeamMember, getFeaturedDoctor } from '@/lib/sanity-queries'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Mail, MapPin, Award, Users, Clock, Star, Heart, Shield, Activity, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = await getTeamMember(params.slug)
  
  if (!doctor) {
    return {
      title: 'Team Member Not Found',
      description: 'The requested team member could not be found.'
    }
  }
  
  const title = doctor?.seo?.metaTitle || `${doctor?.name} - ${doctor?.title} | Melbourne Orthopaedic Surgeon`
  const description = doctor?.seo?.metaDescription || `Meet ${doctor?.name}, ${doctor?.title} specializing in orthopaedic surgery. Expert in ${doctor?.specialties?.slice(0, 2).join(' and ')}.`
  
  return generateSEOMetadata({
    title,
    description,
    seo: doctor?.seo,
    slug: `/team/${params.slug}`,
    imageUrl: doctor?.photo,
  })
}

export default async function TeamMemberPage({ params }: Props) {
  let doctor = await getTeamMember(params.slug)

  // If no team member found and slug is 'edward-obryan', try to get featured doctor
  if (!doctor && params.slug === 'edward-obryan') {
    const featuredDoctor = await getFeaturedDoctor()
    if (featuredDoctor) {
      // Create a mock team member structure from featured doctor
      doctor = {
        ...featuredDoctor,
        slug: { current: 'edward-obryan' }
      }
    }
  }

  // If still no doctor found, create fallback for edward-obryan
  if (!doctor && params.slug === 'edward-obryan') {
    doctor = {
      _id: 'fallback-edward-obryan',
      name: 'Mr Edward O\'Bryan',
      slug: { current: 'edward-obryan' },
      title: 'Orthopaedic Surgeon',
      photo: null,
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Mr Edward O\'Bryan is a leading orthopaedic surgeon specialising in advanced joint replacement and sports injury treatment. With over 15 years of experience, he is renowned for his expertise in robotic-assisted surgery and minimally invasive techniques.'
            }
          ]
        }
      ],
      specialties: [
        'Hip & Knee Joint Replacement',
        'Robotic-Assisted Surgery', 
        'Sports Knee Surgery',
        'ACL Reconstruction',
        'Arthroscopic Surgery',
        'Complex Joint Revision'
      ],
      credentials: ['MBBS', 'FRACS (Orthopaedics)', 'FAOrthA'],
      education: [
        'MBBS, University of Melbourne (2005)',
        'FRACS Orthopaedic Surgery Training, Royal Australasian College of Surgeons (2012)', 
        'Fellowship in Adult Reconstructive Surgery, Royal Melbourne Hospital (2013)',
        'Advanced Robotic Surgery Certification, Mako Robotic Institute (2015)'
      ],
      experience: [
        'Senior Orthopaedic Surgeon, Melbourne Orthopaedic Group (2015-Present)',
        'Consultant Orthopaedic Surgeon, Royal Melbourne Hospital (2013-Present)',
        'Clinical Supervisor, University of Melbourne Medical School (2014-Present)',
        'Research Fellow, Joint Replacement Institute (2013-2015)'
      ],
      featured: true,
      order: 1
    }
  }

  if (!doctor) {
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
              href="/team" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Doctor Info */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  {doctor.featured ? 'Leading Orthopaedic Surgeon' : 'Team Member'}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-sans leading-tight">
                  {doctor.name}
                </h1>
                
                <p className="text-2xl text-blue-100 mb-2 font-medium">
                  {doctor.title}
                </p>
                
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  {doctor.credentials?.join(' • ')}
                </p>

                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Phone className="w-5 h-5" />
                    <span>0405 556 622</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Mail className="w-5 h-5" />
                    <span>ed@edosdoctors.com.au</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="w-5 h-5" />
                    <span>Melbourne, Australia</span>
                  </div>
                </div>

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
                      Call Now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Doctor Photo */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
                  {doctor.photo && (
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  )}
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">15+</div>
                      <p className="text-gray-600 text-sm">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  About {doctor.name.split(' ')[doctor.name.split(' ').length - 1]}
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Dedicated to Excellence in Orthopaedic Care
                </h2>
                
                <div className="prose prose-lg text-gray-600 mb-8">
                  {doctor.bio && <PortableText value={doctor.bio} />}
                </div>

                {/* Key Achievements */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Advanced Surgical Techniques</h4>
                      <p className="text-gray-600 text-sm">Specialising in minimally invasive and robotic-assisted procedures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Patient-Centred Approach</h4>
                      <p className="text-gray-600 text-sm">Personalised treatment plans tailored to each patient&apos;s unique needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Continuous Innovation</h4>
                      <p className="text-gray-600 text-sm">Staying at the forefront of orthopaedic research and technology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h3>
                
                <div className="space-y-4">
                  {doctor.specialties?.map((specialty: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{specialty}</span>
                    </div>
                  )) || (
                    <p className="text-gray-600">Specialties information not available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Education & Experience */}
      {(doctor.education?.length || doctor.experience?.length) && (
        <section className="py-20 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  Qualifications & Experience
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                  Excellence Through Education
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {doctor.name}&apos;s commitment to excellence is reflected in extensive education and professional experience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Education */}
                {doctor.education && doctor.education.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {doctor.education.map((edu: string, index: number) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                          <p className="font-medium text-gray-900">{edu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Experience */}
                {doctor.experience && doctor.experience.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {doctor.experience.map((exp: string, index: number) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                          <p className="font-medium text-gray-900">{exp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Philosophy & Approach */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Treatment Philosophy
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 font-sans">
              Patient-Centred Care & Innovation
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Every patient deserves personalised, compassionate care combined with the latest medical innovations. 
              Our approach focuses on understanding your unique needs and developing treatment plans that restore 
              mobility and improve quality of life.
            </p>

            {/* Key Principles */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Compassionate Care</h3>
                <p className="text-gray-600 text-sm">
                  Understanding each patient&apos;s unique situation and providing empathetic, personalised treatment.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Advanced Technology</h3>
                <p className="text-gray-600 text-sm">
                  Utilising cutting-edge surgical techniques and robotic-assisted procedures for optimal outcomes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Excellence in Results</h3>
                <p className="text-gray-600 text-sm">
                  Committed to delivering the highest quality care with proven successful outcomes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3000+</div>
              <p className="text-gray-600">Patients Treated</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Patient Satisfaction</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1500+</div>
              <p className="text-gray-600">Successful Procedures</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-sans">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with {doctor.name} to discuss your orthopaedic needs and explore personalised treatment options.
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