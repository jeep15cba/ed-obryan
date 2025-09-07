/**
 * Rich Text Configuration for Sanity
 * Provides comprehensive formatting options including hyperlinks, lists, and more
 */

export const richTextConfig = {
  // Block styles
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 1', value: 'h1' },
    { title: 'Heading 2', value: 'h2' },
    { title: 'Heading 3', value: 'h3' },
    { title: 'Heading 4', value: 'h4' },
    { title: 'Quote', value: 'blockquote' },
  ],

  // List types
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],

  // Marks (inline formatting)
  marks: {
    // Decorators
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
    ],

    // Annotations (links, etc.)
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'External Link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule: any) => Rule.required().uri({
              allowRelative: false,
              scheme: ['http', 'https', 'mailto', 'tel']
            })
          },
          {
            name: 'title',
            type: 'string',
            title: 'Title (optional)',
            description: 'Appears on hover'
          },
          {
            name: 'openInNewTab',
            type: 'boolean',
            title: 'Open in new tab',
            initialValue: true
          }
        ]
      },
      {
        name: 'internalLink',
        type: 'object', 
        title: 'Internal Link',
        fields: [
          {
            name: 'reference',
            type: 'reference',
            title: 'Link to',
            to: [
              { type: 'condition' },
              { type: 'service' },
              { type: 'blogPost' },
              { type: 'teamMember' }
            ]
          },
          {
            name: 'title',
            type: 'string', 
            title: 'Link Text Override (optional)',
            description: 'Override the default link text'
          }
        ]
      },
      {
        name: 'highlight',
        type: 'object',
        title: 'Highlight',
        fields: [
          {
            name: 'color',
            type: 'string',
            title: 'Highlight Color',
            options: {
              list: [
                { title: 'Yellow', value: 'yellow' },
                { title: 'Blue', value: 'blue' },
                { title: 'Green', value: 'green' },
                { title: 'Red', value: 'red' },
                { title: 'Purple', value: 'purple' }
              ]
            }
          }
        ]
      }
    ]
  },

  // Block types (embeds, custom components)
  of: [
    {
      type: 'image',
      options: { 
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)'
        }
      ]
    },
    {
      name: 'calloutBox',
      type: 'object',
      title: 'Callout Box',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Callout Type',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Medical Note', value: 'medical' }
            ]
          }
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title (optional)'
        },
        {
          name: 'content',
          type: 'text',
          title: 'Content',
          rows: 3
        }
      ],
      preview: {
        select: {
          title: 'title',
          type: 'type',
          content: 'content'
        },
        prepare({ title, type, content }: any) {
          return {
            title: title || `${type} callout`,
            subtitle: content
          }
        }
      }
    },
    {
      name: 'videoEmbed',
      type: 'object', 
      title: 'Video Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Video URL',
          description: 'YouTube, Vimeo, or other video URL'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (optional)'
        }
      ]
    },
    {
      name: 'accordionSection',
      type: 'object',
      title: 'Accordion/FAQ Section',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title'
        },
        {
          name: 'items',
          type: 'array',
          title: 'FAQ Items',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  type: 'string',
                  title: 'Question'
                },
                {
                  name: 'answer',
                  type: 'text',
                  title: 'Answer',
                  rows: 3
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}