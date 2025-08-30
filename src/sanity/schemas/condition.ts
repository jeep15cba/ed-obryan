import { defineField, defineType } from 'sanity'

export const condition = defineType({
  name: 'condition',
  title: 'Condition/Procedure',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Condition/Procedure Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Parent Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Which service category this condition belongs to',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for cards and previews',
      validation: (Rule) => Rule.required(),
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
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      description: 'Detailed overview of the condition/procedure',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'symptoms',
      title: 'Symptoms',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of common symptoms',
    }),
    defineField({
      name: 'causes',
      title: 'Causes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Common causes of this condition',
    }),
    defineField({
      name: 'diagnosis',
      title: 'Diagnosis Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'method',
              title: 'Diagnostic Method',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'treatmentOptions',
      title: 'Treatment Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Treatment Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Treatment Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'isRecommended',
              title: 'Recommended Treatment',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'procedure',
      title: 'Surgical Procedure Details',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Procedure Description',
          type: 'text',
          rows: 4,
          description: 'Detailed description of the surgical procedure',
        },
        {
          name: 'duration',
          title: 'Procedure Duration',
          type: 'string',
          description: 'e.g., "1-2 hours"',
        },
        {
          name: 'anesthesia',
          title: 'Anesthesia Type',
          type: 'string',
          description: 'e.g., "General anesthesia"',
        },
        {
          name: 'hospitalStay',
          title: 'Hospital Stay',
          type: 'string',
          description: 'e.g., "Day surgery" or "1-2 days"',
        },
      ],
    }),
    defineField({
      name: 'recovery',
      title: 'Recovery Information',
      type: 'object',
      fields: [
        {
          name: 'timeline',
          title: 'Recovery Timeline',
          type: 'string',
          description: 'e.g., "6-9 months full recovery"',
        },
        {
          name: 'phases',
          title: 'Recovery Phases',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'phase',
                  title: 'Recovery Phase',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'timeframe',
                  title: 'Timeframe',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'activities',
                  title: 'Allowed Activities',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'risks',
      title: 'Risks and Complications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Potential risks and complications',
    }),
    defineField({
      name: 'successRate',
      title: 'Success Rate',
      type: 'string',
      description: 'e.g., "95% success rate"',
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Condition',
      type: 'boolean',
      initialValue: false,
      description: 'Show this condition in featured sections',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (optional)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Description for search engines (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'service.title',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle ? `${subtitle}` : 'No service assigned',
        media: selection.media,
      }
    },
  },
})