import { defineField, defineType } from 'sanity'

export const patientInfoPage = defineType({
  name: 'patientInfoPage',
  title: 'Patient Information Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ]
    }),
    defineField({
      name: 'newPatientFormSection',
      title: 'New Patient Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'infoSections',
      title: 'Information Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "clock", "file-text", "user", "stethoscope")',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block'
                },
                {
                  type: 'object',
                  name: 'infoBox',
                  title: 'Info Box',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Box Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Warning (Amber)', value: 'warning' },
                          { title: 'Info (Blue)', value: 'info' },
                          { title: 'Success (Green)', value: 'success' },
                          { title: 'Error (Red)', value: 'error' }
                        ]
                      }
                    }),
                    defineField({
                      name: 'title',
                      title: 'Box Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'content',
                      title: 'Box Content',
                      type: 'text',
                    })
                  ]
                },
                {
                  type: 'object',
                  name: 'checklistSection',
                  title: 'Checklist Section',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Checklist Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'items',
                      title: 'Checklist Items',
                      type: 'array',
                      of: [{ type: 'string' }]
                    })
                  ]
                }
              ]
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'feesSection',
      title: 'Fees Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
        }),
        defineField({
          name: 'consultingFees',
          title: 'Consulting Fees',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Table Title',
              type: 'string',
            }),
            defineField({
              name: 'fees',
              title: 'Fee Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'service',
                      title: 'Service',
                      type: 'string',
                    }),
                    defineField({
                      name: 'fee',
                      title: 'Fee',
                      type: 'string',
                    }),
                    defineField({
                      name: 'rebate',
                      title: 'Medicare Rebate',
                      type: 'string',
                    })
                  ]
                }
              ]
            })
          ]
        }),
        defineField({
          name: 'surgicalFees',
          title: 'Surgical Fees',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Table Title',
              type: 'string',
            }),
            defineField({
              name: 'fees',
              title: 'Fee Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'service',
                      title: 'Service',
                      type: 'string',
                    }),
                    defineField({
                      name: 'fee',
                      title: 'Fee',
                      type: 'string',
                    })
                  ]
                }
              ]
            }),
            defineField({
              name: 'notes',
              title: 'Important Notes',
              type: 'array',
              of: [{ type: 'string' }]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'phoneDisplay',
          title: 'Phone Display Text',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare(selection) {
      const { title, slug } = selection
      return {
        title: title,
        subtitle: slug ? `/${slug}` : 'No slug set'
      }
    }
  }
})