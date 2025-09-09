import { defineField, defineType } from 'sanity'

export const footerConfig = defineType({
  name: 'footerConfig',
  title: 'Footer Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Configuration',
      readOnly: true
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Logo Text',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'initials',
              title: 'Logo Initials',
              type: 'string',
              validation: Rule => Rule.required().max(3)
            })
          ]
        }),
        defineField({
          name: 'description',
          title: 'Company Description',
          type: 'text',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'object',
          fields: [
            defineField({
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'string',
              validation: Rule => Rule.required().email()
            }),
            defineField({
              name: 'address',
              title: 'Physical Address',
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'hours',
              title: 'Business Hours',
              type: 'string',
              validation: Rule => Rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Sections',
      type: 'object',
      fields: [
        defineField({
          name: 'services',
          title: 'Services Links',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Services'
            }),
            defineField({
              name: 'links',
              title: 'Service Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Link Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: Rule => Rule.required()
                    })
                  ]
                }
              ]
            })
          ]
        }),
        defineField({
          name: 'company',
          title: 'Company Links',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Company'
            }),
            defineField({
              name: 'links',
              title: 'Company Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Link Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: Rule => Rule.required()
                    })
                  ]
                }
              ]
            })
          ]
        }),
        defineField({
          name: 'resources',
          title: 'Resources Links',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Resources'
            }),
            defineField({
              name: 'links',
              title: 'Resource Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Link Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: Rule => Rule.required()
                    })
                  ]
                }
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'buttonText',
          title: 'CTA Button Text',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'buttonLink',
          title: 'CTA Button Link',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: Rule => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'bottomFooter',
      title: 'Bottom Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Link Name',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  validation: Rule => Rule.required()
                })
              ]
            }
          ]
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
      title: 'title'
    },
    prepare() {
      return {
        title: 'Footer Configuration',
        subtitle: 'Site-wide footer settings'
      }
    }
  }
})