import { defineField, defineType } from 'sanity'

export const referPage = defineType({
  name: 'referPage',
  title: 'Refer Page',
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
      name: 'introSection',
      title: 'Introduction Section',
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
        })
      ]
    }),
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'healthlink',
          title: 'HealthLink',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'fax',
          title: 'Fax Number',
          type: 'string',
        }),
        defineField({
          name: 'postalAddresses',
          title: 'Postal Addresses',
          type: 'array',
          of: [{ type: 'string' }]
        })
      ]
    }),
    defineField({
      name: 'snapformSection',
      title: 'Snapform Section',
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
          name: 'emailAddress',
          title: 'Email Address for PDFs',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'referralForm',
      title: 'Referral Form Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'practitionerFields',
          title: 'Practitioner Fields',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Section Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'fields',
              title: 'Form Fields',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Field Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Field Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'type',
                      title: 'Field Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Text', value: 'text' },
                          { title: 'Email', value: 'email' },
                          { title: 'Phone', value: 'tel' },
                          { title: 'Date', value: 'date' },
                          { title: 'Textarea', value: 'textarea' }
                        ]
                      }
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required Field',
                      type: 'boolean',
                      initialValue: false
                    }),
                    defineField({
                      name: 'width',
                      title: 'Field Width',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Full Width', value: 'full' },
                          { title: 'Half Width', value: 'half' },
                          { title: 'Third Width', value: 'third' }
                        ]
                      },
                      initialValue: 'half'
                    })
                  ]
                }
              ]
            })
          ]
        }),
        defineField({
          name: 'patientFields',
          title: 'Patient Fields',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'fields',
              title: 'Form Fields',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Field Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Field Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'type',
                      title: 'Field Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Text', value: 'text' },
                          { title: 'Email', value: 'email' },
                          { title: 'Phone', value: 'tel' },
                          { title: 'Date', value: 'date' },
                          { title: 'Textarea', value: 'textarea' },
                          { title: 'Checkbox Group', value: 'checkbox-group' }
                        ]
                      }
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required Field',
                      type: 'boolean',
                      initialValue: false
                    }),
                    defineField({
                      name: 'width',
                      title: 'Field Width',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Full Width', value: 'full' },
                          { title: 'Half Width', value: 'half' },
                          { title: 'Third Width', value: 'third' }
                        ]
                      },
                      initialValue: 'half'
                    }),
                    defineField({
                      name: 'options',
                      title: 'Options (for checkbox groups)',
                      type: 'array',
                      of: [{ type: 'string' }],
                      hidden: ({ parent }) => parent?.type !== 'checkbox-group'
                    })
                  ]
                }
              ]
            })
          ]
        }),
        defineField({
          name: 'additionalFields',
          title: 'Additional Fields',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Field Name',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Field Label',
                  type: 'string',
                }),
                defineField({
                  name: 'type',
                  title: 'Field Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Text', value: 'text' },
                      { title: 'Textarea', value: 'textarea' },
                      { title: 'File Upload', value: 'file' }
                    ]
                  }
                }),
                defineField({
                  name: 'required',
                  title: 'Required Field',
                  type: 'boolean',
                  initialValue: false
                }),
                defineField({
                  name: 'width',
                  title: 'Field Width',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Full Width', value: 'full' },
                      { title: 'Half Width', value: 'half' }
                    ]
                  },
                  initialValue: 'full'
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'submitButton',
          title: 'Submit Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'processingText',
              title: 'Processing Text',
              type: 'string',
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'newPatientCTA',
      title: 'New Patient Call-to-Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Link URL',
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