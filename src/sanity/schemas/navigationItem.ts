import { defineField, defineType } from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Text shown in the navigation menu'
    }),
    defineField({
      name: 'href',
      title: 'URL/Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The URL path (e.g., /about, /services)'
    }),
    defineField({
      name: 'hasDropdown',
      title: 'Has Dropdown Menu',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this item should have a dropdown menu'
    }),
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL/Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description (Optional)',
              type: 'text',
              rows: 2,
              description: 'Optional description for the dropdown item'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'href'
            }
          }
        }
      ],
      hidden: ({ parent }) => !parent?.hasDropdown,
      description: 'Items to show in the dropdown menu'
    }),
    defineField({
      name: 'autoPopulate',
      title: 'Auto-populate Dropdown',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Auto-population',
          type: 'boolean',
          initialValue: false,
          description: 'Automatically populate dropdown with content from Sanity'
        },
        {
          name: 'contentType',
          title: 'Content Type',
          type: 'string',
          options: {
            list: [
              { title: 'Conditions', value: 'condition' },
              { title: 'Services', value: 'service' },
              { title: 'Surgery Types', value: 'surgery' },
            ]
          },
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'pathPrefix',
          title: 'URL Path Prefix',
          type: 'string',
          placeholder: '/conditions/',
          hidden: ({ parent }) => !parent?.enabled,
          description: 'Prefix for auto-generated URLs (e.g., "/conditions/")'
        },
        {
          name: 'limit',
          title: 'Max Items',
          type: 'number',
          initialValue: 10,
          hidden: ({ parent }) => !parent?.enabled,
          description: 'Maximum number of items to show in dropdown'
        }
      ],
      hidden: ({ parent }) => !parent?.hasDropdown,
      description: 'Automatically populate dropdown from Sanity content'
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      description: 'Order of this item in the navigation (0 = first)'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this navigation item'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
      hasDropdown: 'hasDropdown',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, hasDropdown, isActive } = selection
      return {
        title: `${title}${hasDropdown ? ' (dropdown)' : ''}`,
        subtitle: `${subtitle}${isActive ? ' (Active)' : ' (Inactive)'}`
      }
    }
  }
})