const { createClient } = require('next-sanity');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function migrateFooterData() {
  try {
    // Footer configuration data based on existing footer component
    const footerData = {
      _type: 'footerConfig',
      _id: 'footer-config',
      title: 'Footer Configuration',
      companyInfo: {
        logo: {
          text: 'Mr Edward O\'Bryan',
          initials: 'EO'
        },
        description: 'Expert orthopaedic surgeon specializing in hip and knee replacement, sports medicine, and comprehensive musculoskeletal care. Dedicated to getting you back to the activities you love.',
        contactInfo: {
          phone: '0405 556 622',
          email: 'admin@edwardobryan.com',
          address: '12 Linacre Road, Hampton 3188\n29 Hilda Crescent, Hawthorn 3122',
          hours: 'Mon-Fri: 8AM-5PM'
        }
      },
      navigation: {
        services: {
          title: 'Services',
          links: [
            { _key: 'service-hip-knee', name: 'Hip & Knee Replacement', href: '/hip-and-knee-replacement' },
            { _key: 'service-sport-knee', name: 'Sport Knee Surgery', href: '/sport-knee-surgery' },
            { _key: 'service-elite-athlete', name: 'Elite Athlete Support', href: '/elite-athlete-support' },
            { _key: 'service-conditions', name: 'Conditions', href: '/conditions' }
          ]
        },
        company: {
          title: 'Company',
          links: [
            { _key: 'company-about', name: 'About Edward O\'Bryan', href: '/about/edward-obryan' },
            { _key: 'company-fellowship', name: 'Fellowship Training', href: '/about/fellowship' },
            { _key: 'company-team', name: 'Our Team', href: '/team' },
            { _key: 'company-contact', name: 'Contact', href: '/contact' }
          ]
        },
        resources: {
          title: 'Resources',
          links: [
            { _key: 'resource-patient-info', name: 'Patient Information', href: '/patient-info' },
            { _key: 'resource-patient-form', name: 'Patient Form', href: '/patient-form' },
            { _key: 'resource-refer', name: 'Refer a Patient', href: '/refer' },
            { _key: 'resource-privacy', name: 'Privacy Policy', href: '/privacy' }
          ]
        }
      },
      cta: {
        buttonText: 'Book Consultation',
        buttonLink: '/contact'
      },
      socialMedia: [
        { _key: 'social-facebook', platform: 'facebook', url: 'https://facebook.com/edwardobryan' },
        { _key: 'social-twitter', platform: 'twitter', url: 'https://twitter.com/edwardobryan' },
        { _key: 'social-instagram', platform: 'instagram', url: 'https://instagram.com/edwardobryan' },
        { _key: 'social-linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/edwardobryan' }
      ],
      bottomFooter: {
        copyrightText: '© 2024 Mr Edward O\'Bryan - Orthopaedic Surgeon. All rights reserved.',
        legalLinks: [
          { _key: 'legal-privacy', name: 'Privacy Policy', href: '/privacy' },
          { _key: 'legal-terms', name: 'Terms of Service', href: '/terms' },
          { _key: 'legal-accessibility', name: 'Accessibility', href: '/accessibility' }
        ]
      },
      seo: {
        metaTitle: 'Footer Configuration',
        metaDescription: 'Site-wide footer configuration for Mr Edward O\'Bryan Orthopaedic Surgeon website'
      }
    }

    // Check if footer config already exists
    const existingFooter = await writeClient.fetch(
      '*[_type == "footerConfig" && _id == $id][0]',
      { id: footerData._id }
    )

    let result
    if (existingFooter) {
      // Update existing document
      result = await writeClient
        .patch(footerData._id)
        .set(footerData)
        .commit()
      
      console.log('✅ Footer configuration updated successfully')
      console.log('Document ID:', result._id)
    } else {
      // Create new document
      result = await writeClient.create(footerData)
      
      console.log('✅ Footer configuration created successfully')
      console.log('Document ID:', result._id)
    }

    console.log('\n📄 Footer Configuration Data:')
    console.log('- Company:', footerData.companyInfo.logo.text)
    console.log('- Services links:', footerData.navigation.services.links.length)
    console.log('- Company links:', footerData.navigation.company.links.length)
    console.log('- Resource links:', footerData.navigation.resources.links.length)
    console.log('- Social media links:', footerData.socialMedia.length)
    console.log('- Legal links:', footerData.bottomFooter.legalLinks.length)

  } catch (error) {
    console.error('❌ Failed to migrate footer data:', error)
    process.exit(1)
  }
}

// Run the migration
migrateFooterData()