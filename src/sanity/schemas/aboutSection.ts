import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge text above the heading',
      initialValue: 'About Mr O\'Bryan',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Main heading for the about section',
      initialValue: 'Leading Expert in',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'Highlighted part of the title (will be blue)',
      initialValue: 'Orthopaedic Surgery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Main description paragraph',
      initialValue: 'With over 15 years of dedicated experience, Mr Edward O\'Bryan is a renowned orthopaedic surgeon specialising in hip and knee surgery, sports medicine, and advanced robotic joint replacement procedures.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialties',
      title: 'Key Specialties',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Specialty Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Specialty Description',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., Target, Heart, Award)',
            initialValue: 'Target',
          },
        ]
      }],
      initialValue: [
        {
          title: 'Specialised Expertise',
          description: 'Robotic joint replacement, sport knee injuries, and knee preservation surgery',
          icon: 'Target',
        },
        {
          title: 'Patient-Centred Care',
          description: 'Comprehensive treatment plans tailored to individual patient needs and goals',
          icon: 'Heart',
        },
        {
          title: 'Advanced Training',
          description: 'Fellowship training in Australia and internationally with leading orthopaedic centres',
          icon: 'Award',
        },
      ],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Call to Action Button Text',
      type: 'string',
      initialValue: 'Learn More About Mr O\'Bryan',
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'object',
      fields: [
        {
          name: 'patientsCount',
          title: 'Patients Treated Count',
          type: 'string',
          initialValue: '2000+',
        },
        {
          name: 'patientsDescription',
          title: 'Patients Description',
          type: 'string',
          initialValue: 'Successful surgeries performed',
        },
        {
          name: 'experienceCount',
          title: 'Years of Experience',
          type: 'string',
          initialValue: '15+',
        },
        {
          name: 'experienceDescription',
          title: 'Experience Description',
          type: 'string',
          initialValue: 'Years in orthopaedic surgery',
        },
      ],
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Qualifications',
          type: 'string',
          initialValue: 'MBBS (Honours), FRACS',
        },
        {
          name: 'secondary',
          title: 'Secondary Qualifications',
          type: 'string',
          initialValue: 'FAOrthA, PG Dip SurgAnat',
        },
        {
          name: 'description',
          title: 'Qualification Description',
          type: 'string',
          initialValue: 'Fellow of Royal Australasian College of Surgeons',
        },
      ],
    }),
    defineField({
      name: 'professionalImage',
      title: 'Professional Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'objectPosition',
          type: 'string',
          title: 'Image Position',
          description: 'Control image positioning (e.g., "center", "top", "bottom", "left", "right")',
          options: {
            list: [
              { title: 'Center', value: 'center' },
              { title: 'Top Center', value: 'top' },
              { title: 'Bottom Center', value: 'bottom' },
              { title: 'Left Center', value: 'left' },
              { title: 'Right Center', value: 'right' },
              { title: 'Top Left', value: 'top left' },
              { title: 'Top Right', value: 'top right' },
              { title: 'Bottom Left', value: 'bottom left' },
              { title: 'Bottom Right', value: 'bottom right' },
            ]
          },
          initialValue: 'center',
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active About Section',
      type: 'boolean',
      description: 'Only one about section should be active at a time',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      titleHighlight: 'titleHighlight',
      media: 'professionalImage',
    },
    prepare(selection) {
      const { title, titleHighlight } = selection
      const fullTitle = [title, titleHighlight].filter(Boolean).join(' ')
      return {
        title: fullTitle || 'About Section',
        media: selection.media,
      }
    },
  },
})