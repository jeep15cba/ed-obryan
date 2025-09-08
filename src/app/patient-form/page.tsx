import type { Metadata } from 'next'
import { FileText, Clock, Shield, CheckCircle, ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'New Patient Form | Mr Edward O\'Bryan - Orthopaedic Surgeon',
  description: 'Complete your new patient form online before your appointment with Mr Edward O\'Bryan to save time and ensure we have all necessary information.',
}

export default function PatientFormPage() {
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
              href="/patient-info" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patient Info
            </Link>

            <div className="max-w-4xl">
              {/* Service Icon */}
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-sans leading-tight">
                New Patient Form
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Please complete this form before your first appointment with Mr Edward O'Bryan. This helps us prepare 
                for your visit and ensures we have all the necessary information to provide 
                you with the best possible care.
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

      {/* Instructions Section */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-sans">
              Before You Begin
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">5-10 Minutes</h3>
                <p className="text-gray-600 text-sm">
                  The form typically takes 5-10 minutes to complete thoroughly
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-600 text-sm">
                  Your information is encrypted and stored securely in compliance with privacy laws
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-600 text-sm">
                  Completing this form online saves valuable time during your appointment
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Information Needed Section */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">
                Information You'll Need
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Details</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Full name and date of birth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Contact details (phone, email, address)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Medicare number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Private health insurance details</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Medical Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Current symptoms and concerns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Medical history and previous surgeries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Current medications and allergies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Emergency contact information</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Embedded Form Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
                Complete Your New Patient Form
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please fill out the form below completely and accurately. All fields marked 
                with an asterisk (*) are required.
              </p>
            </div>

            {/* New Patient Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <form className="p-8 space-y-8">
                
                {/* Patient Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Patient Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input 
                        type="number" 
                        required
                        placeholder="years"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input type="radio" name="gender" value="male" className="mr-2" />
                          Male
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="gender" value="female" className="mr-2" />
                          Female
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="gender" value="other" className="mr-2" />
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Health Practitioners */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Health Practitioners
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        General Practitioner *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic
                      </label>
                      <input 
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GP Address
                      </label>
                      <textarea 
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Other Health Practitioners (Please specify where relevant)</h4>
                    {['Referring Specialist', 'Physiotherapist', 'Sport Physician', 'Exercise Physiologist', 'Occupational Therapist', 'Other'].map((practitioner) => (
                      <div key={practitioner} className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          {practitioner}
                        </label>
                        <div className="ml-6 grid md:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            placeholder="Name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input 
                            type="text" 
                            placeholder="Address & Contact"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Imaging History */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Imaging History
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you had any previous imaging of your affected joint? *
                    </label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center">
                        <input type="radio" name="previousImaging" value="yes" className="mr-2" />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="previousImaging" value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Imaging Types (Select all that apply)</h4>
                    {['X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'Other (bone scan, PET scan etc)'].map((imaging) => (
                      <div key={imaging} className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          {imaging}
                        </label>
                        <div className="ml-6 grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600">Date of scan</label>
                            <input 
                              type="date" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Imaging Company/Clinic name</label>
                            <input 
                              type="text" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medicare and Insurance Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Medicare and Insurance Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicare Number *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicare Expiry *
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Payment Type *</h4>
                    <div className="space-y-3">
                      {[
                        { value: 'private', label: 'Private Insurance', fields: ['fund', 'membershipNumber', 'levelOfCover'] },
                        { value: 'dva', label: 'DVA', fields: ['dvaNumber', 'cardColour'] },
                        { value: 'tac', label: 'TAC', fields: ['tacClaimNumber', 'injuryDate'] },
                        { value: 'worksafe', label: 'WorkSafe', fields: ['worksafeClaimNumber', 'injuryDate', 'employer', 'employerContact', 'insuranceAgency', 'caseManager', 'caseManagerContact'] },
                        { value: 'selfFunded', label: 'Self Funded', fields: [] },
                        { value: 'other', label: 'Other', fields: ['otherDetails'] }
                      ].map((paymentType) => (
                        <div key={paymentType.value} className="space-y-3">
                          <label className="flex items-center">
                            <input type="radio" name="paymentType" value={paymentType.value} className="mr-2" />
                            {paymentType.label}
                          </label>
                          
                          {/* Private Insurance Fields */}
                          {paymentType.value === 'private' && (
                            <div className="ml-6 space-y-3">
                              <input type="text" placeholder="Private Health Insurer Fund" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="text" placeholder="Membership Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option value="">Select Level of Cover</option>
                                <option value="basic">Basic</option>
                                <option value="bronze">Bronze</option>
                                <option value="silver">Silver</option>
                                <option value="silverPlus">Silver Plus</option>
                                <option value="gold">Gold</option>
                              </select>
                            </div>
                          )}
                          
                          {/* DVA Fields */}
                          {paymentType.value === 'dva' && (
                            <div className="ml-6 space-y-3">
                              <input type="text" placeholder="DVA Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option value="">DVA Card Colour</option>
                                <option value="white">White</option>
                                <option value="gold">Gold</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          )}
                          
                          {/* WorkSafe Fields */}
                          {paymentType.value === 'worksafe' && (
                            <div className="ml-6 space-y-3">
                              <input type="text" placeholder="Workcover Claim Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="date" placeholder="Date of Injury" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="text" placeholder="Employer" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="tel" placeholder="Employer Contact Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="text" placeholder="WorkSafe Insurance Agency" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="text" placeholder="Case Manager Name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="tel" placeholder="Case Manager Contact Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                          )}
                          
                          {/* TAC Fields */}
                          {paymentType.value === 'tac' && (
                            <div className="ml-6 space-y-3">
                              <input type="text" placeholder="TAC Claim Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                              <input type="date" placeholder="Date of Injury" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                          )}
                          
                          {/* Other Fields */}
                          {paymentType.value === 'other' && (
                            <div className="ml-6">
                              <textarea placeholder="Please specify other payment details" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Medical History
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm) *
                      </label>
                      <input 
                        type="number" 
                        required
                        placeholder="cm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg) *
                      </label>
                      <input 
                        type="number" 
                        required
                        placeholder="kg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Smoking *</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center">
                          <input type="radio" name="smoking" value="yes" className="mr-2" />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="smoking" value="vape" className="mr-2" />
                          Vape
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="smoking" value="no" className="mr-2" />
                          No
                        </label>
                      </div>
                      <input type="number" placeholder="How many cigarettes per day (if applicable)" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Diabetes *</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center">
                          <input type="radio" name="diabetes" value="no" className="mr-2" />
                          No
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="diabetes" value="type1" className="mr-2" />
                          Type 1
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="diabetes" value="type2" className="mr-2" />
                          Type 2
                        </label>
                      </div>
                      <input type="text" placeholder="Diabetic Medications (if applicable)" className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2" />
                      <input type="text" placeholder="GLP-1 Agonist (such as Ozempic)" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Heart Problems</label>
                      <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blood Thinning Medication</label>
                      <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                  </div>
                </div>

                {/* Private Consultation Fee */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Private Consultation Fee</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Initial Consultation:</strong> $250 (Medicare Rebate $84.15)</p>
                    <p><strong>Second Opinion Consultation:</strong> $350</p>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Please note:</strong> Payment is required on the day of your consultation.
                    </p>
                  </div>
                </div>

                {/* Patient Declaration */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Patient Declaration
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      I declare that the above information is accurate and complete to the best of my knowledge.
                    </p>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="declaration" required className="h-4 w-4" />
                      <label htmlFor="declaration" className="text-sm text-gray-700">
                        I agree to the above declaration *
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name (Signature) *
                        </label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date *
                        </label>
                        <input 
                          type="date" 
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button 
                    type="submit" 
                    className="w-full btn-primary text-center py-4 text-lg font-semibold"
                  >
                    Submit Patient Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-blue-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-sans">
              After Submitting Your Form
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive an email confirmation that your form has been received
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
                <p className="text-gray-600 text-sm">
                  Our team will review your information before your appointment
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Visit</h3>
                <p className="text-gray-600 text-sm">
                  Arrive 15 minutes early with your referral and identification
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white border-t">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need Help or Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              If you experience any issues with the form or need assistance, 
              please don't hesitate to contact our office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+61398001200" 
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                📞 (03) 9800 1200
              </a>
              <a 
                href="mailto:info@edwardobryan.com.au" 
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                ✉️ info@edwardobryan.com.au
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}