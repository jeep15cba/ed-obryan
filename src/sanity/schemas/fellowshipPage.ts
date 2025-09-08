import { defineField, defineType } from 'sanity'

export const fellowshipPage = defineType({
  name: 'fellowshipPage',
  title: 'Fellowship Training Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main page title (e.g., "Fellowship Training")',
      initialValue: 'Fellowship Training',
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      initialValue: { current: 'fellowship' },
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Page subtitle (e.g., "Local & International Fellowships")',
      initialValue: 'Local & International Fellowships',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Array of paragraphs describing the fellowship training',
    }),
    defineField({
      name: 'badgeText',
      title: 'Hero Badge Text',
      type: 'string',
      initialValue: 'International Training Excellence',
      description: 'Text displayed in the hero section badge',
    }),
    defineField({
      name: 'globeTitle',
      title: 'Globe Section Title',
      type: 'string',
      initialValue: 'Global Training Network',
      description: 'Title for the interactive globe section',
    }),
    defineField({
      name: 'globeDescription',
      title: 'Globe Section Description',
      type: 'text',
      initialValue: 'Click anywhere on the globe or use the location buttons below to explore fellowship details.',
      description: 'Description text for the globe section',
    }),
    defineField({
      name: 'locationsTitle',
      title: 'Locations Section Title',
      type: 'string',
      initialValue: 'Fellowship Locations & Mentors',
      description: 'Title for the fellowship locations section',
    }),
    defineField({
      name: 'locationsDescription',
      title: 'Locations Section Description',
      type: 'text',
      initialValue: 'Meet the world-class surgeons and institutions that have shaped Mr O\'Bryan\'s expertise.',
      description: 'Description text for the locations section',
    }),
    defineField({
      name: 'fellowshipLocations',
      title: 'Fellowship Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'fellowshipLocation' }] }],
      validation: (Rule) => Rule.required().min(1),
      description: 'List of fellowship locations to display on the page',
    }),
    defineField({
      name: 'isActive',
      title: 'Page Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this page should be publicly accessible',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'SEO settings for the fellowship page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})