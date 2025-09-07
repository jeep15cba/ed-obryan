import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title that appears in search results and browser tabs (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60).warning('Keep titles under 60 characters for better SEO'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description that appears in search results (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160).warning('Keep descriptions under 160 characters for better SEO'),
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Primary keywords this page should rank for',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Image',
      type: 'image',
      description: 'Image that appears when shared on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL for this page (leave blank to use default)',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'SEO Settings',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : 'No description set',
      }
    },
  },
})