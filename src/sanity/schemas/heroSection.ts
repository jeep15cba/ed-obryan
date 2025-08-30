import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      description: 'Main hero title (e.g., "Edward O\'Bryan, MD")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondTitle',
      title: 'Second Title',
      type: 'string',
      description: 'Secondary title line (e.g., "Orthopaedic Surgeon")',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Descriptive subtitle below the titles',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Call to Action Button Text',
      type: 'string',
      initialValue: 'Contact us',
    }),
    defineField({
      name: 'doctorName',
      title: 'Doctor Name',
      type: 'string',
      initialValue: 'Mr Edward O\'Bryan',
    }),
    defineField({
      name: 'credentials',
      title: 'Doctor Credentials',
      type: 'string',
      initialValue: 'MBBS (Honours), FRACS, FAOrthA',
    }),
    defineField({
      name: 'description',
      title: 'Doctor Description',
      type: 'text',
      rows: 4,
      initialValue: 'Fellowship trained orthopaedic surgeon specialising in robotic joint replacement, sport knee injuries, and advanced surgical techniques.',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Hero Section',
      type: 'boolean',
      description: 'Only one hero section should be active at a time',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      secondTitle: 'secondTitle',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
    prepare(selection) {
      const { title, secondTitle, subtitle } = selection
      const fullTitle = [title, secondTitle].filter(Boolean).join(' - ')
      return {
        title: fullTitle || 'Hero Section',
        subtitle: subtitle || 'No subtitle provided',
        media: selection.media,
      }
    },
  },
})