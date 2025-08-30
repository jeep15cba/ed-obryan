import { Container } from '@/components/ui/container'
import { Award, Users, Clock, Star } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: '5,000+',
    label: 'Patients Treated',
    description: 'Successfully helping patients return to active lifestyles'
  },
  {
    icon: Award,
    number: '15+',
    label: 'Years Experience',
    description: 'Board-certified orthopaedic surgeon with extensive training'
  },
  {
    icon: Clock,
    number: '98%',
    label: 'Success Rate',
    description: 'Exceptional outcomes with minimally invasive techniques'
  },
  {
    icon: Star,
    number: '4.9/5',
    label: 'Patient Rating',
    description: 'Consistently rated excellent by patients and peers'
  }
]

const credentials = [
  'Board Certified - American Board of Orthopaedic Surgery',
  'Fellowship Trained - Sports Medicine & Joint Replacement',
  'Member - American Academy of Orthopaedic Surgeons',
  'Active Staff - Regional Medical Center'
]

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted Expertise You Can Count On
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            With over a decade of experience and thousands of successful procedures, 
            we deliver exceptional orthopaedic care with proven results.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 gradient-blue-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Credentials */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Professional Credentials & Affiliations
            </h3>
            <p className="text-gray-600">
              Committed to the highest standards of orthopaedic care
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {credentials.map((credential, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">{credential}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}