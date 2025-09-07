const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function seedNavigation() {
  try {
    console.log('🔄 Checking for existing navigation...')
    
    // Delete existing navigation documents first
    const existingNavs = await client.fetch(`*[_type == "navigation"]`)
    if (existingNavs.length > 0) {
      console.log(`🗑️ Found ${existingNavs.length} existing navigation document(s), deleting...`)
      for (const nav of existingNavs) {
        await client.delete(nav._id)
        console.log(`   ✅ Deleted navigation: ${nav.title} (${nav._id})`)
      }
    }
    
    console.log('🔄 Creating new navigation document with proper keys...')
    
    const navigationDoc = {
      _type: 'navigation',
      title: 'Main Navigation',
      isActive: true,
      items: [
        {
          _key: 'home',
          _type: 'navigationItem',
          title: 'Home',
          href: '/',
          hasDropdown: false,
          order: 0,
          isActive: true
        },
        {
          _key: 'about',
          _type: 'navigationItem',
          title: 'About',
          href: '/about',
          hasDropdown: true,
          dropdownItems: [
            {
              _key: 'about-obryan',
              title: 'Mr Ed O\'Bryan',
              href: '/about/edward-obryan'
            },
            {
              _key: 'about-fellowship',
              title: 'Fellowship',
              href: '/about/fellowship'
            }
          ],
          order: 1,
          isActive: true
        },
        {
          _key: 'conditions',
          _type: 'navigationItem',
          title: 'Conditions',
          href: '/conditions',
          hasDropdown: true,
          autoPopulate: {
            enabled: true,
            contentType: 'condition',
            pathPrefix: '/conditions/',
            limit: 15
          },
          order: 2,
          isActive: true
        },
        {
          _key: 'sport-knee-surgery',
          _type: 'navigationItem',
          title: 'Sport Knee Surgery',
          href: '/sport-knee-surgery',
          hasDropdown: true,
          autoPopulate: {
            enabled: true,
            contentType: 'service',
            pathPrefix: '/conditions/',
            limit: 12
          },
          order: 3,
          isActive: true
        },
        {
          _key: 'hip-and-knee-replacement',
          _type: 'navigationItem',
          title: 'Hip & Knee Replacement',
          href: '/hip-and-knee-replacement',
          hasDropdown: true,
          autoPopulate: {
            enabled: true,
            contentType: 'service',
            pathPrefix: '/conditions/',
            limit: 10
          },
          order: 4,
          isActive: true
        },
        {
          _key: 'elite-athlete-support',
          _type: 'navigationItem',
          title: 'Elite Athlete Support',
          href: '/elite-athlete-support',
          hasDropdown: false,
          order: 5,
          isActive: true
        },
        {
          _key: 'patient-info',
          _type: 'navigationItem',
          title: 'Patient Info',
          href: '/patient-info',
          hasDropdown: false,
          order: 6,
          isActive: true
        },
        {
          _key: 'contact',
          _type: 'navigationItem',
          title: 'Contact',
          href: '/contact',
          hasDropdown: true,
          dropdownItems: [
            {
              _key: 'contact-refer',
              title: 'Refer',
              href: '/contact/refer'
            }
          ],
          order: 7,
          isActive: true
        }
      ],
      lastUpdated: new Date().toISOString()
    }

    const result = await client.create(navigationDoc)
    console.log('✅ Navigation document created successfully!')
    console.log('📄 Document ID:', result._id)
    console.log('🔗 You can now edit navigation in Sanity Studio')
    
  } catch (error) {
    console.error('❌ Error creating navigation document:', error)
    process.exit(1)
  }
}

seedNavigation()