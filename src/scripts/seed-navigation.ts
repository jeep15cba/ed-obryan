/**
 * Seed script to populate Sanity with the initial navigation structure
 * Run this script to create the navigation structure in your Sanity CMS
 */

import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

import { client } from '@/sanity/client'

const initialNavigation = {
  _type: 'navigation',
  title: 'Main Navigation',
  isActive: true,
  items: [
    {
      _type: 'navigationItem',
      title: 'Home',
      href: '/',
      hasDropdown: false,
      order: 0,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'About',
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        {
          title: 'Mr O\'Bryan',
          href: '/about/edward-obryan'
        },
        {
          title: 'Fellowship Training',
          href: '/about/fellowship-training'
        }
      ],
      order: 1,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'Conditions',
      href: '/conditions',
      hasDropdown: true,
      autoPopulate: {
        enabled: true,
        contentType: 'condition',
        pathPrefix: '/conditions/',
        limit: 10
      },
      order: 2,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'Surgery',
      href: '/surgery',
      hasDropdown: true,
      dropdownItems: [
        {
          title: 'ACL Reconstruction',
          href: '/surgery/acl-reconstruction'
        },
        {
          title: 'Meniscal Repair',
          href: '/surgery/meniscal-repair'
        },
        {
          title: 'Robotic Hip Replacement',
          href: '/surgery/robotic-hip'
        },
        {
          title: 'Robotic Knee Replacement',
          href: '/surgery/robotic-knee'
        },
        {
          title: 'Cartilage Reconstruction',
          href: '/surgery/cartilage-reconstruction'
        }
      ],
      order: 3,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'Patient Info',
      href: '/patient-info',
      hasDropdown: false,
      order: 4,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'Elite Athletes',
      href: '/elite-athletes',
      hasDropdown: false,
      order: 5,
      isActive: true
    },
    {
      _type: 'navigationItem',
      title: 'Contact',
      href: '/contact',
      hasDropdown: false,
      order: 6,
      isActive: true
    }
  ],
  lastUpdated: new Date().toISOString()
}

async function seedNavigation() {
  try {
    console.log('🌱 Seeding navigation structure...')
    
    // Check if navigation already exists
    const existingNavigation = await client.fetch(`*[_type == "navigation" && isActive == true][0]`)
    
    if (existingNavigation) {
      console.log('⚠️ Active navigation already exists. Skipping seed.')
      console.log('📋 Existing navigation:', existingNavigation.title)
      return
    }

    // Create the navigation document
    const result = await client.create(initialNavigation)
    
    console.log('✅ Navigation structure seeded successfully!')
    console.log('📋 Created navigation with ID:', result._id)
    console.log('🎯 Navigation items created:', result.items.length)
    
  } catch (error) {
    console.error('❌ Error seeding navigation:', error)
  }
}

// Run the seed function
seedNavigation()