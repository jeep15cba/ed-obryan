import type { Metadata } from 'next'
import { Mail, Printer, MapPin, FileText } from 'lucide-react'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { getReferPage } from '@/lib/sanity-queries'
import ReferralForm from '@/components/ReferralForm'

export const metadata: Metadata = {
  title: 'Refer a Patient | Mr Edward O\'Bryan - Orthopaedic Surgeon',
  description: 'Refer a patient to Mr Edward O\'Bryan for orthopaedic care. Submit referrals via HealthLink, email, fax or online form.',
}

// Fallback data for when Sanity content is not available
const fallbackData = {
  heroSection: {
    title: 'Refer to Edward O\'Bryan',
    subtitle: 'Seamless referral process for healthcare professionals. Multiple submission options available for your convenience.'
  },
  introSection: {
    title: 'Submit Patient Referrals',
    description: 'Referrals can be submitted via the form below, or otherwise made directly via Healthlink, email or fax.'
  },
  contactMethods: {
    title: 'Alternative Referral Methods',
    healthlink: 'edobryan',
    email: 'admin@edwardobryan.com',
    fax: '(02) 5565 6390',
    postalAddresses: [
      '12 Linacre Road, Hampton 3188',
      '29 Hilda Crescent, Hawthorn 3122'
    ]
  },
  snapformSection: {
    title: 'Snapform Integration',
    description: 'PDF to be emailed to admin@edwardobryan.com',
    emailAddress: 'admin@edwardobryan.com'
  },
  referralForm: {
    title: 'Online Referral Form',
    practitionerFields: {
      title: 'Referring practitioner details',
      subtitle: '(leave blank any N/A)',
      fields: [
        { name: 'practitioner_name', label: 'Name', type: 'text', required: true, width: 'half' },
        { name: 'occupation', label: 'Occupation', type: 'text', required: false, width: 'half' },
        { name: 'provider_number', label: 'Provider Number', type: 'text', required: false, width: 'half' },
        { name: 'contact_number', label: 'Contact number', type: 'tel', required: false, width: 'half' },
        { name: 'email', label: 'Email', type: 'email', required: false, width: 'full' }
      ]
    },
    patientFields: {
      title: 'Patient details',
      fields: [
        { name: 'patient_name', label: 'Name', type: 'text', required: true, width: 'half' },
        { name: 'dob', label: 'DOB', type: 'date', required: true, width: 'half' },
        { name: 'patient_phone', label: 'Contact number', type: 'tel', required: false, width: 'half' },
        { name: 'patient_email', label: 'Email', type: 'email', required: false, width: 'half' },
        { name: 'medicare', label: 'Medicare', type: 'text', required: false, width: 'half' },
        { 
          name: 'insurance_status', 
          label: 'Insurance Status', 
          type: 'checkbox-group', 
          required: false, 
          width: 'half',
          options: ['Privately Insured', 'Worksafe/TAC', 'Uninsured']
        },
        { name: 'reason_for_referral', label: 'Reason for Referral', type: 'textarea', required: true, width: 'full' }
      ]
    },
    additionalFields: [
      { name: 'attached_referral', label: 'Attached referral', type: 'file', required: false, width: 'full' }
    ],
    submitButton: {
      text: 'Submit Referral',
      processingText: 'Submitting...'
    }
  },
  newPatientCTA: {
    text: 'If you are a new patient, please fill out the',
    linkText: 'New Patient Form',
    linkUrl: '/patient-form'
  }
}

export default async function ReferPage() {
  let pageData = null

  try {
    pageData = await getReferPage()
  } catch (error) {
    console.error('Error fetching refer page data:', error)
  }

  const data = pageData || fallbackData

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">{data.heroSection.title}</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {data.heroSection.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {data.introSection.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data.introSection.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {data.contactMethods.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* HealthLink */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">HealthLink</h3>
                <p className="text-blue-600 font-medium">{data.contactMethods.healthlink}</p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <a href={`mailto:${data.contactMethods.email}`} className="text-green-600 font-medium hover:underline">
                  {data.contactMethods.email}
                </a>
              </div>

              {/* Fax */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Printer className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fax</h3>
                <p className="text-purple-600 font-medium">{data.contactMethods.fax}</p>
              </div>

              {/* Postal Address */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Postal Address</h3>
                <div className="text-orange-600 text-sm space-y-1">
                  {data.contactMethods.postalAddresses.map((address, index) => (
                    <p key={index}>{address}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Snapform Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {data.snapformSection.title}
              </h3>
              <p className="text-gray-600 mb-4">{data.snapformSection.description}</p>
              <a 
                href={`mailto:${data.snapformSection.emailAddress}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                {data.snapformSection.emailAddress}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Referral Form */}
      <ReferralForm referralForm={data.referralForm} />

      {/* New Patient CTA */}
      <section className="py-16 bg-blue-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <p className="text-lg text-gray-700 mb-6">
                {data.newPatientCTA.text}{' '}
                <Link 
                  href={data.newPatientCTA.linkUrl}
                  className="text-blue-600 font-semibold hover:text-blue-700 underline"
                >
                  {data.newPatientCTA.linkText}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}