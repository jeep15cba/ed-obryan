import { defineField, defineType } from 'sanity'

export const eliteAthletePage = defineType({
  name: 'eliteAthletePage',
  title: 'Elite Athlete Support Page',
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
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'approachSection',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'approaches',
          title: 'Approaches',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Approach Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name (e.g., "target", "users", "zap")',
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'performanceGoalsSection',
      title: 'Performance Goals Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'goals',
          title: 'Goals',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Goal Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'advancedTechniquesSection',
      title: 'Advanced Techniques Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'techniques',
          title: 'Techniques',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Technique Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'processSection',
      title: 'Our Process Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'stepNumber',
                  title: 'Step Number',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Step Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'statisticsSection',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'statistics',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'number',
                  title: 'Number',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
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