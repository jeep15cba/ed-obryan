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

const contactPageData = {
  _type: 'contactPage',
  _id: 'contact-page',
  title: 'Contact Mr Edward O\'Bryan',
  slug: {
    _type: 'slug',
    current: 'contact'
  },
  heroSection: {
    badge: 'Get In Touch',
    title: 'Contact Mr O\'Bryan',
    subtitle: 'Ready to take the next step in your orthopaedic care? Contact us to schedule a consultation or learn more about our services.',
    primaryButton: {
      text: 'Book Consultation',
      link: '#'
    },
    secondaryButton: {
      text: 'Call 0405 556 622',
      link: 'tel:0405556622'
    }
  },
  contactMethods: {
    phone: {
      title: 'Phone',
      description: 'Call us directly for immediate assistance',
      number: '0405 556 622'
    },
    email: {
      title: 'Email',
      description: 'Send us a message and we\'ll respond promptly',
      address: 'info@edwardobryan.com.au'
    },
    locations: {
      title: 'Locations',
      description: 'Multiple convenient locations to serve you',
      buttonText: 'View Locations'
    }
  },
  contactForm: {
    badge: 'Send Message',
    title: 'Get in Touch',
    description: 'Fill out the form below and we\'ll get back to you as soon as possible. For urgent medical concerns, please call us directly.',
    services: [
      'Sport Knee Surgery',
      'Robotic Joint Replacement',
      'Hip & Knee Conditions',
      'Elite Athlete Support',
      'General Consultation'
    ],
    submitButton: {
      text: 'Send Message'
    },
    privacyText: 'I agree to the privacy policy and consent to my personal information being used to contact me regarding my inquiry.'
  },
  practiceInfo: {
    badge: 'Practice Information',
    title: 'Why Choose Mr O\'Bryan?',
    whyChooseUs: [
      {
        title: 'Expert Orthopaedic Care',
        description: 'Fellowship-trained surgeon with expertise in robotic joint replacement and sports medicine.'
      },
      {
        title: 'Advanced Technology',
        description: 'State-of-the-art robotic surgery systems and minimally invasive techniques.'
      },
      {
        title: 'Personalized Treatment',
        description: 'Tailored treatment plans designed specifically for your condition and lifestyle.'
      },
      {
        title: 'Comprehensive Support',
        description: 'Complete care from initial consultation through recovery and rehabilitation.'
      }
    ],
    practiceHours: {
      title: 'Practice Hours',
      hours: [
        {
          day: 'Monday - Friday',
          time: '8:00 AM - 6:00 PM'
        },
        {
          day: 'Saturday',
          time: '9:00 AM - 2:00 PM'
        },
        {
          day: 'Sunday',
          time: 'Closed'
        }
      ],
      emergencyText: 'Emergency consultations available by appointment'
    },
    reviews: {
      title: 'Patient Reviews',
      rating: 4.9,
      reviewCount: 200,
      testimonial: 'Mr O\'Bryan provided exceptional care during my knee replacement. His expertise and compassionate approach made all the difference in my recovery.',
      testimonialAuthor: 'Sarah M., Recent Patient'
    }
  },
  locations: {
    badge: 'Our Locations',
    title: 'Convenient Locations to Serve You',
    description: 'We have multiple locations across the region to provide accessible, high-quality orthopaedic care close to home.',
    locationList: [
      {
        name: 'Main Practice',
        address: '123 Medical Centre Drive\nSydney NSW 2000',
        phone: '0405 556 622',
        hours: 'Mon-Fri: 8AM-6PM'
      },
      {
        name: 'Hospital Consulting',
        address: '456 Hospital Avenue\nNorth Sydney NSW 2060',
        phone: '0405 556 622',
        hours: 'By Appointment'
      },
      {
        name: 'Sports Clinic',
        address: '789 Sports Medicine Centre\nBondi NSW 2026',
        phone: '0405 556 622',
        hours: 'Sat: 9AM-2PM'
      }
    ]
  },
  emergencySection: {
    title: 'Medical Emergency?',
    description: 'For urgent medical emergencies, please call 000 immediately or visit your nearest emergency department.',
    primaryButton: {
      text: 'Call 000',
      link: 'tel:000'
    },
    secondaryButton: {
      text: 'Find Nearest Hospital',
      link: '#'
    }
  },
  seo: {
    title: 'Contact | Edward O\'Bryan Orthopaedic Surgery',
    description: 'Contact Edward O\'Bryan for orthopaedic consultations. Phone 0405 556 622 or book online. Multiple locations across Sydney.',
    keywords: 'contact, orthopaedic surgeon, Edward O\'Bryan, consultation, booking, Sydney'
  }
};

async function migrateContactData() {
  console.log('🚀 Starting contact page data migration...');

  try {
    // Verify connection
    console.log('🔌 Testing Sanity connection...');
    const config = await writeClient.config();
    console.log(`✅ Connected to Sanity project: ${config.projectId}`);

    // Check if contact page already exists
    const existingContactPage = await writeClient.fetch(`*[_type == "contactPage" && _id == "contact-page"][0]`);
    
    if (existingContactPage) {
      console.log('⚠️ Contact page already exists. Updating with new data...');
      const result = await writeClient.createOrReplace(contactPageData);
      console.log(`✅ Contact page updated successfully: ${result._id}`);
    } else {
      const result = await writeClient.create(contactPageData);
      console.log(`✅ Contact page created successfully: ${result._id}`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary: 1 contact page document processed`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the migration
migrateContactData()
  .then(() => {
    console.log('✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });