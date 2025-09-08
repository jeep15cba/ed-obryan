"use client"

import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormField {
  name: string
  label: string
  type: string
  required: boolean
  width: string
  options?: string[]
}

interface ReferralFormProps {
  referralForm: {
    title: string
    practitionerFields: {
      title: string
      subtitle?: string
      fields: FormField[]
    }
    patientFields: {
      title: string
      fields: FormField[]
    }
    additionalFields: FormField[]
    submitButton: {
      text: string
      processingText: string
    }
  }
}

interface FormFieldProps {
  field: FormField
  value: string | string[]
  onChange: (value: string | string[]) => void
}

function FormField({ field, value, onChange }: FormFieldProps) {
  const widthClasses = {
    full: 'col-span-full',
    half: 'col-span-full md:col-span-1',
    third: 'col-span-full md:col-span-1'
  }

  const handleCheckboxChange = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : []
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter(v => v !== optionValue))
    } else {
      onChange([...currentValues, optionValue])
    }
  }

  const baseInputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

  return (
    <div className={widthClasses[field.width as keyof typeof widthClasses]}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          className={`${baseInputClasses} resize-none`}
          rows={4}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      ) : field.type === 'file' ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            id={field.name}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              onChange(file ? file.name : '')
            }}
            required={field.required}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <label
            htmlFor={field.name}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-900">Click to upload</span>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
            </div>
          </label>
          {value && typeof value === 'string' && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              <span>{value}</span>
            </div>
          )}
        </div>
      ) : field.type === 'checkbox-group' ? (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label key={option} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={Array.isArray(value) ? value.includes(option) : false}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          className={baseInputClasses}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      )}
    </div>
  )
}

export default function ReferralForm({ referralForm }: ReferralFormProps) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFieldChange = (fieldName: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    alert('Referral submitted successfully!')
    
    setIsSubmitting(false)
    setFormData({})
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{referralForm.title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
          {/* Practitioner Fields */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {referralForm.practitionerFields.title}
            </h3>
            {referralForm.practitionerFields.subtitle && (
              <p className="text-gray-600 mb-6">{referralForm.practitionerFields.subtitle}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {referralForm.practitionerFields.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ''}
                  onChange={(value) => handleFieldChange(field.name, value)}
                />
              ))}
            </div>
          </div>

          {/* Patient Fields */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {referralForm.patientFields.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {referralForm.patientFields.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ''}
                  onChange={(value) => handleFieldChange(field.name, value)}
                />
              ))}
            </div>
          </div>

          {/* Additional Fields */}
          {referralForm.additionalFields.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-6">
                {referralForm.additionalFields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleFieldChange(field.name, value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? referralForm.submitButton.processingText : referralForm.submitButton.text}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}