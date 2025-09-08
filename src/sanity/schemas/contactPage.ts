import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          validation: Rule => Rule.required()
        }),
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
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
            }),
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
            }),
          ]
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
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'number',
              title: 'Phone Number',
              type: 'string',
            }),
          ]
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'address',
              title: 'Email Address',
              type: 'string',
            }),
          ]
        }),
        defineField({
          name: 'locations',
          title: 'Locations',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            }),
          ]
        }),
      ]
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Form Description',
          type: 'text',
        }),
        defineField({
          name: 'services',
          title: 'Service Options',
          type: 'array',
          of: [{ type: 'string' }]
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
          ]
        }),
        defineField({
          name: 'privacyText',
          title: 'Privacy Policy Text',
          type: 'text',
        }),
      ]
    }),
    defineField({
      name: 'practiceInfo',
      title: 'Practice Information',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'whyChooseUs',
          title: 'Why Choose Us',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
              ]
            }
          ]
        }),
        defineField({
          name: 'practiceHours',
          title: 'Practice Hours',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'hours',
              title: 'Operating Hours',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'day',
                      title: 'Day',
                      type: 'string',
                    }),
                    defineField({
                      name: 'time',
                      title: 'Time',
                      type: 'string',
                    }),
                  ]
                }
              ]
            }),
            defineField({
              name: 'emergencyText',
              title: 'Emergency Text',
              type: 'string',
            }),
          ]
        }),
        defineField({
          name: 'reviews',
          title: 'Patient Reviews',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: Rule => Rule.min(0).max(5)
            }),
            defineField({
              name: 'reviewCount',
              title: 'Number of Reviews',
              type: 'number',
            }),
            defineField({
              name: 'testimonial',
              title: 'Featured Testimonial',
              type: 'text',
            }),
            defineField({
              name: 'testimonialAuthor',
              title: 'Testimonial Author',
              type: 'string',
            }),
          ]
        }),
      ]
    }),
    defineField({
      name: 'locations',
      title: 'Practice Locations',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
        }),
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
          name: 'locationList',
          title: 'Location List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Location Name',
                  type: 'string',
                }),
                defineField({
                  name: 'address',
                  title: 'Address',
                  type: 'text',
                }),
                defineField({
                  name: 'phone',
                  title: 'Phone Number',
                  type: 'string',
                }),
                defineField({
                  name: 'hours',
                  title: 'Operating Hours',
                  type: 'string',
                }),
              ]
            }
          ]
        }),
      ]
    }),
    defineField({
      name: 'emergencySection',
      title: 'Emergency Section',
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
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
            }),
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
            }),
          ]
        }),
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