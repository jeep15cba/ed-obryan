import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Default site title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default site description used for SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'The main URL of your website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'seo',
      description: 'Default SEO settings used as fallback across the site',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'doctorInfo',
      title: 'Doctor Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Doctor Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Professional Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
        {
          name: 'credentials',
          title: 'Professional Credentials',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'List of professional credentials (e.g., MBBS, FRACS)',
        },
        {
          name: 'specialties',
          title: 'Areas of Expertise',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'List of medical specialties',
        },
        {
          name: 'yearsExperience',
          title: 'Years of Experience',
          type: 'number',
          description: 'Total years of professional experience',
        },
      ],
    }),
    defineField({
      name: 'statistics',
      title: 'Practice Statistics',
      type: 'object',
      fields: [
        {
          name: 'patientsCount',
          title: 'Total Patients Treated',
          type: 'string',
          description: 'e.g., "3000+" or "1000+"',
        },
        {
          name: 'proceduresCount',
          title: 'Successful Procedures',
          type: 'string',
          description: 'e.g., "2000+" or "1500+"',
        },
        {
          name: 'successRate',
          title: 'Success Rate',
          type: 'string',
          description: 'e.g., "98%" or "95%"',
        },
        {
          name: 'athletesSupportedCount',
          title: 'Athletes Supported',
          type: 'string',
          description: 'e.g., "500+" (for sports medicine)',
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})