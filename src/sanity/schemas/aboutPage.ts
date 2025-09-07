import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title displayed in the hero section'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Subtitle displayed in the hero section'
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      description: 'Description text displayed in the hero section'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility.'
        }
      ]
    }),
    defineField({
      name: 'mainContent',
      title: 'Main Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean'
                  }
                ]
              },
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        }
      ],
      description: 'Main content of the about page'
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Achievement Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Achievement Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide React icon name (e.g., Award, Users, Activity)'
            }
          ]
        }
      ],
      description: 'List of key achievements to highlight'
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Section Title',
      type: 'string',
      initialValue: 'Treatment Philosophy'
    }),
    defineField({
      name: 'philosophySubtitle',
      title: 'Philosophy Section Subtitle',
      type: 'string',
      initialValue: 'Patient-Centred Care & Innovation'
    }),
    defineField({
      name: 'philosophyDescription',
      title: 'Philosophy Description',
      type: 'text',
      description: 'Main philosophy statement'
    }),
    defineField({
      name: 'philosophyPoints',
      title: 'Philosophy Key Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Point Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Point Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide React icon name (e.g., Heart, Shield, Star)'
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3),
      description: 'Up to 3 key philosophy points'
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Statistic Number',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "3000+", "15+", "98%"'
            },
            {
              name: 'label',
              title: 'Statistic Label',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "Patients Treated", "Years Experience"'
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide React icon name (e.g., Users, Clock, Star)'
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4),
      description: 'Up to 4 key statistics'
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Call-to-Action Title',
      type: 'string',
      initialValue: 'Ready to Begin Your Treatment Journey?'
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Call-to-Action Description',
      type: 'text',
      initialValue: 'Schedule a consultation with Mr O\'Bryan to discuss your orthopaedic needs and explore personalised treatment options tailored specifically for you.'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search Engine Optimization settings'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured about page',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage'
    }
  }
})