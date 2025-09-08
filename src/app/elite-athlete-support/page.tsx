import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Phone, Trophy, Users, Target, CheckCircle, Clock, Activity, Zap, Award, Shield } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getEliteAthletePage } from '@/lib/sanity-queries'

export const metadata: Metadata = {
  title: 'Elite Athlete Support Program | Mr Edward O\'Bryan - Orthopaedic Surgeon',
  description: 'Specialized orthopaedic care for elite and professional athletes. Return to competition safely and effectively with our structured support program.',
}

// Fallback data for when Sanity content is not available
const fallbackData = {
  heroSection: {
    title: 'Elite Athlete Support Program',
    subtitle: 'Specialized orthopaedic care designed for elite and professional athletes. Return to competition safely, effectively, and as promptly as possible.'
  },
  introSection: {
    title: 'Returning Elite Athletes to Competition',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our Elite Athlete Support Program is specifically designed for professional and high-performing athletes who require specialized orthopaedic care. We understand the unique pressures and demands placed on elite athletes, and our approach is tailored to ensure a safe, effective, and prompt return to competition.'
          }
        ]
      }
    ]
  },
  approachSection: {
    title: 'Our Multidisciplinary Approach',
    approaches: [
      {
        title: 'Precision Diagnostics',
        description: 'Advanced imaging and diagnostic techniques to accurately assess injuries and develop targeted treatment plans.',
        icon: 'target'
      },
      {
        title: 'Collaborative Care Team',
        description: 'Working closely with sports medicine physicians, physiotherapists, and performance coaches.',
        icon: 'users'
      },
      {
        title: 'Accelerated Recovery',
        description: 'Evidence-based protocols designed to optimize healing while maintaining peak physical condition.',
        icon: 'zap'
      }
    ]
  },
  performanceGoalsSection: {
    title: 'Performance-Focused Goals',
    goals: [
      {
        title: 'Return to Competition Timeline',
        description: 'Structured rehabilitation programs with clear milestones and realistic timeframes for return to sport.'
      },
      {
        title: 'Injury Prevention',
        description: 'Comprehensive assessment and modification of risk factors to prevent future injuries.'
      },
      {
        title: 'Performance Enhancement',
        description: 'Optimization of biomechanics and movement patterns to enhance athletic performance post-recovery.'
      },
      {
        title: 'Long-term Joint Health',
        description: 'Strategies to maintain joint health and extend athletic careers while preventing degenerative changes.'
      }
    ]
  },
  advancedTechniquesSection: {
    title: 'Advanced Surgical Techniques',
    techniques: [
      {
        title: 'Minimally Invasive Arthroscopy',
        description: 'State-of-the-art arthroscopic techniques for faster recovery and minimal scarring.'
      },
      {
        title: 'Biological Enhancement',
        description: 'Utilization of biologics and regenerative medicine to optimize healing outcomes.'
      },
      {
        title: 'Precision Reconstruction',
        description: 'Advanced ligament reconstruction techniques using the latest surgical technologies.'
      },
      {
        title: 'Sport-Specific Procedures',
        description: 'Surgical approaches tailored to the specific demands of individual sports and positions.'
      }
    ]
  },
  processSection: {
    title: 'Our Process',
    steps: [
      {
        stepNumber: '01',
        title: 'Initial Assessment',
        description: 'Comprehensive evaluation including injury history, performance demands, and career goals.'
      },
      {
        stepNumber: '02',
        title: 'Treatment Planning',
        description: 'Development of individualized treatment plan with input from multidisciplinary team.'
      },
      {
        stepNumber: '03',
        title: 'Intervention',
        description: 'Implementation of treatment plan, whether surgical or non-surgical management.'
      },
      {
        stepNumber: '04',
        title: 'Rehabilitation',
        description: 'Structured rehabilitation program with regular monitoring and adjustment.'
      },
      {
        stepNumber: '05',
        title: 'Return to Sport',
        description: 'Graduated return to training and competition with ongoing support and monitoring.'
      }
    ]
  },
  statisticsSection: {
    title: 'Elite Athlete Outcomes',
    statistics: [
      {
        number: '95%',
        label: 'Return to Sport Rate',
        description: 'of elite athletes return to their pre-injury competition level'
      },
      {
        number: '12',
        label: 'Average Weeks',
        description: 'from injury to full competition for most procedures'
      },
      {
        number: '100+',
        label: 'Elite Athletes',
        description: 'treated annually across various professional sports'
      },
      {
        number: '98%',
        label: 'Satisfaction Rate',
        description: 'of athletes would recommend our program to teammates'
      }
    ]
  },
  ctaSection: {
    title: 'Elite Athlete Consultation',
    description: 'Get specialized care designed for high-performing athletes. Contact us for a comprehensive assessment and personalized treatment plan.',
    buttonText: 'Schedule Consultation',
    buttonLink: '/contact'
  }
}

const iconMap = {
  target: Target,
  users: Users,
  zap: Zap,
  trophy: Trophy,
  award: Award,
  shield: Shield,
  activity: Activity
}

export default async function EliteAthletePage() {
  let pageData
  
  try {
    pageData = await getEliteAthletePage()
  } catch (error) {
    console.error('Failed to fetch Elite Athlete page data:', error)
    pageData = null
  }
  
  // Use Sanity data if available, otherwise use fallback
  const data = pageData || fallbackData

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
                <Trophy className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                {data.heroSection.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {data.heroSection.subtitle}
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

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Trophy className="w-4 h-4" />
                Returning You to Competition
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-sans">
                {data.introSection.title}
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                {data.introSection.content.map((block, index) => (
                  <p key={index}>
                    {block.children.map((child, childIndex) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Our Approach */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-sans text-center">
                {data.approachSection.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {data.approachSection.approaches.map((approach, index) => {
                  const IconComponent = iconMap[approach.icon] || Target
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{approach.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {approach.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Performance Goals */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-sans text-center">
                {data.performanceGoalsSection.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.performanceGoalsSection.goals.map((goal, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{goal.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Techniques */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-sans text-center">
                {data.advancedTechniquesSection.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.advancedTechniquesSection.techniques.map((technique, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{technique.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{technique.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                {data.processSection.title}
              </h2>
              <p className="text-gray-600 text-lg">
                Our structured approach to elite athlete care
              </p>
            </div>

            <div className="space-y-8">
              {data.processSection.steps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.stepNumber}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
              {data.statisticsSection.title}
            </h2>
            <p className="text-gray-600 text-lg mb-16">
              Proven results in elite athlete care and rehabilitation
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.statisticsSection.statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-sans">
              {data.ctaSection.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {data.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={data.ctaSection.buttonLink}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg font-semibold"
                >
                  {data.ctaSection.buttonText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="tel:0405556622">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-400 text-white hover:bg-blue-600 px-8 py-4 h-auto text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}