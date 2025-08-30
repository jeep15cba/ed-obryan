import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge text above the heading',
      initialValue: 'Our Services',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Main heading for the services section',
      initialValue: 'Comprehensive',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'Highlighted part of the title (will be blue)',
      initialValue: 'Orthopaedic Care',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Main description paragraph',
      initialValue: 'From robotic joint replacement to sports medicine, we provide cutting-edge orthopaedic solutions tailored to your individual needs and lifestyle.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'service' }],
      }],
      description: 'Select up to 4 services to feature on the homepage',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Ready to Get Back to What You Love?',
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          initialValue: 'Schedule a consultation to discuss your treatment options',
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Book Consultation',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Call 0405 556 622',
        },
        {
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          initialValue: '0405 556 622',
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Services Section',
      type: 'boolean',
      description: 'Only one services section should be active at a time',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      titleHighlight: 'titleHighlight',
    },
    prepare(selection) {
      const { title, titleHighlight } = selection
      const fullTitle = [title, titleHighlight].filter(Boolean).join(' ')
      return {
        title: fullTitle || 'Services Section',
        subtitle: 'Homepage Services Section',
      }
    },
  },
})