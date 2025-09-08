import { defineField, defineType } from 'sanity'

export const fellowshipLocation = defineType({
  name: 'fellowshipLocation',
  title: 'Fellowship Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'City name (e.g., "Melbourne", "Berlin", "Lyon")',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Country name (e.g., "Australia", "Germany", "France")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'city',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Country flag emoji (e.g., "🇦🇺", "🇩🇪", "🇫🇷")',
      initialValue: '🏳️',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) => Rule.required().min(-90).max(90),
      description: 'Geographic latitude for globe positioning (e.g., -37.8136 for Melbourne)',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) => Rule.required().min(-180).max(180),
      description: 'Geographic longitude for globe positioning (e.g., 144.9631 for Melbourne)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Description of the fellowship training and institution',
    }),
    defineField({
      name: 'color',
      title: 'Marker Color',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Blue', value: 'bg-blue-500' },
          { title: 'Green', value: 'bg-green-500' },
          { title: 'Purple', value: 'bg-purple-500' },
          { title: 'Yellow', value: 'bg-yellow-500' },
          { title: 'Red', value: 'bg-red-500' },
          { title: 'Cyan', value: 'bg-cyan-500' },
          { title: 'Lime', value: 'bg-lime-500' },
          { title: 'Pink', value: 'bg-pink-500' },
          { title: 'Orange', value: 'bg-orange-500' },
          { title: 'Indigo', value: 'bg-indigo-500' },
        ]
      },
      initialValue: 'bg-blue-500',
      description: 'Color for the location marker on the globe',
    }),
    defineField({
      name: 'mentors',
      title: 'Fellowship Mentors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'fellowshipMentor' }] }],
      validation: (Rule) => Rule.required().min(1),
      description: 'List of mentors associated with this fellowship location',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in which this location appears (for consistent ordering)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Location',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this location should be displayed on the globe',
    }),
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'country',
      flag: 'flag',
    },
    prepare(selection) {
      const { title, subtitle, flag } = selection
      return {
        title: `${flag} ${title}`,
        subtitle: subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Alphabetical (City)',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }],
    },
  ],
})