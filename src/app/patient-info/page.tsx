import type { Metadata } from 'next'
import { CheckCircle, Clock, FileText, User, CreditCard, Stethoscope, ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPatientInfoPage } from '@/lib/sanity-queries'

export const metadata: Metadata = {
  title: 'Patient Information | Mr Edward O\'Bryan - Orthopaedic Surgeon',
  description: 'Everything you need to know before your appointment with Mr Edward O\'Bryan. Appointment preparation, fees, and what to expect.',
}

// Fallback data for when Sanity content is not available
const fallbackData = {
  heroSection: {
    title: 'Patient Information',
    subtitle: 'Everything you need to know before your visit with Mr Edward O\'Bryan. We\'ve prepared this comprehensive guide to help ensure your appointment runs smoothly.'
  },
  newPatientFormSection: {
    title: 'New Patient Form',
    description: 'Save time at your appointment by completing your patient form online before you arrive.',
    buttonText: 'Complete Online Form',
    buttonLink: '/patient-form'
  },
  infoSections: [
    {
      title: 'Before Arriving',
      icon: 'clock',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Please arrive 15 minutes early for your appointment to allow time for check-in and completion of any remaining paperwork.'
            }
          ]
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'If you are running late, please call our office as soon as possible. We understand that delays can happen, and we\'ll do our best to accommodate you.'
            }
          ]
        },
        {
          _type: 'infoBox',
          type: 'warning',
          title: 'Please note:',
          content: 'Late arrivals may need to be rescheduled to ensure adequate consultation time for all patients.'
        }
      ]
    },
    {
      title: 'What to Bring',
      icon: 'file-text',
      content: [
        {
          _type: 'checklistSection',
          title: 'Essential Documents:',
          items: [
            'Valid referral from your GP or specialist (Medicare requirement)',
            'Medicare card and photo identification',
            'Private health insurance details (if applicable)',
            'Workers compensation or third party insurance details (if applicable)'
          ]
        },
        {
          _type: 'checklistSection',
          title: 'Medical Information:',
          items: [
            'All recent imaging (X-rays, MRI, CT scans) - bring originals or CDs',
            'Reports from previous specialists or treating doctors',
            'List of current medications and dosages',
            'Previous surgical reports (if relevant)'
          ]
        }
      ]
    },
    {
      title: 'What to Wear',
      icon: 'user',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Please dress comfortably in loose-fitting clothing that allows easy access to the area being examined. For knee consultations, shorts or loose pants that can be easily rolled up are ideal.'
            }
          ]
        },
        {
          _type: 'infoBox',
          type: 'info',
          title: 'Tip:',
          content: 'Avoid tight-fitting jeans or clothing that may be difficult to remove if a detailed examination is required.'
        }
      ]
    },
    {
      title: 'What to Expect',
      icon: 'stethoscope',
      content: [
        {
          _type: 'checklistSection',
          title: 'During Your Consultation:',
          items: [
            'Detailed discussion of your symptoms and medical history',
            'Physical examination of the affected area',
            'Review of any imaging or test results you\'ve brought',
            'Discussion of diagnosis and treatment options',
            'Opportunity to ask questions about your condition'
          ]
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Initial consultations typically take 30-45 minutes, while follow-up appointments are usually 15-20 minutes. Complex cases may require additional time.',
              marks: ['strong']
            }
          ]
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'You\'ll receive a comprehensive report sent to your referring doctor, and any recommended treatment plans or further investigations will be discussed and arranged as needed.'
            }
          ]
        }
      ]
    }
  ],
  feesSection: {
    title: 'Consulting & Surgical Fees',
    description: 'Transparent pricing for all consultations and procedures. Medicare rebates apply where eligible.',
    consultingFees: {
      title: 'Consulting Fees',
      fees: [
        { service: 'Initial Consultation', fee: '$450', rebate: '$100' },
        { service: 'Follow-up Consultation', fee: '$350', rebate: '$75' },
        { service: 'Brief Consultation', fee: '$250', rebate: '$40' }
      ]
    },
    surgicalFees: {
      title: 'Surgical Fees',
      fees: [
        { service: 'Arthroscopic ACL Reconstruction', fee: '$8,500 - $12,000' },
        { service: 'Total Knee Replacement', fee: '$15,000 - $20,000' },
        { service: 'Partial Knee Replacement', fee: '$12,000 - $16,000' },
        { service: 'Arthroscopic Meniscal Repair', fee: '$6,000 - $8,500' },
        { service: 'Arthroscopic Cartilage Procedures', fee: '$8,000 - $12,000' },
        { service: 'Complex Revision Surgery', fee: 'Quote on consultation' }
      ],
      notes: [
        'Surgical fees are estimates and may vary based on complexity',
        'Hospital and anaesthetist fees are additional',
        'Private health insurance may cover portion of fees',
        'Payment plans available for surgical procedures'
      ]
    }
  },
  contactSection: {
    title: 'Questions About Your Appointment?',
    description: 'Our friendly team is here to help. Don\'t hesitate to contact us if you have any questions about your upcoming appointment or need to make changes.',
    phoneNumber: '+61398001200',
    phoneDisplay: '(03) 9800 1200',
    email: 'info@edwardobryan.com.au'
  }
}

const iconMap = {
  clock: Clock,
  'file-text': FileText,
  user: User,
  stethoscope: Stethoscope
}

interface InfoBoxProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

function InfoBox({ icon, title, children }: InfoBoxProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-3 text-gray-700">
        {children}
      </div>
    </div>
  )
}

interface FeesTableProps {
  title: string
  fees: Array<{ service: string; fee: string; rebate?: string }>
}

function FeesTable({ title, fees }: FeesTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          {title}
        </h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                <th className="pb-3">Service</th>
                <th className="pb-3 text-right">Fee</th>
                {fees.some(fee => fee.rebate) && <th className="pb-3 text-right">Medicare Rebate</th>}
              </tr>
            </thead>
            <tbody className="text-sm">
              {fees.map((fee, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 font-medium text-gray-900">{fee.service}</td>
                  <td className="py-3 text-right text-gray-900">{fee.fee}</td>
                  {fees.some(f => f.rebate) && (
                    <td className="py-3 text-right text-gray-600">{fee.rebate || '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function renderContent(content: any[]) {
  return content.map((item, index) => {
    if (item._type === 'block') {
      return (
        <p key={index} className={item.children[0]?.marks?.includes('strong') ? 'font-semibold' : ''}>
          {item.children.map((child: any, childIndex: number) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      )
    }
    
    if (item._type === 'infoBox') {
      const colorMap = {
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800'
      }
      
      return (
        <div key={index} className={`border rounded-lg p-4 mt-4 ${colorMap[item.type as keyof typeof colorMap] || colorMap.info}`}>
          <p className="text-sm">
            <strong>{item.title}</strong> {item.content}
          </p>
        </div>
      )
    }
    
    if (item._type === 'checklistSection') {
      return (
        <div key={index} className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <ul className="space-y-2">
              {item.items.map((listItem: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
    
    return null
  })
}

export default async function PatientInfoPage() {
  let pageData
  
  try {
    pageData = await getPatientInfoPage()
  } catch (error) {
    console.error('Failed to fetch Patient Info page data:', error)
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
                <User className="w-10 h-10 text-white" />
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

      {/* New Patient Form CTA */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{data.newPatientFormSection.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {data.newPatientFormSection.description}
                  </p>
                  <a href={data.newPatientFormSection.buttonLink} className="btn-primary inline-flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {data.newPatientFormSection.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Info Sections */}
            {data.infoSections.map((section: any, sectionIndex: number) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap] || FileText
              return (
                <InfoBox
                  key={sectionIndex}
                  icon={<IconComponent className="w-5 h-5" />}
                  title={section.title}
                >
                  {renderContent(section.content)}
                </InfoBox>
              )
            })}

            {/* Fees Section */}
            <div className="space-y-6">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                  {data.feesSection.title}
                </h2>
                <p className="text-gray-600">
                  {data.feesSection.description}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <FeesTable title={data.feesSection.consultingFees.title} fees={data.feesSection.consultingFees.fees} />
                <div className="space-y-6">
                  <FeesTable title={data.feesSection.surgicalFees.title} fees={data.feesSection.surgicalFees.fees} />
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-2">Important Fee Information:</p>
                    <ul className="space-y-1">
                      {data.feesSection.surgicalFees.notes.map((note: string, index: number) => (
                        <li key={index}>• {note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">{data.contactSection.title}</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {data.contactSection.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`tel:${data.contactSection.phoneNumber}`} 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <span>{data.contactSection.phoneDisplay}</span>
                </a>
                <a 
                  href={`mailto:${data.contactSection.email}`} 
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  <span>{data.contactSection.email}</span>
                </a>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  )
}