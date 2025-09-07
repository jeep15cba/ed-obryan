import { getAboutPage, getFeaturedDoctor } from '@/lib/sanity-queries'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Mail, MapPin, Award, Users, Clock, Star, Heart, Shield, Activity, CheckCircle, ArrowLeft, Calendar, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage('edward-obryan')
  const doctor = await getFeaturedDoctor()
  
  const title = aboutPage?.seo?.metaTitle || aboutPage?.heroTitle || `About Edward O'Bryan - Leading Orthopaedic Surgeon Melbourne`
  const description = aboutPage?.seo?.metaDescription || aboutPage?.heroDescription || `Learn about Mr Edward O'Bryan's background, qualifications, and approach to orthopaedic surgery. Expert in robotic-assisted joint replacement and sports medicine.`
  
  return generateSEOMetadata({
    title,
    description,
    seo: aboutPage?.seo || doctor?.seo,
    slug: '/about/edward-obryan',
    imageUrl: aboutPage?.heroImage?.asset?.url || doctor?.photo,
  })
}

export default async function AboutEdwardOBryanPage() {
  const aboutPage = await getAboutPage('edward-obryan')
  const doctor = await getFeaturedDoctor()
  
  // Use aboutPage content if available, otherwise use doctor/fallback

  // Fallback doctor data if none exists in Sanity
  const fallbackDoctor = {
    _id: 'fallback',
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

  const doctorData = doctor || fallbackDoctor

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

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Doctor Info */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  About Our Leading Surgeon
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-sans leading-tight">
                  {aboutPage?.heroTitle || doctorData.name}
                </h1>
                
                <p className="text-2xl text-blue-100 mb-2 font-medium">
                  {doctorData.title}
                </p>
                
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  {doctorData.credentials.join(' • ')}
                </p>

                <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                  {aboutPage?.heroDescription || 'Dedicated to providing world-class orthopaedic care with a focus on innovation, precision, and patient-centred treatment approaches.'}
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

              {/* Doctor Photo */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
                  {doctorData.photo && (
                    <Image
                      src={doctorData.photo}
                      alt={doctorData.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  )}
                </div>
                
                {/* Floating Credentials Card */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">FRACS</div>
                      <p className="text-gray-600 text-sm">Fellowship Qualified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Professional Background */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Professional Background
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                A Career Dedicated to Excellence
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                With over 15 years of experience, Mr O'Bryan has established himself as one of Melbourne's 
                leading orthopaedic surgeons, specializing in cutting-edge surgical techniques.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="prose prose-lg text-gray-600 mb-8">
                  {doctorData.bio && <PortableText value={doctorData.bio} />}
                </div>

                {/* Key Achievements */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h3>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Pioneer in Robotic Surgery</h4>
                      <p className="text-gray-600">One of the first surgeons in Melbourne to adopt robotic-assisted joint replacement technology, improving precision and patient outcomes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">3000+ Successful Procedures</h4>
                      <p className="text-gray-600">Successfully performed over 3000 orthopaedic procedures with a 98% patient satisfaction rate.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Clinical Teaching</h4>
                      <p className="text-gray-600">Clinical Supervisor at the University of Melbourne Medical School, training the next generation of orthopaedic surgeons.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Research Contributions</h4>
                      <p className="text-gray-600">Published numerous peer-reviewed papers on joint replacement techniques and sports medicine innovations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h3>
                
                <div className="space-y-4">
                  {doctorData.specialties.map((specialty: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{specialty}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>0405 556 622</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>ed@edosdoctors.com.au</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>Melbourne, Australia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Education & Experience */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Qualifications & Career
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                Excellence Through Education & Experience
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A comprehensive educational background combined with extensive professional experience 
                in orthopaedic surgery and patient care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Education & Training</h3>
                </div>
                
                <div className="space-y-6">
                  {doctorData.education.map((edu: string, index: number) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="border-l-2 border-blue-200 pl-6 pb-4">
                        <p className="font-medium text-gray-900 text-lg">{edu.split(',')[0]}</p>
                        {edu.includes(',') && (
                          <p className="text-gray-600 text-sm mt-1">{edu.split(',').slice(1).join(',').trim()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Professional Experience</h3>
                </div>
                
                <div className="space-y-6">
                  {doctorData.experience.map((exp: string, index: number) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="border-l-2 border-blue-200 pl-6 pb-4">
                        <p className="font-medium text-gray-900 text-lg">{exp.split(',')[0]}</p>
                        {exp.includes(',') && (
                          <p className="text-gray-600 text-sm mt-1">{exp.split(',').slice(1).join(',').trim()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
              "Every patient deserves personalised, compassionate care combined with the latest medical innovations. 
              My approach focuses on understanding your unique needs and developing treatment plans that restore 
              mobility and improve quality of life."
            </p>

            {/* Treatment Philosophy Points */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Compassionate Care</h3>
                <p className="text-gray-600 text-sm">
                  Understanding each patient&apos;s unique situation and providing empathetic, 
                  personalised treatment with clear communication throughout the journey.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Advanced Technology</h3>
                <p className="text-gray-600 text-sm">
                  Utilising cutting-edge surgical techniques including robotic-assisted procedures 
                  for optimal outcomes and faster recovery times.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">Excellence in Results</h3>
                <p className="text-gray-600 text-sm">
                  Committed to delivering the highest quality care with proven successful outcomes 
                  and continuous follow-up support.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
              Proven Track Record
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence in orthopaedic care and patient satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3000+</div>
              <p className="text-gray-600">Patients Treated Successfully</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Patient Satisfaction Rate</p>
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
              Ready to Begin Your Treatment Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with Mr O&apos;Bryan to discuss your orthopaedic needs and explore 
              personalised treatment options tailored specifically for you.
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