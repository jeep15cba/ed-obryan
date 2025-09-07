import { defineField, defineType } from 'sanity'

export const aiContext = defineType({
  name: 'aiContext',
  title: 'AI Context & Instructions',
  type: 'document',
  icon: () => '🤖',
  fields: [
    defineField({
      name: 'title',
      title: 'Context Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Medical SEO Instructions'
    }),
    defineField({
      name: 'seoTitleInstruction',
      title: 'SEO Title Generation Instructions',
      type: 'text',
      rows: 4,
      initialValue: `Generate an SEO-optimized title (max 60 characters) for this orthopaedic condition/procedure.

Context: This is for Dr. O'Bryan's orthopaedic practice targeting patients seeking medical information.

Requirements:
- Include the main condition/procedure name
- Use patient-friendly language (avoid overly technical terms)
- Include relevant keywords like "treatment", "surgery", "symptoms"
- Keep under 60 characters
- Make it compelling for search results

Examples:
- "Hip Arthritis: Symptoms, Treatment & Surgery Options"
- "ACL Reconstruction: Recovery & Success Rates"
- "Knee Replacement: What to Expect | Dr. O'Bryan"`
    }),
    defineField({
      name: 'seoDescriptionInstruction',
      title: 'SEO Description Generation Instructions',
      type: 'text',
      rows: 4,
      initialValue: `Generate an SEO meta description (max 160 characters) for this orthopaedic condition/procedure.

Context: This is for Dr. O'Bryan's practice. Encourage patients to learn more and book consultations.

Requirements:
- Summarize key information about the condition/treatment
- Include a subtle call-to-action
- Use patient-friendly, professional language
- Keep under 160 characters
- Mention Dr. O'Bryan's expertise where appropriate

Examples:
- "Expert hip arthritis treatment by Dr. O'Bryan. Learn symptoms, non-surgical options & joint replacement surgery. Schedule consultation today."
- "ACL reconstruction with proven results. Complete guide to procedure, recovery & return to sports. Book your consultation with Dr. O'Bryan."`
    }),
    defineField({
      name: 'blogSeoInstruction',
      title: 'Blog SEO Instructions',
      type: 'text',
      rows: 4,
      initialValue: `Generate SEO-optimized titles and descriptions for medical blog posts.

Context: Educational content establishing Dr. O'Bryan as a trusted orthopaedic authority.

For Titles (max 60 chars):
- Include main topic/keyword
- Use "Guide", "Tips", "What You Need to Know"
- Make informative and trustworthy

For Descriptions (max 160 chars):
- Summarize main points
- Include value for readers
- Professional, helpful tone
- Subtle CTA when appropriate`
    }),
    defineField({
      name: 'practiceInfo',
      title: 'Practice Information for AI Context',
      type: 'object',
      fields: [
        {
          name: 'doctorName',
          title: 'Doctor Name',
          type: 'string',
          initialValue: 'Dr. Edward O\'Bryan'
        },
        {
          name: 'specialty',
          title: 'Medical Specialty',
          type: 'string',
          initialValue: 'Orthopaedic Surgery'
        },
        {
          name: 'location',
          title: 'Practice Location',
          type: 'string',
          initialValue: 'Australia'
        },
        {
          name: 'keyServices',
          title: 'Key Services',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Hip Replacement',
            'Knee Replacement', 
            'ACL Reconstruction',
            'Sports Medicine',
            'Joint Arthroscopy'
          ]
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Active AI Context',
      type: 'boolean',
      initialValue: true,
      description: 'Set as the active AI context configuration'
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? 'Active Context' : 'Inactive'
      }
    }
  }
})