import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Main Navigation',
      description: 'Internal name for this navigation configuration'
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Main navigation items'
    }),
    defineField({
      name: 'isActive',
      title: 'Active Configuration',
      type: 'boolean',
      initialValue: false,
      description: 'Set as the active navigation configuration (only one should be active)'
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      itemCount: 'items'
    },
    prepare(selection) {
      const { title, isActive, itemCount } = selection
      const count = Array.isArray(itemCount) ? itemCount.length : 0
      return {
        title: title,
        subtitle: `${count} items${isActive ? ' (Active)' : ''}`
      }
    }
  }
})