import { defineField, defineType } from 'sanity'

export const fellowshipMentor = defineType({
  name: 'fellowshipMentor',
  title: 'Fellowship Mentor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The mentor\'s name (e.g., "Chris Jones")',
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The mentor\'s professional title (e.g., "Mr Chris Jones", "Dr David DeJour")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Detailed description of the mentor\'s background, achievements, and expertise',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
      description: 'List of expertise areas (e.g., "Robotic Surgery", "Elite Athlete Surgery")',
    }),
    defineField({
      name: 'photo',
      title: 'Professional Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Professional photograph of the mentor (optional)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this mentor appears within their fellowship location',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name',
      media: 'photo',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: `Expertise: ${subtitle}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})