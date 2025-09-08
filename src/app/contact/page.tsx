import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Calendar,
  Shield,
  CheckCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { getContactPage } from '@/lib/sanity-queries'

export default async function ContactPage() {
  const contactData = await getContactPage()

  // Fallback data
  const heroData = contactData?.heroSection || {
    badge: 'Get In Touch',
    title: 'Contact Mr O\'Bryan',
    subtitle: 'Ready to take the next step in your orthopaedic care? Contact us to schedule a consultation or learn more about our services.',
    primaryButton: { text: 'Book Consultation', link: '#' },
    secondaryButton: { text: 'Call 0405 556 622', link: 'tel:0405556622' }
  }

  const contactMethods = contactData?.contactMethods || {
    phone: {
      title: 'Phone',
      description: 'Call us directly for immediate assistance',
      number: '0405 556 622'
    },
    email: {
      title: 'Email',
      description: 'Send us a message and we\'ll respond promptly',
      address: 'info@edwardobryan.com.au'
    },
    locations: {
      title: 'Locations',
      description: 'Multiple convenient locations to serve you',
      buttonText: 'View Locations'
    }
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
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              {heroData.badge}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
              {heroData.title}
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              {heroData.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg font-semibold"
                asChild
              >
                <Link href={heroData.primaryButton?.link || '#'}>
                  <Calendar className="w-5 h-5 mr-2" />
                  {heroData.primaryButton?.text || 'Book Consultation'}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-400 text-white hover:bg-blue-600 px-8 py-4 h-auto text-lg"
                asChild
              >
                <Link href={heroData.secondaryButton?.link || 'tel:0405556622'}>
                  <Phone className="w-5 h-5 mr-2" />
                  {heroData.secondaryButton?.text || 'Call 0405 556 622'}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{contactMethods.phone.title}</h3>
              <p className="text-gray-600 mb-4">{contactMethods.phone.description}</p>
              <Link href={`tel:${contactMethods.phone.number.replace(/\s/g, '')}`}>
                <Button variant="ghost" className="text-green-600 hover:text-green-700 font-semibold">
                  {contactMethods.phone.number}
                </Button>
              </Link>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{contactMethods.email.title}</h3>
              <p className="text-gray-600 mb-4">{contactMethods.email.description}</p>
              <Link href={`mailto:${contactMethods.email.address}`}>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-semibold">
                  {contactMethods.email.address}
                </Button>
              </Link>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{contactMethods.locations.title}</h3>
              <p className="text-gray-600 mb-4">{contactMethods.locations.description}</p>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 font-semibold">
                {contactMethods.locations.buttonText}
              </Button>
            </div>
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Send className="w-4 h-4" />
                  Send Message
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                  Get in Touch
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Fill out the form below and we&apos;ll get back to you as soon as possible. 
                  For urgent medical concerns, please call us directly.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0404 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service of Interest
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a service</option>
                    <option value="sport-knee-surgery">Sport Knee Surgery</option>
                    <option value="robotic-joint-replacement">Robotic Joint Replacement</option>
                    <option value="hip-knee-conditions">Hip & Knee Conditions</option>
                    <option value="elite-athlete-support">Elite Athlete Support</option>
                    <option value="general-consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your condition or how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to the privacy policy and consent to my personal information being 
                    used to contact me regarding my inquiry. *
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-auto text-lg font-semibold"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

            {/* Practice Information */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Practice Information
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                  Why Choose Mr O&apos;Bryan?
                </h2>
              </div>

              {/* Why Choose Us */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Orthopaedic Care</h4>
                    <p className="text-gray-600 text-sm">
                      Fellowship-trained surgeon with expertise in robotic joint replacement and sports medicine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Advanced Technology</h4>
                    <p className="text-gray-600 text-sm">
                      State-of-the-art robotic surgery systems and minimally invasive techniques.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personalized Treatment</h4>
                    <p className="text-gray-600 text-sm">
                      Tailored treatment plans designed specifically for your condition and lifestyle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Support</h4>
                    <p className="text-gray-600 text-sm">
                      Complete care from initial consultation through recovery and rehabilitation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice Hours */}
              <div className="bg-blue-50 p-8 rounded-2xl mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900 font-sans">Practice Hours</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Emergency consultations available by appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Reviews */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900 font-sans">Patient Reviews</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">4.9/5 from 200+ reviews</span>
                </div>

                <blockquote className="text-gray-700 italic mb-4">
                  &quot;Mr O&apos;Bryan provided exceptional care during my knee replacement. 
                  His expertise and compassionate approach made all the difference in my recovery.&quot;
                </blockquote>
                <cite className="text-sm text-gray-600">- Sarah M., Recent Patient</cite>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Practice Locations */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Our Locations
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
              Convenient Locations to Serve You
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We have multiple locations across the region to provide accessible, 
              high-quality orthopaedic care close to home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Main Practice</h3>
              <div className="space-y-3 text-gray-600">
                <p>123 Medical Centre Drive<br />Sydney NSW 2000</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>0405 556 622</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 mt-4 p-0">
                Get Directions →
              </Button>
            </div>

            {/* Location 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Hospital Consulting</h3>
              <div className="space-y-3 text-gray-600">
                <p>456 Hospital Avenue<br />North Sydney NSW 2060</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>0405 556 622</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>By Appointment</span>
                </div>
              </div>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 mt-4 p-0">
                Get Directions →
              </Button>
            </div>

            {/* Location 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">Sports Clinic</h3>
              <div className="space-y-3 text-gray-600">
                <p>789 Sports Medicine Centre<br />Bondi NSW 2026</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>0405 556 622</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Sat: 9AM-2PM</span>
                </div>
              </div>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 mt-4 p-0">
                Get Directions →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-sans">
              Medical Emergency?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              For urgent medical emergencies, please call 000 immediately or visit your nearest emergency department.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:000">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 000
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-red-400 text-white hover:bg-red-600 px-8 py-4 h-auto text-lg"
              >
                Find Nearest Hospital
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}